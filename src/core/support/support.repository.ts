import { Repository, EntityRepository } from 'typeorm';
import { CreateSupportRequestDto } from './dto/create-support-request.dto';
import { SupportEntity } from './support.entity';
import { UserEntity } from '../user/user.entity';

@EntityRepository(SupportEntity)
export class SupportRepository extends Repository<SupportEntity> {
  async createSupportRequest(
    createSupportRequestDto: CreateSupportRequestDto,
    user: UserEntity,
  ): Promise<any> {
    try {
      const { categoryId, brief, explicitly } = createSupportRequestDto;
      const supportRequest: SupportEntity = new SupportEntity();
      supportRequest.categoryId = categoryId;
      supportRequest.brief = brief;
      supportRequest.explicitly = explicitly;
      supportRequest.creator = user;
      await supportRequest.save();
      return supportRequest;
    } catch (error) {
      console.log('ооошибка');
    }
  }

  async addCreatorInRequestInSupport(
    requestInSupport: SupportEntity,
    userId: number,
  ): Promise<any> {
    try {
      const query = UserEntity.createQueryBuilder('user');
      query.leftJoinAndSelect('user.myRequestsInSupport', 'creator');
      query.where('user.id = :id', { id: userId });
      const user = await query.getOne();
      console.log(user, requestInSupport);
    } catch (error) {
      console.log('ооошибка');
    }
  }
}
