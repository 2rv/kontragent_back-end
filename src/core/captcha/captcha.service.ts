import { Errors } from './enum/errors';
import { Cache } from 'cache-manager';
import Captcha from '../../common/captcha';

import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class CaptchaService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async generateCaptcha(): Promise<{ captcha: string }> {
    const captcha = await Captcha.create({ width: 150, height: 85 });
    const text = await captcha.text().toUpperCase();
    await captcha.generate();
    const data = await captcha.uri();

    console.log(`BASE64 IMAGE: ${data}, IMAGETEXT: ${text}`);

    await this.cacheManager.set(text, text);

    return { captcha: data };
  }

  async validateCaptcha(captchaCode: string): Promise<boolean> {
    if (!captchaCode) {
      throw new BadRequestException(Errors.CAPTCHA_VALUE_IS_UNCORRECT);
    }
    const data = await this.cacheManager.get(captchaCode.toUpperCase());
    if (!data) {
      throw new BadRequestException(Errors.CAPTCHA_VALUE_IS_UNCORRECT);
    }

    this.cacheManager.del(captchaCode);

    return true;
  }
}
