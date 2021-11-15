import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyBalanceService } from '../company-balance/company-balance.service';
import { CompanyEntity } from '../company/company.entity';
import { FileRepository } from '../file/file.repository';
import { CreateRevisionCompanyDto } from '../revision-company/dto/create-revision-company.dto';
import {
  GetCompanyRevisionListDto,
  GetCompanyRevisionListItemDto,
} from './dto/get-company-revision-list.dto';
import { GetRevisionListInfoDto } from './dto/get-revision-list-info.dto';
import { UpdateRevisionDto } from './dto/update-revision-info.dto';
import { REVISION_ERROR } from './enum/revision-error.enum';
import { REVISION_STATUS } from './enum/revision-status.enum';
import { RevisionEntity } from './revision.entity';
import { RevisionRepository } from './revision.repository';
import { RevisionCompanyService } from '../revision-company/revision-company.service';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class RevisionService {
  constructor(
    @InjectRepository(RevisionRepository)
    private revisionRepository: RevisionRepository,
    @InjectRepository(FileRepository)
    private fileRepository: FileRepository,
    private companyBalanceService: CompanyBalanceService,
    private revisionCompanyService: RevisionCompanyService,
  ) {}

  async createRevision(
    createRevisionCompaniesDto: CreateRevisionCompanyDto[],
    company: CompanyEntity,
    creator: UserEntity,
  ): Promise<void> {
    let price = 0;
    const onePeriodRevisionPrice = 500;
    const addPrice = (add: number) => (price += add);
    createRevisionCompaniesDto.forEach((revisionCompany) => {
      revisionCompany.firstPeriod && addPrice(onePeriodRevisionPrice);
      revisionCompany.secondPeriod && addPrice(onePeriodRevisionPrice);
      revisionCompany.thirdPeriod && addPrice(onePeriodRevisionPrice);
      revisionCompany.fourthPeriod && addPrice(onePeriodRevisionPrice);
    });
    await this.companyBalanceService.createCompanyBalancePayment(
      company,
      price,
    );

    const revision: RevisionEntity = new RevisionEntity();
    revision.company = company;
    revision.creator = creator;
    revision.status = REVISION_STATUS.NEW;
    revision.save();

    this.revisionCompanyService.createRevisionCompanies(
      createRevisionCompaniesDto,
      revision,
    );
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
      .leftJoin('revision.fileReview', 'fileReview')
      .leftJoin('revision.revisionCompanies', 'revisionCompanies')
      .leftJoin('revisionCompanies.fileDescription', 'fileDescription')
      .where('revision.id = :id', { id: revision.id })
      .select([
        'revision.id',
        'revision.status',
        'revision.review',
        'revision.additionPrice',
        'fileReview',
        'revisionCompanies',
        'fileDescription',
      ])
      .getOne();

    return fullRevison;
  }

  async getAdminRevisionReview(
    revision: RevisionEntity,
  ): Promise<RevisionEntity> {
    const fullRevison = await this.revisionRepository
      .createQueryBuilder('revision')
      .leftJoin('revision.fileReview', 'fileReview')
      .leftJoin('revision.company', 'company')
      .leftJoin('revision.creator', 'creator')
      .leftJoin('revision.revisionCompanies', 'revisionCompanies')
      .leftJoin('revisionCompanies.fileDescription', 'fileDescription')
      .where('revision.id = :id', { id: revision.id })
      .select([
        'revision.id',
        'revision.status',
        'revision.review',
        'revision.additionPrice',
        'fileReview',
        'company',
        'creator',
        'revisionCompanies',
        'fileDescription',
      ])
      .getOne();

    return fullRevison;
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
      revision.additionPrice,
    );

    revision.status = REVISION_STATUS.PAID;
    await revision.save();
  }

  async getRevisionList(): Promise<GetRevisionListInfoDto> {
    const list: RevisionEntity[] =
      await this.revisionRepository.getRevisionList();
    return { list };
  }
}
