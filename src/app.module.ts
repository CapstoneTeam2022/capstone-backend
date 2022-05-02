import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from '../ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrescriptionModule } from './prescriptons/prescription.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    PrescriptionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
