import { PipeTransform, BadRequestException } from '@nestjs/common';

export class TakeValidationPipe implements PipeTransform {
  transform(value: any = 30) {
    if (!value && value !== 0) {
      throw new BadRequestException();
    }

    if (isNaN(value)) {
      throw new BadRequestException();
    }

    if (value < 1) {
      throw new BadRequestException();
    }

    if (value > 100) {
      throw new BadRequestException();
    }

    return value;
  }
}
