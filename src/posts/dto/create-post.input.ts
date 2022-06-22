import { Field, ID, InputType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InputType()
export class CreatePostInput {

    @Field(() => String)
    public message: string;

    @Field(() => [String])
    public images?: string[];

    @Field(() => ID)
    public ownerId: Types.ObjectId;
}
