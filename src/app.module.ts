import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './core/auth/auth.module';
import { UserSettingsModule } from './core/user-settings/user-settings.module';
import { UserVerificationModule } from './core/user-verification/user-verification.module';

@Module({
  providers: [],
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UserSettingsModule,
    UserVerificationModule,
  ],
})
export class AppModule {}
