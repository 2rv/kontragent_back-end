import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { KonturApi } from '../company-data.core';

export type personBankruptcyQuery = {
  innfl?: string;
  fio?: string;
  birthDate?: string;
};

export async function getPersonBankruptcy(
  query: personBankruptcyQuery,
): Promise<any> {
  try {
    if (!query.innfl && !query.fio) {
      throw new BadRequestException(
        'Необходимо указать либо ИННФЛ, либо ФИО с/без даты рождения',
      );
    }
    const response = await KonturApi({
      method: 'GET',
      url: 'personBankruptcy',
      params: {
        innfl: query.innfl,
        fio: query.fio,
        birthDate: query.birthDate,
      },
    });
    return response.data;
  } catch (error) {
    throw new InternalServerErrorException(error.response.data);
  }
}
