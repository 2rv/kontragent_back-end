import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class KontragentConsumerGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { kontragent, company } = request;

    return kontragent.consumer === company;
  }
}
