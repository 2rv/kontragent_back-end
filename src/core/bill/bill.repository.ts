import {
    InternalServerErrorException,
} from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { CompanyEntity } from '../company/company.entity';
import {BillCompanyCompanyIdDto} from './dto/bill-company-companyId.dto'
import { BillEntity } from './bill.entity';
import { BILL_STATUS } from './enum/bill-status.enum';
import { UpdateBillDto } from './dto/update-bill.dto';


@EntityRepository(BillEntity)
export class BillRepository extends Repository<BillEntity> {

    async createCompanyBill(
        billCompanyCompanyIdDto: BillCompanyCompanyIdDto,
        company: CompanyEntity,
    ): Promise<BillEntity> {

    const {amount} = billCompanyCompanyIdDto;

    const bill: BillEntity = new BillEntity()
    bill.amount = amount;
    bill.company = company;

    try {
        await bill.save()
        return bill
    }catch(error){
        console.log(error);
        
        throw new InternalServerErrorException();
        }
    }

    async fillCompanyBill(
        updateBillDto: UpdateBillDto,
        bill: BillEntity
    ): Promise<BillEntity> {

        if(updateBillDto.description){
            bill.description = updateBillDto.description
        }

        bill.status = BILL_STATUS.FILLED
        bill.files = []

        await bill.save()
        return bill
    }

    async fulfillCompanyBill(
        bill: BillEntity
    ): Promise<BillEntity> {

        bill.status = BILL_STATUS.FULFILLED

        await bill.save()
        return bill

    }

}
