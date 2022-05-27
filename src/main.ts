import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as bodyParser from 'body-parser';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.useStaticAssets(join(__dirname, '..', 'user-avatars-uploads'), {
    prefix: '/user-avatars-uploads/',
  });
  app.useStaticAssets(join(__dirname, '..', 'user-post-uploads'), {
    prefix: '/user-post-uploads/',
  });
  await app.listen(3000);
}
bootstrap();
