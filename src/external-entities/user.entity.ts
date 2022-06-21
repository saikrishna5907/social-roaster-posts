import { Post } from './../posts/entities/post.entity';
import { Directive, ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class User {
    @Field((type) => ID)
    @Directive('@external')
    id: number;

    @Field((type) => [Post])
    posts?: Post[];
}