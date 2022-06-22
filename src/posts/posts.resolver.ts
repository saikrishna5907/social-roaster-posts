import { User } from './../external-entities/user/user.entity';
import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) { }

  @Mutation(() => Post)
  createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postsService.create(createPostInput);
  }

  @Query(() => [Post], { name: 'posts' })
  public async findAll(): Promise<Post[]> {
    return await this.postsService.getAll();
  }

  @Query(() => Post, { name: 'post' })
  public async getPostById(@Args('id', { type: () => String }) id: string): Promise<Post> {
    return await this.postsService.getById(id);
  }

  @Mutation(() => Post)
  public async updatePost(@Args('id') id: string, @Args('updatePostInput') updatePostInput: UpdatePostInput): Promise<Post> {
    return await this.postsService.update(id, updatePostInput);
  }

  @Mutation(() => Post)
  public async removePost(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.remove(id);
  }

  @ResolveField(() => User)
  owner(@Parent() post: Post): any {
    return { __typename: 'User', _id: post.ownerId }
  }
}
