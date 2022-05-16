import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import jwt_decode from 'jwt-decode';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);

    console.log(ctx.getContext().req.rawHeaders[7]);

    // console.log(
    //   ctx
    //     .getContext()
    //     .req.rawHeaders.findOne((raw) => raw.split(' ')[0] === 'Bearer'),
    // );

    console.log(
      ctx
        .getContext()
        .req.rawHeaders.find((raw) => raw.split(' ')[0] === 'Bearer'),
    );

    const decoded = jwt_decode(
      ctx
        .getContext()
        .req.rawHeaders.find((raw) => raw.split(' ')[0] === 'Bearer'),
    );

    return decoded;
  },
);
