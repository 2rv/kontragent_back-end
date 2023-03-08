import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
  UsePipes,
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

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('/signup')
  async signUp(@Body() userSignUpDto: UserSignUpDto): Promise<LoginInfoDto> {
    return this.authService.signUp(userSignUpDto);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('/login')
  logIn(@Body() userLoginDto: UserLoginDto): Promise<LoginInfoDto> {
    return this.authService.login(userLoginDto);
  }

  @Get('/token')
  @UseGuards(AuthGuard(), AccountGuard)
  checkToken(@GetAccount() user: UserEntity): Promise<LoginInfoDto> {
    return this.authService.updateLogin(user);
  }
}
