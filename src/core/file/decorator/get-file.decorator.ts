import { createParamDecorator } from '@nestjs/common';
import { FileEntity } from '../file.entity';

export const GetFile = createParamDecorator((data: string, context) => {
  const file: FileEntity = context.switchToHttp().getRequest().file;

  return data ? file && file[data] : file;
});
