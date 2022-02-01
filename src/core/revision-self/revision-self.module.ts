import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { RevisionSelfController } from './revision-self.controller';
import { RevisionSelfEntity } from './revision-self.entity';
import { RevisionSelfRepository } from './revision-self.repository';
import { RevisionSelfService } from './revision-self.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([RevisionSelfRepository, RevisionSelfEntity]),
  ],
  controllers: [RevisionSelfController],
  providers: [RevisionSelfService],
})
export class RevisionSelfModule {}
