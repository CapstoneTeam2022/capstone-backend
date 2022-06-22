import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
import * as PDFDocument from 'pdfkit';

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

  async getReport({ start, end }: ReportDto) {
    const items = [
      'DIAGNOSIS',
      'HOSPITAL',
      'RESEARCHER',
      'PATIENT',
      'INVESTIGATION_REQUEST',
      'MOH_EMPLOYEE',
      'LAB_RESULT',
      'RADIOLOGY',
    ];
    for (const item of items) {
      if (item === ReportInfo.HOSPITAL) {
        items[ReportInfo.HOSPITAL] =
          await this.healthCenterService.getAllInDateRange(start, end);
      } else if (item === ReportInfo.RESEARCHER) {
        items[ReportInfo.RESEARCHER] =
          await this.researcherService.getAllInDateRange(start, end);
      } else if (item === ReportInfo.PATIENT) {
        items[ReportInfo.PATIENT] = (
          await this.patientService.getAllInDateRange(start, end)
        ).length;
      } else if (item === ReportInfo.INVESTIGATION_REQUEST) {
        items[ReportInfo.INVESTIGATION_REQUEST] = (
          await this.investigationRequestService.getAllInDateRange(start, end)
        ).length;
      } else if (item === ReportInfo.MOH_EMPLOYEE) {
        items[ReportInfo.MOH_EMPLOYEE] =
          await this.mohEmployeeService.getAllInDateRange(start, end);
      } else if (item === ReportInfo.LAB_RESULT) {
        items[ReportInfo.LAB_RESULT] = (
          await this.labResultService.getAllInDateRange(start, end)
        ).length;
      } else if (item === ReportInfo.RADIOLOGY) {
        items[ReportInfo.RADIOLOGY] = (
          await this.radiologyService.getAllInDateRange(start, end)
        ).length;
      } else if (item === ReportInfo.DIAGNOSIS) {
        items[ReportInfo.DIAGNOSIS] = (
          await this.diagnosisService.getAllInDateRange(start, end)
        ).length;
      }
    }
    return items;
  }

  async generatePDF(days: number): Promise<Buffer> {
    const pdfBuffer: Buffer = await new Promise(async (resolve) => {
      const doc = new PDFDocument({
        size: 'LETTER',
        bufferPages: true,
      });
      const end = new Date();
      let start = new Date();
      if (days !== 365 && days !== 0) {
        start = new Date(end.getDate() - days);
      } else if (days == 365) {
        start = new Date("2021-06-22T16:32:33.393Z");
      } else if (days == 0) {
        start = new Date("2000-06-22T16:32:33.393Z");
      }
      const items = await this.getReport({ start, end });
      const hospitalInfo = items[ReportInfo.HOSPITAL];
      const researchers = items[ReportInfo.RESEARCHER];
      const mohEmployees = items[ReportInfo.MOH_EMPLOYEE];
      const patients = items[ReportInfo.PATIENT];
      const diagnoses = items[ReportInfo.DIAGNOSIS];
      const labResults = items[ReportInfo.LAB_RESULT];
      const radiologyTests = items[ReportInfo.RADIOLOGY];

      doc.fontSize(25).text('Report', 100, 80);
      doc.fontSize(10).moveDown().text(`Date from ${start} to ${end}`, 100, 80);
      doc.fontSize(20).moveDown().text('Health Centers');

      if (hospitalInfo) {
        doc
          .fontSize(12)
          .moveDown()
          .text(
            `There are ${hospitalInfo.length} health centers registered within the selected period. The registered hospitals are: `,
          );
        doc.fontSize(12).moveDown().list(hospitalInfo);
      }

      if (patients) {
        doc.fontSize(20).moveDown().text('Patients');
        doc.fontSize(12).moveDown().text(`There are ${patients} patients registered within the selected period.`);
      }

      if (labResults) {
        doc.fontSize(20).moveDown().text('Lab Results');
        doc.fontSize(12).moveDown().text(`There are ${labResults} laboratory results registered within the selected period.`);
      }

      if (radiologyTests) {
        doc.fontSize(20).moveDown().text('Radiology');
        doc.fontSize(12).moveDown().text(`There are ${radiologyTests} radiology test results registered within the selected period.`);
      }

      if (diagnoses) {
        doc.fontSize(20).moveDown().text('Diagnosis');
        doc.fontSize(12).moveDown().text(`There are ${diagnoses} health centers registered within the selected period.`);
      }

      if (researchers) {
        doc.fontSize(20).moveDown().text('Researchers');
        doc
          .fontSize(12)
          .moveDown()
          .text(
            `There are ${researchers.length} researchers registered within the selected period. The registered researchers are: `,
          );
        doc.fontSize(12).moveDown().list(researchers);
      }

      if (mohEmployees) {
        doc.fontSize(20).moveDown().text('Ministry of health Personnel');
        doc
          .fontSize(12)
          .moveDown()
          .text(
            `There are ${mohEmployees.length} MoH personnel's registered within the selected period. The registered people are: `,
          );
        doc.fontSize(12).moveDown().list(mohEmployees);
      }

      // // and some justified text wrapped into columns
      // doc
      //   .font('Times-Roman', 13)
      //   .moveDown()
      //   .text("sdf", {
      //     width: 412,
      //     align: 'justify',
      //     indent: 30,
      //     height: 300,
      //     ellipsis: true
      //   });

      doc.end();

      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });
    });

    return pdfBuffer;
  }
}
