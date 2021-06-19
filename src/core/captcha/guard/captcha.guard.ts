import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { CaptchaService } from '../captcha.service';
@Injectable()
export class CaptchaGuard implements CanActivate {
  constructor(
    @Inject('CaptchaService') private readonly captchaService: CaptchaService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { body }: { body: { captchaCode: string } } = request;
    if (!body) return false;
    const { captchaCode } = body;
    await this.captchaService.validateCaptcha(captchaCode);
  }
}
