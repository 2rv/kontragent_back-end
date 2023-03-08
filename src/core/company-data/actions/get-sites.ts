import { InternalServerErrorException } from '@nestjs/common';
import { KonturApi } from '../company-data.core';

export async function getSites(inn: string): Promise<any> {
  try {
    const response = await KonturApi({
      method: 'GET',
      url: 'sites',
      params: {
        inn: inn,
      },
    });
    return response.data;
  } catch (error) {
    throw new InternalServerErrorException(error.response.data);
  }
}
