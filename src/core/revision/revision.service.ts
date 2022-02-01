import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyBalanceService } from '../company-balance/company-balance.service';
import { CompanyEntity } from '../company/company.entity';
import { FileRepository } from '../file/file.repository';
import {
  GetCompanyRevisionListDto,
  GetCompanyRevisionListItemDto,
} from './dto/get-company-revision-list.dto';
import { GetRevisionListInfoDto } from './dto/get-revision-list-info.dto';
import { UpdateRevisionDto } from './dto/update-revision-info.dto';
import { REVISION_ERROR } from './enum/revision-error.enum';
import { REVISION_STATUS } from './enum/revision-status.enum';
import { PAYMENT_TYPE } from '../payment/enum/payment-type.enum';
import { RevisionEntity } from './revision.entity';
import { RevisionRepository } from './revision.repository';
import { UserEntity } from '../user/user.entity';
import { CreateRevisionKontragentDto } from './dto/create-revision-kontragent.dto';

@Injectable()
export class RevisionService {
  constructor(
    @InjectRepository(RevisionRepository)
    private revisionRepository: RevisionRepository,
    @InjectRepository(FileRepository)
    private fileRepository: FileRepository,
    private companyBalanceService: CompanyBalanceService,
  ) {}

  async createRevisionKontragent(
    newRevisionData: CreateRevisionKontragentDto,
    company: CompanyEntity,
    creator: UserEntity,
  ): Promise<void> {
    await this.revisionRepository.createRevisionNew(
      newRevisionData,
      company,
      creator,
    );
  }

  // --------------- старый код

  async createRevision(
    createRevisionCompaniesDto: any[],
    company: CompanyEntity,
    creator: UserEntity,
  ): Promise<void> {
    // подсчёт цены
    let price = 0;
    const onePeriodRevisionPrice = 500;
    const addPrice = (add: number) => (price += add);
    const culcRevisionPrice = (years: any[]) => {
      years.forEach((year) => {
        year.firstPeriod && addPrice(onePeriodRevisionPrice);
        year.secondPeriod && addPrice(onePeriodRevisionPrice);
        year.thirdPeriod && addPrice(onePeriodRevisionPrice);
        year.fourthPeriod && addPrice(onePeriodRevisionPrice);
      });
    };
    createRevisionCompaniesDto.forEach((revisionCompany) => {
      culcRevisionPrice(revisionCompany.year);
    });

    await this.companyBalanceService.createCompanyBalancePayment(
      company,
      price,
      PAYMENT_TYPE.REVISION,
    );
    // подсчёт цены
    const revision: RevisionEntity = new RevisionEntity();
    revision.company = company;
    revision.creator = creator;
    revision.status = REVISION_STATUS.NEW;
    revision.save();

    // this.revisionCompanyService.createRevisionCompanies(
    //   createRevisionCompaniesDto,
    //   revision,
    // );
  }

  async createSelfRevision(
    createRevisionOwnCompanyDto: any,
    company: CompanyEntity,
    creator: UserEntity,
  ): Promise<void> {
    let price = 0;
    const onePeriodRevisionPrice = 500;
    const addPrice = (add: number) => (price += add);
    const culcRevisionPrice = (years: any[]) => {
      years.forEach((year) => {
        year.firstPeriod && addPrice(onePeriodRevisionPrice);
        year.secondPeriod && addPrice(onePeriodRevisionPrice);
        year.thirdPeriod && addPrice(onePeriodRevisionPrice);
        year.fourthPeriod && addPrice(onePeriodRevisionPrice);
      });
    };
    culcRevisionPrice(createRevisionOwnCompanyDto.year);

    await this.companyBalanceService.createCompanyBalancePayment(
      company,
      price,
      PAYMENT_TYPE.REVISION,
    );

    const revision: RevisionEntity = new RevisionEntity();
    revision.company = company;
    revision.creator = creator;
    revision.status = REVISION_STATUS.NEW;
    revision.save();

    // this.revisionCompanyService.createSelfRevisionCompany(
    //   createRevisionOwnCompanyDto,
    //   revision,
    //   company,
    // );
  }

  async updateRevisionReview(
    updateRevisionDto: UpdateRevisionDto,
    revision: RevisionEntity,
  ): Promise<void> {
    await this.revisionRepository.updateRevisionReview(
      revision,
      updateRevisionDto,
    );

    const ids: number[] = updateRevisionDto.fileReviewIdList;
    if (ids && ids.length > 0) {
      for (const i in ids) {
        await this.fileRepository.assignFileToRevisionReviewById(
          revision,
          ids[i],
        );
      }
    }
  }

  async getCompanyRevisionList(
    company: CompanyEntity,
  ): Promise<GetCompanyRevisionListDto> {
    const list: GetCompanyRevisionListItemDto[] =
      await this.revisionRepository.getRevisionListByCompany(company);

    return { list };
  }

  async getAccountRevisionReview(
    revision: RevisionEntity,
  ): Promise<RevisionEntity> {
    const fullRevison = await this.revisionRepository
      .createQueryBuilder('revision')
      .leftJoin('revision.revisionCompanies', 'revisionCompanies')
      .leftJoin('revisionCompanies.fileDescription', 'fileDescription')
      .leftJoin('revisionCompanies.year', 'year')
      .where('revision.id = :id', { id: revision.id })
      .select([
        'revision.id',
        'revision.additionPrice',
        'revision.createDate',
        'revision.status',
        'revision.review',
        'revision.additionPrice',
        'fileReview',
        'revisionCompanies',
        'year',
        'fileDescription',
      ])
      .getOne();

    return fullRevison;
  }

  async getAdminRevisionReview(
    revision: RevisionEntity,
  ): Promise<RevisionEntity> {
    const adminRevison = await this.revisionRepository
      .createQueryBuilder('revision')
      .leftJoin('revision.company', 'company')
      .leftJoin('revision.creator', 'creator')
      .leftJoin('revision.revisionCompanies', 'revisionCompanies')
      .leftJoin('revisionCompanies.fileDescription', 'fileDescription')
      .leftJoin('revisionCompanies.year', 'year')
      .where('revision.id = :id', { id: revision.id })
      .select([
        'revision.id',
        'revision.createDate',
        'revision.additionPrice',
        'revision.status',
        'revision.review',
        'fileReview',
        'company',
        'creator',
        'revisionCompanies',
        'year',
        'fileDescription',
      ])
      .getOne();

    return adminRevison;
  }

  async getRevisionList(): Promise<GetRevisionListInfoDto> {
    const list: RevisionEntity[] =
      await this.revisionRepository.getRevisionList();
    return { list };
  }

  async createRevisionReviewPayment(
    revision: RevisionEntity,
    company: CompanyEntity,
  ): Promise<void> {
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
    await revision.save();
  }
}
