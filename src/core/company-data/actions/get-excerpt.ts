import { InternalServerErrorException } from '@nestjs/common';
import { Readable } from 'stream';
import { KonturApi } from '../company-data.core';

export async function getExcerpt(inn: string): Promise<Readable> {
  try {
    const response = await KonturApi({
      method: 'GET',
      url: 'excerpt',
      responseType: 'arraybuffer',
      params: {
        inn: inn,
      },
    });
    return Readable.from(response.data);
  } catch (error) {
    throw new InternalServerErrorException(error.response.data);
  }
}
