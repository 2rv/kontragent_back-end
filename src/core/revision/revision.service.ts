import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyBalanceService } from '../company-balance/company-balance.service';
import { CompanyEntity } from '../company/company.entity';
import { FileRepository } from '../file/file.repository';
import { CreateRevisionDto } from './dto/create-revision.dto';
import {
  GetCompanyRevisionListDto,
  GetCompanyRevisionListItemDto,
} from './dto/get-company-revision-list.dto';
import { GetRevisionInfoDto } from './dto/get-revision-info.dto';
import { GetRevisionListInfoDto } from './dto/get-revision-list-info.dto';
import { UpdateRevisionDto } from './dto/update-revision-info.dto';
import { REVISION_ERROR } from './enum/revision-error.enum';
import { REVISION_STATUS } from './enum/revision-status.enum';
import { RevisionEntity } from './revision.entity';
import { RevisionRepository } from './revision.repository';

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
    createRevisionDtoList: CreateRevisionDto[],
    company: CompanyEntity,
  ): Promise<void> {
    //CALCULATE PRICE
    const price = 1;
    // await this.companyBalanceService.createCompanyBalancePayment(company, 1000);

    createRevisionDtoList.forEach(async (createRevisionDto) => {
      const revision = await this.revisionRepository.createRevision(
        createRevisionDto,
        company,
      );

      const ids: number[] = createRevisionDto.fileIdList;

      if (ids && ids.length > 0) {
        for (const i in ids) {
          await this.fileRepository.assignFileToRevisionDescriptionById(
            revision,
            ids[i],
          );
        }
      }
    });
  }

  async updateRevisionReview(
    updateRevisionDto: UpdateRevisionDto,
    revision: RevisionEntity,
  ): Promise<GetRevisionInfoDto> {
    const updatedRevision = await this.revisionRepository.updateRevisionReview(
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

    return {
      id: updatedRevision.id,
      title: updatedRevision.title,
      description: updatedRevision.description,
      status: updatedRevision.status,
    };
  }

  async getCompanyRevisionList(
    company: CompanyEntity,
  ): Promise<GetCompanyRevisionListDto> {
    const list: GetCompanyRevisionListItemDto[] =
      await this.revisionRepository.getRevisionListByCompany(company);

    return { list };
  }

  async getRevisionReview(
    revision: RevisionEntity,
  ): Promise<GetRevisionInfoDto> {
    const getRevisionInfoDto: GetRevisionInfoDto = {
      id: revision.id,
      title: revision.title,
      description: revision.description,
      status: revision.status,
      price: revision.price || null,
    };

    const fileDescriptionList =
      await this.fileRepository.getRevisionDescriptionFileList(revision);

    getRevisionInfoDto.fileDescription = fileDescriptionList;

    if (revision.status === REVISION_STATUS.DONE) {
      getRevisionInfoDto.review = revision.review;

      const fileReviewList =
        await this.fileRepository.getRevisionReviewFileList(revision);
      getRevisionInfoDto.fileReview = fileReviewList;
    }

    return getRevisionInfoDto;
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

  async getRevisionList(): Promise<GetRevisionListInfoDto> {
    const list: RevisionEntity[] =
      await this.revisionRepository.getRevisionList();
    return { list };
  }
}
