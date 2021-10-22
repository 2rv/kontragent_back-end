import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferalEntity } from './referal.entity';
import { ReferalRepository } from './referal.repository';
import { ReferalController } from './referal.controller';
import { AuthModule } from '../auth/auth.module';
import { ReferalService } from './referal.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReferalEntity, ReferalRepository]),
    AuthModule,
  ],
  controllers: [ReferalController],
  providers: [ReferalService],
})
export class ReferalModule {}
