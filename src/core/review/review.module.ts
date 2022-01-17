import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './review.entity';
import { ReviewController } from './review.controller';
import { AuthModule } from '../auth/auth.module';
import { ReviewService } from './review.service';
import { ReviewRepository } from './review.repository';
import { CompanyRepository } from '../company/company.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReviewEntity,
      ReviewRepository,
      CompanyRepository,
    ]),
    AuthModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
