import { Module } from '@nestjs/common';
import { UserService } from './service/user/user.service';
import { CreateUserController } from './onboarding/controllers/create-user/create-user.controller';

@Module({
  providers: [UserService],
  controllers: [CreateUserController],
})
export class UserManagementModule {}
