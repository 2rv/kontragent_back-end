import {
    Body,
    Controller,
    Post,
    Patch,
    Get,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { AccountGuard } from '../user/guard/account.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { GetAccount } from '../user/decorator/get-account.decorator';
import { GetBill } from './decorator/get-bill.decorator';
import { BillGuard } from './guard/bill.guard';
import { UserEntity } from '../user/user.entity';
import {BillService} from './bill.service'
import { BillEntity } from './bill.entity';
import { CompanyGuard } from '../company/guard/company.guard';
import { BillCompanyCompanyIdDto } from './dto/bill-company-companyId.dto';
import { GetCompany } from '../company/decorator/get-company.decorator';
import { CompanyEntity } from '../company/company.entity';
import { BILL_STATUS } from './enum/bill-status.enum';
import { UpdateBillDto } from './dto/update-bill.dto';
import { CompanyBalanceService } from '../company-balance/company-balance.service';
import { GetBillListDto } from './dto/get-bill-list.dto';

@Controller('bill')
export class BillController {
  constructor(private billService: BillService) {}

  @Post('/company/:companyId/')
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard)
  createCompanyBill(
      @Body(ValidationPipe) billCompanyCompanyIdDto: BillCompanyCompanyIdDto,
      @GetAccount() user: UserEntity,
      @GetCompany() company: CompanyEntity,
  ): Promise<void> {
   return this.billService.createCompanyBill(
    billCompanyCompanyIdDto,
    company,
    user,
   )  
  }

  @Patch('/:billId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard, BillGuard)
  fillCompanyBill(
    @Body(ValidationPipe) updateBillDto: UpdateBillDto,
    @GetBill() bill: BillEntity
  ): Promise<void> {
    return this.billService.fillCompanyBill(
        updateBillDto,
        bill,
    )
  }

  @Patch('/fulfill/:billId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard, BillGuard)
  fulfillCompanyBill(
    @GetBill() bill: BillEntity,
  ): Promise<void> {
    return this.billService.fulfillCompanyBill(bill) 
  }

  @Get('/bill-list')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard)
  getAdminBillList(): Promise<GetBillListDto> {
      return this.billService.getAdminBillList()
  }
}
