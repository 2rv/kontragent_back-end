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
import { ReferalService } from '../referal/referal.service';
import { REFERAL_PAYMENT_TYPE } from '../referal-payment/enum/referal-payment-type.enum';
import { UserRepository } from '../user/user.repository';
import { MailService } from '../mail/mail.service';
import { USER_ROLE } from '../user/enum/user-role.enum';

@Injectable()
export class RevisionSelfService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(RevisionSelfRepository)
    private revisionSelfRepository: RevisionSelfRepository,
    @InjectRepository(FileRepository)
    private fileRepository: FileRepository,
    private companyBalanceService: CompanyBalanceService,
    private referalService: ReferalService,
    private mailService: MailService,
  ) {}

  async createRevisionSelf(
    createRevisionSelfDto: CreateRevisionSelfDto,
    company: CompanyEntity,
    creator: UserEntity,
  ): Promise<void> {
    try {
      let price = revisionPeriodPrice(createRevisionSelfDto.period);

      if (!price || price === 0) {
        throw new BadRequestException(REVISION_SELF_ERROR.PRICE_IS_NULL);
      }

      if (createRevisionSelfDto.isUseReferalBalance) {
        price = await this.referalService.createReferalBalancePayment(
          creator,
          REFERAL_PAYMENT_TYPE.USER_TO_REVISION_SELF_PAY,
          price,
        );
      }

      await this.companyBalanceService.createCompanyBalancePayment(
        company,
        price,
        PAYMENT_TYPE.REVISION_SELF,
      );

      const result = await this.revisionSelfRepository.createRevisionSelf(
        createRevisionSelfDto,
        company,
        creator,
        price,
      );

      await this.fileRepository.assignFileToRevisionSelfDescriptionById(
        result,
        createRevisionSelfDto.files,
      );

      const admins = await this.userRepository.getUserListByRole(
        USER_ROLE.ADMIN,
      );

      await this.mailService.sendNotificationNewRevisionSelf(admins, result);
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
