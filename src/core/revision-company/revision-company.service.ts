import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RevisionEntity } from '../revision/revision.entity';
import { FileRepository } from '../file/file.repository';
import { RevisionCompanyRepository } from './revision-company.repository';
import { CreateRevisionCompanyDto } from './dto/create-revision-company.dto';
import { CreateRevisionOwnCompanyDto } from '../revision-company/dto/create-revision-own-company.dto';
import { RevisionCompanyYearRepository } from '../revision-company-year/revision-company-year.repository';
import { CreateRevisionYearDto } from '../revision-company-year/dto/create-revision-company-year.dto';
import { CompanyEntity } from '../company/company.entity';

@Injectable()
export class RevisionCompanyService {
  constructor(
    @InjectRepository(RevisionCompanyRepository)
    private revisionCompanyRepository: RevisionCompanyRepository,
    @InjectRepository(RevisionCompanyYearRepository)
    private revisionCompanyYearRepository: RevisionCompanyYearRepository,
    @InjectRepository(FileRepository)
    private fileRepository: FileRepository,
  ) {}

  async createRevisionCompanies(
    createRevisionCompanyDto: CreateRevisionCompanyDto[],
    revision: RevisionEntity,
  ): Promise<void> {
    createRevisionCompanyDto.forEach(async (createRevisionCompanyDto) => {
      const revisionCompany =
        await this.revisionCompanyRepository.createRevisionCompany(
          createRevisionCompanyDto,
          revision,
        );

      const years: CreateRevisionYearDto[] = createRevisionCompanyDto.year;
      years.forEach((year) => {
        this.revisionCompanyYearRepository.createRevisionCompanyYears(
          year,
          revisionCompany,
        );
      });

      const ids: number[] = createRevisionCompanyDto.fileIdList;

      if (ids && ids.length > 0) {
        for (const i in ids) {
          await this.fileRepository.assignFileToRevisionCompanyDescriptionById(
            revisionCompany,
            ids[i],
          );
        }
      }
    });
  }

  async createSelfRevisionCompany(
    createRevisionOwnCompanyDto: CreateRevisionOwnCompanyDto,
    revision: RevisionEntity,
    company: CompanyEntity,
    ): Promise<void> {
    const revisionCompany =
      await this.revisionCompanyRepository.createSelfRevisionCompany(
        createRevisionOwnCompanyDto,
        revision,
        company
      );

    const years: CreateRevisionYearDto[] = createRevisionOwnCompanyDto.year;
    years.forEach((year) => {
      this.revisionCompanyYearRepository.createRevisionCompanyYears(
        year,
        revisionCompany,
      );
    });

    const ids: number[] = createRevisionOwnCompanyDto.fileIdList;

    if (ids && ids.length > 0) {
      for (const i in ids) {
        await this.fileRepository.assignFileToRevisionCompanyDescriptionById(
          revisionCompany,
          ids[i],
        );
      }
    }
  }
}
