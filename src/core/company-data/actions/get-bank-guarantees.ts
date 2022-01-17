import { InternalServerErrorException } from '@nestjs/common';
import { KonturApi } from '../company-data.core';

export type bankGuaranteesQuery = {
  inn: string;
  skip: number;
};

export async function getBankGuarantees(
  query: bankGuaranteesQuery,
): Promise<any> {
  try {
    const response = await KonturApi({
      method: 'GET',
      url: 'bankGuarantees',
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
