import { InternalServerErrorException } from '@nestjs/common';
import { KonturApi } from '../company-data.core';

export type lesseeQuery = {
  inn: string;
  skip: number;
  limit: number;
};

export async function getLessee(query: lesseeQuery): Promise<any> {
  try {
    const response = await KonturApi({
      method: 'GET',
      url: 'lessee',
      params: {
        inn: query.inn,
        skip: query.skip,
        limit: query.limit,
      },
    });
    return response.data;
  } catch (error) {
    throw new InternalServerErrorException(error.response.data);
  }
}
