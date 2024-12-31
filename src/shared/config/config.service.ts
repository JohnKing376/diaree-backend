import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Environment } from './env.validation';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get nodeEnv(): Environment {
    return this.configService.get<Environment>('NODE_ENV');
  }

  get port(): number {
    return this.configService.get<number>('PORT');
  }

  get dbPort(): number {
    return this.configService.get<number>('DB_PORT');
  }

  get dbName(): string {
    return this.configService.get<string>('DB_NAME');
  }

  get dbPassword(): string {
    return this.configService.get<string>('DB_PASSWORD');
  }

  get dbHost(): string {
    return this.configService.get<string>('DB_HOST');
  }

  get dbUser(): string {
    return this.configService.get<string>('DB_USERNAME');
  }

  get jwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET_TOKEN');
  }
}
