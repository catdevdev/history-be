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
import { User } from './dto/users.dto';
import { UsersService } from './users.service';

// CurrentUser
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './user-avatars-uploads',
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
    @Body() body: { userId: number },
    @CurrentUser() user: User,
  ) {
    this.usersService.addOrUpdateUserAvatarImage(
      { userId: body.userId, imageAvatarUrl: file.filename },
      { username: user.username, password: user.password },
    );
  }
}
