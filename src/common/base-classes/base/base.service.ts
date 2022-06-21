import { apolloErrorHandler, getMongooseIds } from './../../mongoose';

import { Injectable } from '@nestjs/common';
import { UserInputError } from 'apollo-server-core';
import mongoose, { Model, MongooseQueryOptions, Types } from 'mongoose';
import { Base } from './base.entity';

@Injectable()
export class BaseService<T extends Base> {

    public constructor(private readonly model: Model<T>) {

    }

    private static getQueryOptions(populateOptions?: MongooseQueryOptions): MongooseQueryOptions {
        if (!populateOptions) {
            return {} as MongooseQueryOptions;
        }
        return populateOptions;
    }

    public getById = async (id: string, options?: MongooseQueryOptions): Promise<T> => {
        if (!id) {
            throw new UserInputError(`No Id provided to find the ${this.model.modelName}`);
        }

        try {
            const mongoId = getMongooseIds(id)
            if (!mongoId) {
                throw new UserInputError('Invalid _id')
            }
            const responseFromDB = await this.model.findById(mongoId)
                .setOptions(BaseService.getQueryOptions(options));
            if (responseFromDB) {
                return responseFromDB as T;
            } else {
                throw new UserInputError(`Item not found for the given ID ${id}`);
            }
        } catch (err: any) {
            throw apolloErrorHandler(err, `Cannot find the ${this.model.modelName} by given ID`)
        }
    };

    public create = async (item: Partial<T>): Promise<T> => {
        try {
            const result = await new this.model({
                ...item,
            }).save();
            return result as T
        } catch (error) {
            throw apolloErrorHandler(error);
        }
    };

    public getAll = async (options?: MongooseQueryOptions): Promise<T[]> => {
        try {
            return await this.model.find({}).setOptions(BaseService.getQueryOptions(options));
        } catch (error) {
            throw apolloErrorHandler(error, 'Could not get all items');
        }
    }
    public update = async (id: string | Types.ObjectId, item: Partial<T>, options?: MongooseQueryOptions): Promise<T> => {
        try {
            const mongoId = getMongooseIds(id)
            if (!mongoId) {
                throw new UserInputError('Invalid _id')
            }
            const responseFromDB = await this.model.findByIdAndUpdate(mongoId, { $set: item } as any, { omitUndefined: true, new: true })
                .setOptions(BaseService.getQueryOptions(options))
            if (responseFromDB) {
                return responseFromDB;
            } else {
                throw new UserInputError('The item which is to update is not found...!');
            }
        } catch (err) {
            throw apolloErrorHandler(err, `Failed to update the ${this.model.modelName} for given id: ${id}`)
        }
    };
    public async deleteById(id: string, options?: MongooseQueryOptions): Promise<T> {
        try {
            const mongoId = getMongooseIds(id)
            if (!mongoId) {
                throw new UserInputError('Invalid _id')
            }
            const deleteResult = await this.model.findByIdAndDelete(mongoId).setOptions(BaseService.getQueryOptions(options));
            if (!deleteResult) {
                throw new Error('Deletion failed')
            }
            return deleteResult as T
        } catch (err) {
            throw apolloErrorHandler(err, `Failed to delete the ${this.model.modelName} for given id: ${id}`)
        }
    }
}
