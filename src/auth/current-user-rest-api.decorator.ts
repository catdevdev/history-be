import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import jwt_decode from 'jwt-decode';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    console.log(request.headers.authorization);

    const decoded = jwt_decode(request.headers.authorization);

    console.log(decoded);

    return decoded;
  },
);
