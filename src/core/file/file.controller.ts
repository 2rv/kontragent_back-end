import {
  Controller,
  Post,
  UseGuards,
  Get,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetAccount } from '../user/decorator/get-account.decorator';
import { UserEntity } from '../user/user.entity';
import { FileGuard } from './guard/file.guard';
import { GetFile } from './decorator/get-file.decorator';
import { FileOwnerGuard } from './guard/file-owner.guard';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/')
  @Roles(USER_ROLE.USER, USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard)
  @UseInterceptors(FileInterceptor('file'))
  async save(
    @UploadedFile() file,
    @GetAccount() user: UserEntity,
  ): Promise<any> {
    return await this.fileService.create(file, user);
  }

  // @Put('/:fileId')
  // @Roles(USER_ROLE.USER)
  // @UseGuards(AuthGuard('jwt'), AccountGuard, FileGuard, FileOwnerGuard)
  // @UseInterceptors(FileInterceptor('file'))
  // async update(@UploadedFile() fileNew, @GetFile() file) {
  //   return await this.fileService.update(fileNew, file);
  // }

  @Get('/:fileId')
  @Roles(USER_ROLE.USER, USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard, FileGuard, FileOwnerGuard)
  async getOne(@GetFile() file) {
    return await this.fileService.getFileData(file);
  }

  @Delete('/:fileId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard, FileGuard)
  async delete(@GetFile() file) {
    return await this.fileService.delete(file);
  }
}
