import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyBalanceService } from '../company-balance/company-balance.service';
import { CompanyEntity } from '../company/company.entity';
import { FileRepository } from '../file/file.repository';
import { PAYMENT_TYPE } from '../payment/enum/payment-type.enum';
import { UserEntity } from '../user/user.entity';
import { CreateRevisionSelfDto } from './dto/create-revision-self.dto';
import { GetRevisionSelfListDto } from './dto/get-revision-self-list.dto';
import { UpdateRevisionSelfDto } from './dto/update-revision-self.dto';
import { REVISION_SELF_ERROR } from './enum/revision-self-error.enum';
import { REVISION_SELF_STATUS } from './enum/revision-self-status.enum';
import { RevisionSelfEntity } from './revision-self.entity';
import { RevisionSelfRepository } from './revision-self.repository';
import { revisionPeriodPrice } from '../../common/utils/revison-price';

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
      const price = revisionPeriodPrice(createRevisionSelfDto.period);

      if (!price || price === 0) {
        throw new BadRequestException(REVISION_SELF_ERROR.PRICE_IS_NULL);
      }

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

  async getAdminRevisionSelfList(): Promise<GetRevisionSelfListDto> {
    const list: RevisionSelfEntity[] =
      await this.revisionSelfRepository.getAdminRevisionSelfList();
    return { list };
  }

  async getAdminRevisionSelf(
    revisionSelf: RevisionSelfEntity,
  ): Promise<RevisionSelfEntity> {
    return await this.revisionSelfRepository.getAdminRevisionSelf(revisionSelf);
  }

  async updateRevisionSelf(
    updateRevisionSelfDto: UpdateRevisionSelfDto,
    revision: RevisionSelfEntity,
  ): Promise<void> {
    const result = await this.revisionSelfRepository.updateRevisionSelf(
      revision,
      updateRevisionSelfDto,
    );

    await this.fileRepository.assignFileToRevisionSelfReviewById(
      result,
      updateRevisionSelfDto.filesReview,
    );
  }

  async createRevisionSelfPayment(
    revisionSelf: RevisionSelfEntity,
    company: CompanyEntity,
  ): Promise<void> {
    try {
      if (revisionSelf.status !== REVISION_SELF_STATUS.PAY) {
        throw new BadRequestException(
          REVISION_SELF_ERROR.REVISION_STATUS_IS_NOT_PAYMENT,
        );
      }

      await this.companyBalanceService.createCompanyBalancePayment(
        company,
        revisionSelf.price,
      );

      revisionSelf.status = REVISION_SELF_STATUS.PAID;
      revisionSelf.price = 0;
      await revisionSelf.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
