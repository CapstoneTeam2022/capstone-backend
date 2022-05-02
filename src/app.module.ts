import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from '../ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LabResultModule } from './labResult/labResult.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    LabResultModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
