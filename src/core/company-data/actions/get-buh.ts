import { InternalServerErrorException } from '@nestjs/common';
import { KonturApi } from '../company-data.core';

export async function getBuh(inn: string): Promise<any> {
  try {
    const response = await KonturApi({
      method: 'GET',
      url: 'buh',
      params: {
        inn: inn,
      },
    });
    return response.data;
  } catch (error) {
    throw new InternalServerErrorException(error.response.data);
  }
}
