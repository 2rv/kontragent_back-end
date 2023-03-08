import { InternalServerErrorException } from '@nestjs/common';
import { KonturApi } from '../company-data.core';

export type fsspQuery = {
  inn: string;
  skip: number;
};

export async function getFssp(query: fsspQuery): Promise<any> {
  try {
    const response = await KonturApi({
      method: 'GET',
      url: 'fssp',
      params: {
        inn: query.inn,
        skip: query.skip,
      },
    });
    return response.data;
  } catch (error) {
    throw new InternalServerErrorException(error.response.data);
  }
}
