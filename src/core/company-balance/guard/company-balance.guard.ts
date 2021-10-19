import {
  Injectable,
  CanActivate,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyBalanceRepository } from '../company-balance.repository';

@Injectable()
export class CompanyBalanceGuard implements CanActivate {
  constructor(
    @InjectRepository(CompanyBalanceRepository)
    private companyBalanceRepository: CompanyBalanceRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { company } = request;

    const companyBalance = await this.companyBalanceRepository.findOne({
      where: { company },
      relations: ['company'],
    });

    if (!companyBalance) {
      throw new InternalServerErrorException();
    }

    request.companyBalance = companyBalance;

    return true;
  }
}
