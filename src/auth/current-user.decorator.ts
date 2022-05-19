import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import jwt_decode from 'jwt-decode';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);

    const decoded = jwt_decode(
      ctx
        .getContext()
        .req.rawHeaders.find((raw) => raw.split(' ')[0] === 'Bearer'),
    );

    return decoded;
  },
);
