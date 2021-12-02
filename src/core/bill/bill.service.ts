import {
    Injectable,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from '../company/company.entity';
import { UserEntity } from '../user/user.entity';
import {BillRepository} from './bill.repository';
import { FileRepository } from '../file/file.repository';
import { BillCompanyCompanyIdDto } from './dto/bill-company-companyId.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { BillEntity } from './bill.entity';
import { BILL_STATUS } from './enum/bill-status.enum';
import { BILL_ERROR } from './enum/bill-error.enum';
import { CompanyBalanceService } from '../company-balance/company-balance.service';

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
    billCompanyCompanyIdDto: BillCompanyCompanyIdDto,
    company: CompanyEntity,
    user: UserEntity,
    
  ): Promise<void> {

    await this.billRepository.createCompanyBill(
        billCompanyCompanyIdDto,
        company,
    )
  }

  async fillCompanyBill(
    updateBillDto: UpdateBillDto,
    bill: BillEntity
  ): Promise<void> {
      await this.billRepository.fillCompanyBill(
          updateBillDto,
          bill
      )

      const ids: number[] = updateBillDto.files;
      if(ids && ids.length > 0){
          for(const i in ids) {
              await this.fileRepository.assignFileToBillById(
                  bill,
                  ids[i]
              )
          }
      }
  }

  async fulfillCompanyBill(
      bill: BillEntity, 
      company: CompanyEntity
  ): Promise<void>{

    if(bill.status === BILL_STATUS.FULFILLED)
    {  
       throw new BadRequestException(
            BILL_ERROR.CANNOT_FIND_BILL
        )
    }
        

  await this.companyBalanceService.createCompanyBalanceRefill(company, bill.amount)

  await this.billRepository.fulfillCompanyBill(bill)

  }

}
