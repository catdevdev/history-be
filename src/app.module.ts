import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PgService } from './pg/pg.service';
import { PgModule } from './pg/pg.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { StoryModule } from './story/story.module';
import { StoryService } from './story/story.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UserPostModule } from './user-post/user-post.module';
import { UserPostService } from './user-post/user-post.service';
import { UserPostCommentsService } from './user-post/user-post-comments.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: ({ req }) => ({ headers: req.headers }),
    }),

    UsersModule,
    AuthModule,
    StoryModule,
    PgModule,
    UserPostModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    StoryService,
    PgService,
    UserPostService,
    UserPostCommentsService,
  ],
})
export class AppModule {}
