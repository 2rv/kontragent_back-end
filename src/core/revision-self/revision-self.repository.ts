import { Repository, EntityRepository } from 'typeorm';
import { RevisionSelfEntity } from './revision-self.entity';

@EntityRepository(RevisionSelfEntity)
export class RevisionSelfRepository extends Repository<RevisionSelfEntity> {}
// async createRevision(company: CompanyEntity): Promise<RevisionEntity> {
//   const revision: RevisionEntity = new RevisionEntity();

//   revision.company = company;
//   revision.status = REVISION_STATUS.NEW;

//   try {
//     await revision.save();
//     return revision;
//   } catch (error) {
//     throw new InternalServerErrorException();
//   }
// }
