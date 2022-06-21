import { ApolloError, UserInputError } from 'apollo-server-core';
import { BadRequestException, HttpException } from '@nestjs/common';
import { Types } from "mongoose";

export const INVALID_MONGO_ID_ERROR_MESSAGE = 'Invalid mongo Id given, please provide valid Mongo _id';

export const getMongooseIds = (idsList: string[] | string | Types.ObjectId[] | Types.ObjectId): Types.ObjectId[] | Types.ObjectId | undefined => {
    if (!idsList) {
        return null;
    }
    if (typeof idsList === 'string') {
        return new Types.ObjectId(idsList);
    }
    if (Array.isArray(idsList)) {
        if (idsList.length === 0) {
            return null;
        }
        return idsList.map(id => new Types.ObjectId(id));
    }
    return idsList;

}
export type ResponseError = {
    property: string;
    message: string;
}
export const mongooseErrorHandler = (errorObj: ApolloError, message?: string): HttpException => {
    if (errorObj.name === 'MongoServerError' && errorObj.code === 11000) {
        const keys = Object.keys(errorObj.keyValue)
        return new BadRequestException(`${keys[0]} must be unique`);
    }

    //  validation errors handling start
    const convertedErrors: ResponseError[] = [];
    if (!errorObj) {
        return new BadRequestException(message ?? 'Unable to process');
    }
    if (!errorObj.errors) {
        return new BadRequestException(message ?? 'Unable to process');
    }
    const keys = Object.keys(errorObj.errors);
    if (!keys || keys.length === 0) {
        return new BadRequestException(message ?? 'Unable to process');
    }

    keys.forEach((key: string) => {
        const err = errorObj.errors[key];
        if (err) {
            const transformedErrorObj: ResponseError = {
                message: err.properties.message,
                property: key
            }
            convertedErrors.unshift(transformedErrorObj);
        }

    })
    return new BadRequestException(errorObj);
    //  validation errors handling end
}
export const apolloErrorHandler = (errorObj: any, message?: string): ApolloError => {
    if (errorObj.name === 'MongoServerError' && errorObj.code === 11000) {
        const keys = Object.keys(errorObj.keyValue)
        return new UserInputError(`${keys[0]} must be unique`);
    }

    if (errorObj.name === 'BSONTypeError' && errorObj.message === 'Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer') {
        return new UserInputError(INVALID_MONGO_ID_ERROR_MESSAGE);
    }
    //  validation errors handling start
    const convertedErrors: ResponseError[] = [];
    if (!errorObj) {
        return new UserInputError(message ?? 'Unable to process');
    }
    if (!errorObj.errors) {
        return new UserInputError(message ?? 'Unable to process');
    }
    const keys = Object.keys(errorObj.errors);
    if (!keys || keys.length === 0) {
        return new UserInputError(message ?? 'Unable to process');
    }

    keys.forEach((key: string) => {
        const err = errorObj.errors[key];
        if (err) {
            const transformedErrorObj: ResponseError = {
                message: err.properties.message,
                property: key
            }
            convertedErrors.unshift(transformedErrorObj);
        }

    })
    return new UserInputError(errorObj);
    //  validation errors handling end
}
