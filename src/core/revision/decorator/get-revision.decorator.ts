import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RevisionEntity } from '../revision.entity';

export const GetRevision = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const { revision }: { revision: RevisionEntity } = request;

    return data ? revision && revision[data] : revision;
  },
);
