import {
  Body,
  Controller,
  Post,
  Patch,
  Get,
  Delete,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AccountGuard } from '../user/guard/account.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { GetBill } from './decorator/get-bill.decorator';
import { BillGuard } from './guard/bill.guard';
import { CompanyBillGuard } from './guard/company-bill.guard';
import { BillService } from './bill.service';
import { BillEntity } from './bill.entity';
import { CompanyGuard } from '../company/guard/company.guard';
import { CreateBillDto } from './dto/create-bill.dto';
import { GetCompany } from '../company/decorator/get-company.decorator';
import { CompanyEntity } from '../company/company.entity';
import { UpdateBillDto } from './dto/update-bill.dto';
import { GetCompanyBillListDto } from './dto/get-company-bill-list.dto';
import { CompanyMemberGuard } from '../company-member/guard/company-member.guard';

@Controller('bill')
export class BillController {
  constructor(private billService: BillService) {}

  @Post('/company/:companyId/')
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard, CompanyMemberGuard)
  createCompanyBill(
    @Body(ValidationPipe) createBillDto: CreateBillDto,
    @GetCompany() company: CompanyEntity,
  ): Promise<void> {
    return this.billService.createCompanyBill(createBillDto, company);
  }

  @Patch('/:billId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard, BillGuard)
  fillCompanyBill(
    @Body(ValidationPipe) updateBillDto: UpdateBillDto,
    @GetBill() bill: BillEntity,
  ): Promise<void> {
    return this.billService.fillCompanyBill(updateBillDto, bill);
  }

  @Patch('/fulfill/:billId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard, BillGuard)
  fulfillCompanyBill(@GetBill() bill: BillEntity): Promise<void> {
    return this.billService.fulfillCompanyBill(bill);
  }

  @Get('/bill-list')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard)
  getAdminBillList(): Promise<GetCompanyBillListDto> {
    return this.billService.getAdminBillList();
  }

  @Get('admin/company/:companyId/bill-list')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard)
  getAdminCompanyBillList(
    @GetCompany() company: CompanyEntity,
  ): Promise<GetCompanyBillListDto> {
    return this.billService.getCompanyBillList(company);
  }

  @Get('/company/:companyId/bill-list')
  @UseGuards(AuthGuard(), AccountGuard, CompanyGuard, CompanyMemberGuard)
  getCompanyBillList(
    @GetCompany() company: CompanyEntity,
  ): Promise<GetCompanyBillListDto> {
    return this.billService.getCompanyBillList(company);
  }

  @Get('/:billId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard, BillGuard)
  getAdminBillInfo(@GetBill() bill: BillEntity): Promise<BillEntity> {
    return this.billService.getAdminBillInfo(bill);
  }

  @Get('/company/:companyId/bill/:billId')
  @Roles(USER_ROLE.USER)
  @UseGuards(
    AuthGuard(),
    AccountGuard,
    CompanyGuard,
    CompanyMemberGuard,
    BillGuard,
    CompanyBillGuard,
  )
  getBillInfo(@GetBill() bill: BillEntity): Promise<BillEntity> {
    return this.billService.getBillInfo(bill);
  }

  @Delete('/delete/bill/:billId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard, BillGuard)
  deleteBill(@GetBill() bill: BillEntity) {
    return this.billService.deleteBill(bill);
  }
}
