import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorModule } from './doctor/doctor.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientModule } from './patient/patient.module';
import { AdminModule } from './admin/admin.module';
import { PrescriptionModule } from './prescription/prescription.module';
import { HistoryModule } from './history/history.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

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
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2 days' },
    }),
    DoctorModule,
    UserModule,
    PatientModule,
    AdminModule,
    PrescriptionModule,
    HistoryModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService, AuthService, JwtService],
})
export class AppModule {}
