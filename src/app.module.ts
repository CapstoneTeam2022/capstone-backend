import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from '../ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { symptomModule } from './symptom/symptom.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    symptomModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
