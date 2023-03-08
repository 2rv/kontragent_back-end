import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FeedbackEntity } from '../feedback.entity';

export const GetFeedback = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const { feedback }: { feedback: FeedbackEntity } = request;

    return data ? feedback && feedback[data] : feedback;
  },
);
