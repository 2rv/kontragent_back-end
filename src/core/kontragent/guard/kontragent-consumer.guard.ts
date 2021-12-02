import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { KontragentRepository } from '../kontragent.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { KontragentEntity } from '../kontragent.entity';

@Injectable()
export class KontragentConsumerGuard implements CanActivate {
  constructor(
    @InjectRepository(KontragentRepository)
    private kontragentRepository: KontragentRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { kontragent }: { kontragent: KontragentEntity } = request;
    //Сделать проверку kontragent.consumer === company

    return true;
  }
}
