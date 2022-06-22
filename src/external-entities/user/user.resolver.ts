import { PostsService } from './../../posts/posts.service';
import { Post } from './../../posts/entities/post.entity';
import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { User } from "./user.entity";

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly postsService: PostsService) { }

    @Query(() => String)
    public hello1(): string {
        return 'hello'
    }

    @ResolveField('posts', () => [Post])
    async posts(@Parent() user: User): Promise<Post[]> {
        return await this.postsService.getPostByUserId(user._id);
    }
}