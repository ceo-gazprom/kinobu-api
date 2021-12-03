import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AccountModule,
  CommentModule,
  HealthCheckerModule,
  MovieModule,
  UserModule,
} from './modules';

const modules = [
  AccountModule,
  CommentModule,
  HealthCheckerModule,
  MovieModule,
  UserModule,
];

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: ['dist/**/*.entity{.ts,.js}'],

        // We are using migrations, synchronize should be set to false.
        synchronize: false,

        // Run migrations automatically,
        // you can disable this if you prefer running migration manually.
        migrationsRun: true,
        logging: true,
        logger: 'advanced-console',

        // Allow both start:prod and start:dev to use migrations
        // __dirname is either dist or src folder, meaning either
        // the compiled js in prod or the ts in dev.
        migrations: [__dirname + '/database/migrations/**/*{.ts,.js}'],
        cli: {
          // Location of migration should be inside src folder
          // to be compiled into dist/ folder.
          migrationsDir: 'src/database/migrations',
        },
      }),
    }),
    ...modules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
