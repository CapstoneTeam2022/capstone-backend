import { Injectable } from '@nestjs/common';
import { ReportDto, ReportInfo } from './dto';
import { DiagnosisService } from '../diagnosis/diagnosis.service';
import { HealthCenterService } from '../health-center/health-center.service';
import { ResearcherService } from '../researcher/researcher.service';
import { PatientService } from '../patient/patient.service';
import { InvestigationRequestService } from '../investigation-request/investigation-request.service';
import { MohEmployeeService } from '../moh-employee/moh-employee.service';
import { LabResultService } from '../lab-result/lab-result.service';
import { RadiologyService } from '../radiology/radiology.service';
import { UserService } from '../user/user.service';

@Injectable()
export class SystemAdminService {
  constructor(
    private readonly diagnosisService: DiagnosisService,
    private readonly healthCenterService: HealthCenterService,
    private readonly researcherService: ResearcherService,
    private readonly patientService: PatientService,
    private readonly investigationRequestService: InvestigationRequestService,
    private readonly mohEmployeeService: MohEmployeeService,
    private readonly labResultService: LabResultService,
    private readonly radiologyService: RadiologyService,
    private readonly userService: UserService,
  ) {}

  async getReport({ start, end, information }: ReportDto) {
    const items = {};
    for (const item of information) {
      if (item === ReportInfo.HOSPITAL) {
        items[ReportInfo.HOSPITAL] =
          await this.healthCenterService.getAllInDateRange(start, end); //TODO include employee count;
      } else if (item === ReportInfo.RESEARCHER) {
        items[ReportInfo.RESEARCHER] =
          await this.researcherService.getAllInDateRange(start, end);
      } else if (item === ReportInfo.PATIENT) {
        items[ReportInfo.PATIENT] = await this.patientService.getAllInDateRange(
          start,
          end,
        );
      } else if (item === ReportInfo.INVESTIGATION_REQUEST) {
        items[ReportInfo.INVESTIGATION_REQUEST] =
          await this.investigationRequestService.getAllInDateRange(start, end);
      } else if (item === ReportInfo.MOH_EMPLOYEE) {
        items[ReportInfo.MOH_EMPLOYEE] =
          await this.mohEmployeeService.getAllInDateRange(start, end);
      } else if (item === ReportInfo.LAB_RESULT) {
        items[ReportInfo.LAB_RESULT] =
          await this.labResultService.getAllInDateRange(start, end);
      } else if (item === ReportInfo.RADIOLOGY) {
        items[ReportInfo.RADIOLOGY] =
          await this.radiologyService.getAllInDateRange(start, end);
      } else if (item === ReportInfo.DIAGNOSIS) {
        items[ReportInfo.DIAGNOSIS] =
          await this.diagnosisService.getAllInDateRange(start, end);
      }
    }
    return items;
  }
}
