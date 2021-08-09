import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { CreateSupportRequestDto } from './dto/create-support-request.dto';
import { SupportRepository } from './support.repository';

@Injectable()
export class SupportService {
  constructor(
    @InjectRepository(SupportRepository)
    private supportRepository: SupportRepository,
  ) {}

  async createRequest(
    createSupportRequestDto: CreateSupportRequestDto,
    user: UserEntity,
  ): Promise<void> {
    const requestInSupport = await this.supportRepository.createSupportRequest(
      createSupportRequestDto,
      user,
    );
    await this.supportRepository.addCreatorInRequestInSupport(
      requestInSupport,
      user.id,
    );
  }
}
