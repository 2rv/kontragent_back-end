import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interface/jwt-payload.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserEntity } from '../user/user.entity';
import { AUTH_ERROR } from './enum/auth-error.enum';
import { LoginInfoDto } from './dto/login-info.dto';
import { UserRepository } from '../user/user.repository';
import { Injectable, BadRequestException } from '@nestjs/common';
import { UserSignUpDto } from './dto/user-sign-up.dto';
import { CompanyEntity } from '../company/company.entity';
import { CompanyRepository } from '../company/company.repository';
import { ReferalRepository } from '../referal/referal.repository';
import { CreateCompanyInfoDto } from '../company/dto/create-company-info.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(ReferalRepository)
    private referalRepository: ReferalRepository,
    @InjectRepository(CompanyRepository)
    private companyRepository: CompanyRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(userSignUpDto: UserSignUpDto): Promise<LoginInfoDto> {
    const user: UserEntity = await this.userRepository.createUser(
      userSignUpDto,
    );

    await this.referalRepository.createReferal(user);

    const accessToken = await this.createJwt(user);

    return { accessToken };
  }

  async login(userLoginDto: UserLoginDto): Promise<LoginInfoDto> {
    const { login, password } = userLoginDto;

    const user = await this.userRepository.findOne({
      where: [{ login }, { email: login }, { phone: login }],
    });

    if (user === undefined) {
      throw new BadRequestException(AUTH_ERROR.COULDNT_FOUND_USER);
    } else {
      const passwordCorrect = await user.validatePassword(password);

      if (passwordCorrect === false) {
        throw new BadRequestException(AUTH_ERROR.UNCORRECT_PASSWORD_OR_LOGIN);
      } else {
      }
    }

    const accessToken = await this.createJwt(user);

    const loginInfo: LoginInfoDto = { accessToken };
    return loginInfo;
  }

  async createJwt(user: UserEntity): Promise<string> {
    const {
      id,
      role,
      email,
      phone,
      confirmEmail,
      confirmPhone,
      firstname,
      lastname,
    } = user;

    const userCompanies =  await this.companyRepository.createQueryBuilder('company')
    .leftJoin('company.companyMember', 'companyMember')
    .leftJoin('companyMember.user', 'user')
    .where('user.id = :id', { id: user.id })

    .select(['company.id'])
    .getMany();

  const companyIdArray = userCompanies.map((company) => {
      return company.id
    })

    const payload: JwtPayload = { 
      id,
      role,
      email,
      phone,
      confirmEmail,
      confirmPhone,
      firstname,
      lastname,
      companyIdArray,
    };

    return this.jwtService.sign(payload);
  }

  async updateLogin(user: UserEntity): Promise<LoginInfoDto> {
    const accessToken = await this.createJwt(user);

    return { accessToken };
  }
}
