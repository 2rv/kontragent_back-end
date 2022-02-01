import { Repository, EntityRepository } from 'typeorm';
import { RevisionSelfEntity } from './revision-self.entity';

@EntityRepository(RevisionSelfEntity)
export class RevisionSelfRepository extends Repository<RevisionSelfEntity> {}
