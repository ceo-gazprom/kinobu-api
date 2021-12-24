import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from './snake-naming.strategy';
/**
 *
 */
export const DatabseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  namingStrategy: new SnakeNamingStrategy(),

  /** We are using migrations, synchronize should be set to false. */
  synchronize: false,

  /**
   * Run migrations automatically
   * you can disable this if you prefer running migration manually.
   */
  migrationsRun: true,
  logging: true,
  logger: 'advanced-console',

  /**
   * Allow both start:prod and start:dev to use migrations
   * __dirname is either dist or src folder, meaning either
   * the compiled js in prod or the ts in dev.
   */
  migrations: [__dirname + '/database/migrations/**/*{.ts,.js}'],
  cli: {
    // Location of migration should be inside src folder
    // to be compiled into dist/ folder.
    migrationsDir: 'src/database/migrations',
  },
};
