import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

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
  logging: environmentConfig.nodeEnv !== 'production',
  migrations: ['dist/migrations/*{.ts, .js}'],
  entities: [
    'dist/**/*.entity{.ts,.js}',
    'dist/**/entities/**/*.entity{.ts,.js}',
  ],
  synchronize: environmentConfig.nodeEnv !== 'production',
} as DataSourceOptions);
