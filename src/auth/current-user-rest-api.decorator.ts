import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import jwt_decode from 'jwt-decode';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const decoded = jwt_decode(request.headers.authorization);

    return decoded;
  },
);
