import { Module } from '@nestjs/common';
import { CaptchaService } from './captcha.service';
import { CaptchaController } from './captcha.controller';
@Module({
  controllers: [CaptchaController],
  providers: [CaptchaService],
  exports: [CaptchaService],
})
export class CaptchaModule {}
