import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column
} from 'typeorm';

@Entity({name: 'invite'})
export class InviteEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;
}
