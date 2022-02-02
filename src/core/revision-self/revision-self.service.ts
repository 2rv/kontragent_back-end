import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyBalanceService } from '../company-balance/company-balance.service';
import { CompanyEntity } from '../company/company.entity';
import { FileRepository } from '../file/file.repository';
import { PAYMENT_TYPE } from '../payment/enum/payment-type.enum';
import { UserEntity } from '../user/user.entity';
import { CreateRevisionSelfDto } from './dto/create-revision-self.dto';
import { GetRevisionSelfListDto } from './dto/get-revision-self-list.dto';
import { RevisionSelfEntity } from './revision-self.entity';
import { RevisionSelfRepository } from './revision-self.repository';

@Injectable()
export class RevisionSelfService {
  constructor(
    @InjectRepository(RevisionSelfRepository)
    private revisionSelfRepository: RevisionSelfRepository,
    @InjectRepository(FileRepository)
    private fileRepository: FileRepository,
    private companyBalanceService: CompanyBalanceService,
  ) {}

  async createRevisionSelf(
    createRevisionSelfDto: CreateRevisionSelfDto,
    company: CompanyEntity,
    creator: UserEntity,
  ): Promise<void> {
    try {
      const price = createRevisionSelfDto.period.reduce((acc, period) => {
        if (period.kvartal1) acc += 500;
        if (period.kvartal2) acc += 500;
        if (period.kvartal3) acc += 500;
        if (period.kvartal4) acc += 500;
        return acc;
      }, 0);

      await this.companyBalanceService.createCompanyBalancePayment(
        company,
        price,
        PAYMENT_TYPE.REVISION,
      );

      const result = await this.revisionSelfRepository.createRevisionSelf(
        createRevisionSelfDto,
        company,
        creator,
      );

      await this.fileRepository.assignFileToRevisionSelfDescriptionById(
        result,
        createRevisionSelfDto.files,
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getRevisionSelfList(
    company: CompanyEntity,
  ): Promise<GetRevisionSelfListDto> {
    const list = await this.revisionSelfRepository.getRevisionSelfList(company);
    return { list };
  }

  async getRevisionSelf(
    revisionSelf: RevisionSelfEntity,
  ): Promise<RevisionSelfEntity> {
    return await this.revisionSelfRepository.getRevisionSelf(revisionSelf);
  }
}
