import { Controller, Post, UseGuards, Body, Res } from '@nestjs/common';
import { PdfShareService } from './pdf-share.service';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { GetAccount } from '../user/decorator/get-account.decorator';
import { UserEntity } from '../user/user.entity';
import { CreatePdfDto } from './dto/create-pdf.dto';

@Controller('pdf-share')
export class PdfShareController {
  constructor(private readonly pdfshareService: PdfShareService) {}

  @Post('/')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard(), AccountGuard)
  create(
    @Body() body: CreatePdfDto,
    @Res() res,
    @GetAccount() user: UserEntity,
  ) {
    this.pdfshareService.create(user, body, res);
  }
}
