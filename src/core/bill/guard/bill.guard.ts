import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BillRepository } from '../bill.repository';
import { BILL_ERROR } from '../enum/bill-error.enum';

@Injectable()
export class BillGuard implements CanActivate {
  constructor(
    @InjectRepository(BillRepository)
    private billRepository: BillRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { params } = request;

    if (isNaN(params.billId)) {
      throw new BadRequestException();
    }

    const bill = await this.billRepository.findOne({
      where: { id: params.billId },
      relations: ['company'],
    });

    if (!bill) {
      throw new NotFoundException(BILL_ERROR.CANNOT_FIND_BILL);
    }

    request.bill = bill;

    return true;
  }
}
