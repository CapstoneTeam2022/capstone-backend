import { Body, Controller, Post, Res } from '@nestjs/common';
import { ReportDto } from './dto';
import { SystemAdminService } from './system-admin.service';
import { Response } from 'express';

@Controller('system-admin')
export class SystemAdminController {
  constructor(private readonly systemAdminService: SystemAdminService) {}
  @Post()
  getReport(@Body() report: ReportDto) {
    return this.systemAdminService.getReport(report);
  }

  @Post('/report')
  async getPDF(@Res() res: Response, @Body() report: ReportDto): Promise<void> {
    const buffer = await this.systemAdminService.generatePDF(report);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename=example.pdf',
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }
}
