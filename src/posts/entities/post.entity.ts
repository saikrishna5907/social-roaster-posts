// import { UserRole } from './../../external-entities/user-role/user-role.entity';
import { Base } from './../../common/base-classes/base/base.entity';
import { ObjectType as ObjectType, Field as GqlField } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model, Types, ValidatorProps } from 'mongoose';
// import { User } from '../../external-entities/user/user.entity'
@Schema({
  timestamps: true,
  toJSON: { virtuals: true, getters: true, },
  toObject: { virtuals: true, getters: true, },
})
@ObjectType()
export class Post extends Base {
  @Prop({
    type: String,
    required: true
  })
  @GqlField(() => String)
  message: string

  @Prop({
    type: [String],
  })
  @GqlField(() => [String])
  images?: string[]

  // @Prop({
  //   type: [{ type: Types.ObjectId, ref: UserRole.name }],
  //   required: [true, 'Visibility is required'],
  //   validate: {
  //     validator: (v) => {
  //       return Array.isArray(v) && v.length > 0
  //     },
  //     message: (props: ValidatorProps) => `Visibility cannot be empty. given ${props.value}`
  //   }
  // })
  // // to which type of users post can be visible
  // @GqlField(() => [UserRole])
  // visibility?: UserRole[]

  // @Prop({
  //   type: [{ type: Types.ObjectId, ref: User.name }],
  //   required: true,
  // })
  // @GqlField(() => User)
  // owner: User

  @GqlField((type) => String)
  @Prop({
    type: Types.ObjectId,
    required: true
  })
  ownerId: Types.ObjectId;
}

export type PostDocument = Post & Document;
export type PostModel = Model<PostDocument>;
export const PostSchema = SchemaFactory.createForClass(Post);
