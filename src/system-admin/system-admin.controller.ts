import { Body, Controller, Post } from '@nestjs/common';
import { ReportDto } from './dto';
import { SystemAdminService } from './system-admin.service';

@Controller('system-admin')
export class SystemAdminController {
  constructor(private readonly systemAdminService: SystemAdminService) {}
  @Post()
  getReport(@Body() report: ReportDto) {
    return this.systemAdminService.getReport(report);
  }
}
