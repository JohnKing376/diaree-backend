import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validateEnvironmentConfig } from './shared/config/env.validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './shared/database/typeorm';
import { UserManagementModule } from './user-management/user-management.module';
import { UserService } from './user-management/service/user/user.service';
import { CreateUserController } from './user-management/onboarding/controllers/create-user/create-user.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnvironmentConfig,
    }),
    TypeOrmModule.forRoot(AppDataSource.options),
    UserManagementModule,
  ],
  controllers: [AppController, CreateUserController],
  providers: [AppService, UserService],
})
export class AppModule {}
