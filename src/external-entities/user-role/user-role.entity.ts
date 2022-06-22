import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { Types } from "mongoose";

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "_id")')
export class UserRole {
    @Field(() => ID)
    @Directive('@external')
    public _id: Types.ObjectId;

    @Field(() => String)
    @Directive('@external')
    public name: string;
}