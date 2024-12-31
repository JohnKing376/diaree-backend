import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  PORT: number;

  @IsString()
  DB_NAME: string;

  @IsString()
  DB_HOST: string;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  JWT_SECRET_TOKEN: string;
}

export function validateEnvironmentConfig(
  config: Record<string, unknown>,
): EnvironmentVariables {
  const validatedEnvironmentConfig = plainToInstance(
    EnvironmentVariables,
    config,
    {
      enableImplicitConversion: true,
    },
  );

  const validationErrors = validateSync(validatedEnvironmentConfig, {
    skipMissingProperties: false,
  });

  if (validationErrors.length > 0) {
    throw new Error(
      `Environment validation failed: ${validationErrors.toString()}`,
    );
  }

  return validatedEnvironmentConfig;
}
