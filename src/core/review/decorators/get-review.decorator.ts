import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetReview = createParamDecorator((data: string, context: ExecutionContext) => {
  const review = context.switchToHttp().getRequest().review;

  return data ? review && review[data] : review;
});
