import { InternalServerErrorException } from '@nestjs/common';
import { KonturApi } from '../company-data.core';

export async function checkPassport(passportNumber: string): Promise<any> {
  try {
    const response = await KonturApi({
      method: 'GET',
      url: 'checkPassport',
      params: {
        passportNumber: passportNumber,
      },
    });
    return response.data;
  } catch (error) {
    throw new InternalServerErrorException(error.response.data);
  }
}
