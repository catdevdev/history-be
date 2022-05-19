import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { nanoid } from 'nanoid';
import { extname } from 'path';
import { CurrentUser } from 'src/auth/current-user-rest-api.decorator';
import { User } from 'src/users/dto/users.dto';
import { UserPostService } from './user-post.service';

@Controller('user-post')
export class UserPostController {
  constructor(private userPost: UserPostService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './user-post-uploads',
        filename: (req, file, cb) => {
          const fileExtName = extname(file.originalname);
          const id = nanoid(12);

          cb(null, `${id}${fileExtName}`);
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { userPostId: number },
    @CurrentUser() user: User,
  ) {
    this.userPost.addImageIntoUserPost(
      { userPostId: body.userPostId, imageCoverFileName: file.filename },
      { username: user.username, password: user.password },
    );
  }
}
