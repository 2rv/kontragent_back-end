import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CompanyRepository } from '../company.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CompanyGuard implements CanActivate {
  constructor(
    @InjectRepository(CompanyRepository)
    private companyRepository: CompanyRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { params } = request;

    if (isNaN(params.companyId)) {
      throw new BadRequestException();
    }

    const company = await this.companyRepository.findOne({
      where: { id: Number(params.companyId) },
    });

    if (!company) {
      throw new NotFoundException();
    }

    request.company = company;

    return true;
  }
}
