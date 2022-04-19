import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { HealthCenterModule } from './health-center/health-center.module';

@Module({
  imports: [PrismaModule, HealthCenterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
