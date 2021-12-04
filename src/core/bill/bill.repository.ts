import { InternalServerErrorException } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { CompanyEntity } from '../company/company.entity';
import { CreateBillDto } from './dto/create-bill.dto';
import { BillEntity } from './bill.entity';
import { BILL_STATUS } from './enum/bill-status.enum';
import { UpdateBillDto } from './dto/update-bill.dto';

@EntityRepository(BillEntity)
export class BillRepository extends Repository<BillEntity> {
  async createCompanyBill(
    createBillDto: CreateBillDto,
    company: CompanyEntity,
  ): Promise<BillEntity> {
    const { amount } = createBillDto;

    const bill: BillEntity = new BillEntity();
    bill.amount = amount;
    bill.company = company;

    try {
      await bill.save();
      return bill;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async fillCompanyBill(
    updateBillDto: UpdateBillDto,
    bill: BillEntity,
  ): Promise<BillEntity> {
    if (updateBillDto.description) {
      bill.description = updateBillDto.description;
    }

    bill.status = BILL_STATUS.FILLED;
    bill.files = [];

    await bill.save();
    return bill;
  }

  async fulfillCompanyBill(bill: BillEntity): Promise<BillEntity> {
    bill.status = BILL_STATUS.FULFILLED;

    await bill.save();
    return bill;
  }

  async getAdminBillList(): Promise<BillEntity[]> {
    const query = this.createQueryBuilder('bill');
    query.leftJoin('bill.company', 'company');
    query.select(['bill.id', 'bill.status', 'bill.createDate', 'company.name']);

    return await query.getMany();
  }

  async getCompanyBillList(company: CompanyEntity): Promise<BillEntity[]> {
    const query = this.createQueryBuilder('bill');
    query.leftJoin('bill.company', 'company');
    query.where('company.id = :companyId', { companyId: company.id });
    query.select(['bill.id', 'bill.amount', 'bill.createDate', 'bill.status']);

    return await query.getMany();
  }

  async getAdminBillInfo(bill: BillEntity): Promise<BillEntity> {
    const adminBill = await this.createQueryBuilder('bill')
      .leftJoin('bill.company', 'company')
      .leftJoin('bill.files', 'files')
      .where('bill.id = :id', { id: bill.id })
      .select([
        'bill.id',
        'bill.status',
        'bill.createDate',
        'bill.amount',
        'bill.description',
        'company',
        'files',
      ])
      .getOne();

    return adminBill;
  }

  async getBillInfo(bill: BillEntity): Promise<BillEntity> {
    const billInfo = await this.createQueryBuilder('bill')
      .leftJoin('bill.company', 'company')
      .leftJoin('bill.files', 'files')
      .where('bill.id = :id', { id: bill.id })
      .select([
        'bill.id',
        'bill.status',
        'bill.createDate',
        'bill.amount',
        'bill.description',
        'company',
        'files',
      ])
      .getOne();

    return billInfo;
  }
}
