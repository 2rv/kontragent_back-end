import { Errors } from './enum/errors';
import { Cache } from 'cache-manager';
import { Captcha } from './captcha';
import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
} from '@nestjs/common';

interface CaptchaDataType {
  data: string;
  text: string;
}
export const createCaptcha = async (): Promise<CaptchaDataType> => {
  const captcha = await Captcha.create();
  const text = await captcha.text();
  await captcha.generate();
  const data = await captcha.uri();
  return {
    data,
    text,
  };
};

@Injectable()
export class CaptchaService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async generateCaptcha(): Promise<{ captcha: string }> {
    const { data, text } = await createCaptcha();
    console.log(`BASE64 IMAGE: ${data}, IMAGETEXT: ${text}`);
    await this.cacheManager.set(text.toUpperCase(), data);
    return { captcha: data };
  }

  async validateCaptcha(captchaCode: string): Promise<void> {
    if (!captchaCode) {
      throw new BadRequestException(Errors.CAPTCHA_VALUE_IS_UNCORRECT);
    }
    const data = await this.cacheManager.get(captchaCode);
    if (!data) {
      throw new BadRequestException(Errors.CAPTCHA_VALUE_IS_UNCORRECT);
    }
    this.cacheManager.del(captchaCode);
  }
}
