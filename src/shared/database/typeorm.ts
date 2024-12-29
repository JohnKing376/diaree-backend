import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import User from '../entities/user.entity';

dotenv.config();

const environmentConfig = {
  nodeEnv: process.env.NODE_ENV,
  dbPort: Number(process.env.DB_PORT),
  dbUser: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  dbHost: process.env.DB_HOST,
};

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: environmentConfig.dbHost,
  port: environmentConfig.dbPort,
  username: environmentConfig.dbUser,
  password: environmentConfig.dbPassword,
  database: environmentConfig.dbName,
  synchronize: environmentConfig.nodeEnv !== 'production',
  logging: environmentConfig.nodeEnv !== 'production',
  migrations: ['dist/shared/database/migration/*{.ts, .js}'],
  migrationsRun: true,
  entities: [User],
} as DataSourceOptions);
