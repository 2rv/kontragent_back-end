import { InternalServerErrorException } from '@nestjs/common';
import { KonturApi } from '../company-data.core';

export type inspectionsQuery = {
  inn: string;
  skip?: number;
  take?: number;
};

export async function getInspections(query: inspectionsQuery): Promise<any> {
  try {
    const response = await KonturApi({
      method: 'GET',
      url: 'inspections',
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
