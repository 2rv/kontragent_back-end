import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileRepository } from '../file/file.repository';
import { CompanyRepository } from '../company/company.repository';
import { CompanyBalanceModule } from '../company-balance/company-balance.module';
import { AuthModule } from '../auth/auth.module';
import { CompanyBalanceRepository } from '../company-balance/company-balance.repository';
import { BillRepository } from './bill.repository';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';
import { CompanyBalanceService } from '../company-balance/company-balance.service';
import { FileEntity } from '../file/file.entity';
import { PaymentRepository } from '../payment/payment.repository';

@Module({
    imports: [
        AuthModule,
        CompanyBalanceModule,
        TypeOrmModule.forFeature([
            FileRepository,
            FileEntity,
            BillRepository,
            CompanyRepository,
            CompanyBalanceRepository,
            PaymentRepository
        ]),
    ],

    controllers: [BillController],
    providers: [BillService, CompanyBalanceService]
})
export class BillModule {}

