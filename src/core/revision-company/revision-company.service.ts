import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RevisionEntity } from '../revision/revision.entity';
import { FileRepository } from '../file/file.repository';
import { RevisionCompanyRepository } from './revision-company.repository';
import { CreateRevisionCompanyDto } from './dto/create-revision-company.dto';

@Injectable()
export class RevisionCompanyService {
  constructor(
    @InjectRepository(RevisionCompanyRepository)
    private revisionCompanyRepository: RevisionCompanyRepository,
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
}
