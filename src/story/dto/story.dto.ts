import { UserPost } from 'src/user-post/dto/user-post.dto';

export type History = {
  User_id: number;
  Story_id: number;
  content: string;
} & UserPost;
