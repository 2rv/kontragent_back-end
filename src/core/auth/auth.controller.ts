import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
} from '@nestjs/common';
import { UserSignUpDto } from './dto/user-sign-up.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginInfoDto } from './dto/login-info.dto';
import { AccountGuard } from '../user/guard/account.guard';
import { GetAccount } from '../user/decorator/get-account.decorator';
import { UserEntity } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) userSignUpDto: UserSignUpDto,
  ): Promise<LoginInfoDto> {
    return this.authService.signUp(userSignUpDto);
  }

  @Post('/login')
  logIn(
    @Body(ValidationPipe) userLoginDto: UserLoginDto,
  ): Promise<LoginInfoDto> {
    return this.authService.login(userLoginDto);
  }

  @Get('/token')
  @UseGuards(AuthGuard(), AccountGuard)
  checkToken(@GetAccount() user: UserEntity): Promise<LoginInfoDto> {
    return this.authService.updateLogin(user);
  }
}
