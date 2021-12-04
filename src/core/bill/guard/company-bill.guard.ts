import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class CompanyBillGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { bill, company } = request;

    if (bill.company.id !== company.id) {
      throw new NotFoundException();
    }

    return true;
  }
}
