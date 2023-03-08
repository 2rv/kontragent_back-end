import { PipeTransform, BadRequestException } from '@nestjs/common';

export class SkipValidationPipe implements PipeTransform {
  transform(value: any = 0) {
    if (!value && value !== 0) {
      throw new BadRequestException();
    }

    if (isNaN(value)) {
      throw new BadRequestException();
    }

    if (value < 0) {
      throw new BadRequestException();
    }

    return value;
  }
}
