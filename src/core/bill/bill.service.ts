import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from '../company/company.entity';
import { UserEntity } from '../user/user.entity';
import { BillRepository } from './bill.repository';
import { FileRepository } from '../file/file.repository';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { BillEntity } from './bill.entity';
import { BILL_STATUS } from './enum/bill-status.enum';
import { BILL_ERROR } from './enum/bill-error.enum';
import { CompanyBalanceService } from '../company-balance/company-balance.service';
import { GetCompanyBillListDto } from './dto/get-company-bill-list.dto';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(BillRepository)
    private billRepository: BillRepository,
    @InjectRepository(FileRepository)
    private fileRepository: FileRepository,
    private companyBalanceService: CompanyBalanceService,
  ) {}

  async createCompanyBill(
    createBillDto: CreateBillDto,
    company: CompanyEntity,
  ): Promise<void> {
    await this.billRepository.createCompanyBill(createBillDto, company);
  }

  async fillCompanyBill(
    updateBillDto: UpdateBillDto,
    bill: BillEntity,
  ): Promise<void> {
    await this.billRepository.fillCompanyBill(updateBillDto, bill);

    const ids: number[] = updateBillDto.files;
    if (ids && ids.length > 0) {
      for (const i in ids) {
        await this.fileRepository.assignFileToBillById(bill, ids[i]);
      }
    }
  }

  async fulfillCompanyBill(bill: BillEntity): Promise<void> {
    if (bill.status === BILL_STATUS.FULFILLED) {
      throw new BadRequestException(BILL_ERROR.BILL_ALREADY_FULFIELD);
    }

    await this.companyBalanceService.createCompanyBalanceRefill(
      bill.company,
      bill.amount,
    );

    await this.billRepository.fulfillCompanyBill(bill);
  }

  async getAdminBillList(): Promise<GetCompanyBillListDto> {
    const list: BillEntity[] = await this.billRepository.getAdminBillList();
    return { list };
  }

  async getCompanyBillList(
    company: CompanyEntity,
  ): Promise<GetCompanyBillListDto> {
    const list: BillEntity[] = await this.billRepository.getCompanyBillList(
      company,
    );

    return { list };
  }

  async getAdminBillInfo(bill: BillEntity): Promise<BillEntity> {
    const res = await this.billRepository.getAdminBillInfo(bill);
    return res;
  }

  async getBillInfo(bill: BillEntity): Promise<BillEntity> {
    const res = await this.billRepository.getBillInfo(bill);
    return res;
  }

  async deleteBill(bill: BillEntity) {
    await this.billRepository.delete(bill.id);
  }
}
