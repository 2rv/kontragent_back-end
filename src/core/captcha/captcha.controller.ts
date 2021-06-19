import { Controller, Get } from '@nestjs/common';
import { CaptchaService } from './captcha.service';
@Controller('captcha')
export class CaptchaController {
  constructor(private captchaService: CaptchaService) {}
  @Get('/')
  async generateCaptcha(): Promise<{ captcha: string }> {
    return this.captchaService.generateCaptcha();
  }
}
