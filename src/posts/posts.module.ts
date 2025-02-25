import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { Post, PostSchema } from './entities/post.entity';
import { UsersResolver } from './../external-entities/user/user.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
    ])
  ],
  providers: [
    PostsResolver,
    PostsService,
    UsersResolver,
  ]
})
export class PostsModule { }
