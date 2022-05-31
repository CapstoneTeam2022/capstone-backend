import { Module } from '@nestjs/common';
import { ResearcherService } from './researcher.service';
import { UserModule } from '../user/user.module';
import { ResearcherController } from './researcher.controller';

@Module({
  providers: [ResearcherService],
  imports: [UserModule],
  controllers: [ResearcherController],
  exports: [ResearcherService],
})
export class ResearcherModule {}
