import { Module } from '@nestjs/common';
import { CaptchaService } from './captcha.service';
import { CaptchaController } from './captcha.controller';
import { CacheModule } from '@nestjs/common';
import { CacheModuleConfig } from 'src/config/cache.config';
@Module({
  imports: [CacheModule.register(CacheModuleConfig)],
  controllers: [CaptchaController],
  providers: [CaptchaService],
  exports: [CaptchaService],
})
export class CaptchaModule {}
