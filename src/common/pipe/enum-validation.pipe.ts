import { PipeTransform } from '@nestjs/common';

export class EnumValidationPipe implements PipeTransform {
  constructor(private allowedValues) {
    this.allowedValues = Object.values(allowedValues);
  }

  transform(value: any = null) {
    if (!value) {
      return null;
    }

    const isValid = this.statusValidate(value);

    if (isValid) {
      return value;
    } else {
      return null;
    }
  }

  private statusValidate(status: any) {
    const index = this.allowedValues.indexOf(Number(status));
    return index !== -1;
  }
}
