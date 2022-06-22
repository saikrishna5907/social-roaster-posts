import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { UserRole } from "./user-role.entity";

@Resolver(() => UserRole)
export class UserRoleResolver {
    constructor() { }
    @Query(() => String)
    public hello2(): string {
        return 'hello'
    }
    @ResolveField(() => String)
    public async posts(@Parent() user: UserRole) {
        // return await this.postsService.getPostByUserId(user._id);
    }
}