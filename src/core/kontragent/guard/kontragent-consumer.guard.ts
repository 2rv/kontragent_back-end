import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class KontragentConsumerGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { kontragent, company } = request;

    if (kontragent.consumer.id !== company.id) {
      throw new NotFoundException();
    }

    return true;
  }
}
