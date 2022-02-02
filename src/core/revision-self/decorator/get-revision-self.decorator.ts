import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RevisionSelfEntity } from '../revision-self.entity';

export const GetRevisionSelf = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const { revisionSelf }: { revisionSelf: RevisionSelfEntity } = request;

    return data ? revisionSelf && revisionSelf[data] : revisionSelf;
  },
);
