import { InternalServerErrorException } from '@nestjs/common';
import { KonturApi } from '../company-data.core';

export async function getFtsDebtors(
  inn: string,
): Promise<ftsDebtorsResponseType> {
  try {
    const response = await KonturApi({
      method: 'GET',
      url: 'ftsDebtors',
      params: {
        inn: inn,
      },
    });
    return response.data;
  } catch (error) {
    throw new InternalServerErrorException(error.response.data);
  }
}
type ftsDebtorsResponseType = {
  inn: string;
  ogrn: string;
  focusHref: string;
  inList: boolean;
};
