import { Directive, ObjectType, Field, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { Post } from '../../posts/entities/post.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "_id")')
export class User {
    @Field(() => ID)
    @Directive('@external')
    public _id: Types.ObjectId;

    @Field(() => [Post], { nullable: true })
    posts?: Post[];
}

