import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { vitalsModule } from './vitals/vitals.module';

@Module({
  imports: [
    vitalsModule,
  RouterModule.register([
    {
      path: 'api/vitals',
      module: vitalsModule
    }
  ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
