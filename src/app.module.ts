import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorModule } from './doctor/doctor.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // make the configuration globally available
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        autoLoadEntities: process.env.TYPEORM_AUTO_LOAD_ENTITIES === 'true',
        synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true', // be careful with this in production
        logging: process.env.TYPEORM_LOGGING === 'true',
      }),
      inject: [ConfigService],
    }),
    DoctorModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
