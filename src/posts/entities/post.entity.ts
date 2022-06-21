import { Base } from './../../common/base-classes/base/base.entity';
import { ObjectType as ObjectType, Field as GqlField } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true, getters: true, },
  toObject: { virtuals: true, getters: true, },
})
@ObjectType()
export class Post extends Base {

  @Prop({
    type: String,
  })
  @GqlField(() => String)
  userId: string
}
