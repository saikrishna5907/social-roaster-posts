import { BaseService } from './../common/base-classes/base/base.service';
import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Post, PostDocument } from './entities/post.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PostsService extends BaseService<Post> {
  remove(id: number) {
    throw new Error('Method not implemented.');
  }

  public constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>) {
    super(postModel)
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  public async getPostByUserId(_id: Types.ObjectId): Promise<Post[]> {
    const posts = await this.postModel.find({ 'owner._id': _id })
    if (!posts) {
      return [] as Post[]
    }
    return posts
  }
}
