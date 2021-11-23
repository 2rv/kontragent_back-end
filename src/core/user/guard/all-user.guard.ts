import {
    Injectable,
    CanActivate,
    ExecutionContext,
    NotFoundException,
    BadRequestException,
  } from '@nestjs/common';
  import { UserEntity } from '../user.entity';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  
  @Injectable()
  export class AllUserGuard implements CanActivate {
    constructor(
      @InjectRepository(UserEntity)
      private userRepository: Repository<UserEntity>,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const { params } = request;
  
      if (isNaN(params.userId)) {
        throw new BadRequestException();
      }
  
      const user = await this.userRepository.findOne({
        where: { id: params.userId },
      });
  
      if (!user) {
        throw new NotFoundException();
      }
  
      request.user = user;
  
      return true;
    }
  }
  