import { InternalServerErrorException } from '@nestjs/common';
import { Readable } from 'stream';
import { KonturApi } from '../company-data.core';

export async function getBriefReportPdf(inn: string): Promise<Readable> {
  try {
    const response = await KonturApi({
      method: 'GET',
      url: 'briefReport',
      responseType: 'arraybuffer',
      params: {
        inn: inn,
        pdf: true,
      },
    });
    return Readable.from(response.data);
  } catch (error) {
    throw new InternalServerErrorException(error.response.data);
  }
}
