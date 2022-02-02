import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CompanyBalanceService } from '../company-balance/company-balance.service';
import { CompanyEntity } from '../company/company.entity';
import { FileRepository } from '../file/file.repository';
import { PAYMENT_TYPE } from '../payment/enum/payment-type.enum';
import { UserEntity } from '../user/user.entity';

import { RevisionRepository } from './revision.repository';
import { RevisionEntity } from './revision.entity';

import { REVISION_ERROR } from './enum/revision-error.enum';
import { REVISION_STATUS } from './enum/revision-status.enum';

import { CreateRevisionDto } from './dto/create-revision.dto';
import { GetRevisionListDto } from './dto/get-revision-list.dto';
import { UpdateRevisionDto } from './dto/update-revision.dto';
import { revisionPeriodPrice } from '../../common/utils/revison-price';
import { KontragentEntity } from '../kontragent/kontragent.entity';

@Injectable()
export class RevisionService {
  constructor(
    @InjectRepository(RevisionRepository)
    private revisionRepository: RevisionRepository,
    @InjectRepository(FileRepository)
    private fileRepository: FileRepository,
    private companyBalanceService: CompanyBalanceService,
  ) {}

  async createRevision(
    createRevisionDto: CreateRevisionDto,
    company: CompanyEntity,
    creator: UserEntity,
  ): Promise<void> {
    try {
      const price = createRevisionDto.kontragents.reduce((acc, item) => {
        return (acc += revisionPeriodPrice(item.years));
      }, 0);

      if (!price || price === 0) {
        throw new BadRequestException(REVISION_ERROR.PRICE_IS_NULL);
      }

      await this.companyBalanceService.createCompanyBalancePayment(
        company,
        price,
        PAYMENT_TYPE.REVISION,
      );

      const result = await this.revisionRepository.createRevision(
        createRevisionDto,
        company,
        creator,
      );

      result.revisionKontragent.map((item) => {
        this.fileRepository.assignFileToRevisionKontragentDescriptionById(item);
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getRevisionList(company: CompanyEntity): Promise<GetRevisionListDto> {
    const list = await this.revisionRepository.getRevisionList(company);
    return { list };
  }

  async getRevision(revision: RevisionEntity): Promise<RevisionEntity> {
    return await this.revisionRepository.getRevision(revision);
  }

  async getAdminRevisionList(): Promise<GetRevisionListDto> {
    const list: RevisionEntity[] =
      await this.revisionRepository.getAdminRevisionList();
    return { list };
  }

  async getAdminRevision(revision: RevisionEntity): Promise<RevisionEntity> {
    return await this.revisionRepository.getAdminRevision(revision);
  }

  async updateRevision(
    updateRevisionDto: UpdateRevisionDto,
    revision: RevisionEntity,
  ): Promise<void> {
    const result = await this.revisionRepository.updateRevision(
      revision,
      updateRevisionDto,
    );

    await this.fileRepository.assignFileToRevisionReviewById(
      result,
      updateRevisionDto.filesReview,
    );
  }

  async createRevisionPayment(
    revision: RevisionEntity,
    company: CompanyEntity,
  ): Promise<void> {
    try {
      if (revision.status !== REVISION_STATUS.PAY) {
        throw new BadRequestException(
          REVISION_ERROR.REVISION_STATUS_IS_NOT_PAYMENT,
        );
      }

      await this.companyBalanceService.createCompanyBalancePayment(
        company,
        revision.price,
      );

      revision.status = REVISION_STATUS.PAID;
      revision.price = 0;
      await revision.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getRevisionKontragentList(
    company: CompanyEntity,
    kontragent: KontragentEntity,
  ): Promise<GetRevisionListDto> {
    const list = await this.revisionRepository.getRevisionKontragentList(
      company,
      kontragent,
    );
    return { list };
  }
}
