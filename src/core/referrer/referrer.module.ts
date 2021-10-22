import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferrerEntity } from './referrer.entity';
import { ReferrerController } from './referrer.controller';
import { AuthModule } from '../auth/auth.module';
import { ReferrerService } from './referrer.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReferrerEntity]), AuthModule],
  controllers: [ReferrerController],
  providers: [ReferrerService],
})
export class ReferrerModule {}
