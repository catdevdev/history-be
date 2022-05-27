import { UserPost } from 'src/user-post/dto/user-post.dto';

export type LoggingStatistic = {
  User_id: number;
  loggedAt: number;
  ipAddress: number;
  system: number;
};

export type UserPostsStatistic = {
  User_id: number;
  UserPost_id: number;
  action: string;
  createdAt: Date;
};

