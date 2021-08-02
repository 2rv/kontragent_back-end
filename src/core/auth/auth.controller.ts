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
import { CaptchaGuard } from '../captcha/guard/captcha.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @UseGuards(CaptchaGuard)
  async signUp(
    @Body(ValidationPipe) userSignUpDto: UserSignUpDto,
  ): Promise<LoginInfoDto> {
    return this.authService.signUp(userSignUpDto);
  }

  @Post('/login')
  @UseGuards(CaptchaGuard)
  logIn(
    @Body(ValidationPipe) userLoginDto: UserLoginDto,
  ): Promise<LoginInfoDto> {
    return this.authService.login(userLoginDto);
  }

  @Get('/token')
  @UseGuards(AuthGuard())
  checkToken(): void {}
}
