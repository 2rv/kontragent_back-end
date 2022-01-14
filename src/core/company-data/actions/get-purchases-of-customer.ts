import { InternalServerErrorException } from '@nestjs/common';
import { KonturApi } from '../company-data.core';

export type purchasesOfCustomerQuery = {
  inn: string;
  skip?: number;
  take?: number;
};

export async function getPurchasesOfCustomer(
  query: purchasesOfCustomerQuery,
): Promise<any> {
  try {
    const response = await KonturApi({
      method: 'GET',
      url: 'purchasesOfCustomer',
      params: {
        inn: query.inn,
        skip: query.skip,
        take: query.take,
      },
    });
    return response.data;
  } catch (error) {
    throw new InternalServerErrorException(error.response.data);
  }
}
