import { Directive, Field, ObjectType } from "@nestjs/graphql";

import { Prop, Schema } from '@nestjs/mongoose'
import { Model, Types } from "mongoose"

@ObjectType({ description: 'Base model for typegoose' })
@Schema({
    timestamps: true, //TODO applying schema options to base class not working
    // toJSON: { virtuals: true, getters: true, },
    // toObject: { virtuals: true, getters: true, },
})
@Directive('@key(fields: "_id")')
export class Base {
    @Field(() => String)
    public _id: Types.ObjectId;

    @Prop()
    @Field(() => Date)
    createdAt: Date;

    @Prop()
    @Field(() => Date)
    updatedAt: Date;
}

export type BaseModel = Model<Base>;