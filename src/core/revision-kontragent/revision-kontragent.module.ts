import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { RevisionKontragentController } from './revision-kontragent.controller';
import { RevisionKontragentEntity } from './revision-kontragent.entity';
import { RevisionKontragentRepository } from './revision-kontragent.repository';
import { RevisionKontragentService } from './revision-kontragent.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      RevisionKontragentRepository,
      RevisionKontragentEntity,
    ]),
  ],
  controllers: [RevisionKontragentController],
  providers: [RevisionKontragentService],
})
export class RevisionKontragentModule {}
