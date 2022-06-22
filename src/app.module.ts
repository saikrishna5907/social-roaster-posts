import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { GraphQLError } from 'graphql';
import { formatGqlError } from './common/helper';
import { PostsModule } from './posts/posts.module';
import { ENV_VARIABLES } from './constants/constants';
import { User } from './external-entities/user/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),

    MongooseModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>(ENV_VARIABLES.MONGO_DB_URI),
      }),
      inject: [ConfigService],
    }),

    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      // buildSchemaOptions: {
      //   orphanedTypes: [User]
      // },
      // debug: false, // to disable stacktrace in errors
      formatError: (error: GraphQLError) => {
        return formatGqlError(error)
      },
    }),
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
