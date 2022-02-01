import { Repository, EntityRepository } from 'typeorm';
import { RevisionKontragentEntity } from './revision-kontragent.entity';

@EntityRepository(RevisionKontragentEntity)
export class RevisionKontragentRepository extends Repository<RevisionKontragentEntity> {}
