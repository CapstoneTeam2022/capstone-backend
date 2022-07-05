import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePrescriptionDto } from './dto';
import { UpdatePrescriptionDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Prescription } from './entities/prescription.entity';
import { Repository } from 'typeorm';
import { DiagnosisService } from '../diagnosis/diagnosis.service';
import * as PDFDocument from 'pdfkit';

import { Medication } from './entities/mdication.entity';
import { PatientService } from '../patient/patient.service';

@Injectable()
export class PrescriptionService {
  constructor(
    @InjectRepository(Prescription)
    private readonly prescriptionRepository: Repository<Prescription>,
    private diagnosisService: DiagnosisService,
    private patientService: PatientService,
  ) {}

  async create({ diagnosisId, medications, ...data }: CreatePrescriptionDto) {
    const diagnosis = await this.diagnosisService.findOne(diagnosisId);
    const meds: Medication[] = [];
    medications.forEach((item) => {
      const med = new Medication();
      med.name = item.name;
      med.dosage = item.dosage;
      med.instructions = item.instructions;
      meds.push(med);
    });
    const prescription = this.prescriptionRepository.create({
      diagnosis,
      ...data,
    });
    prescription.medications = meds;
    return this.prescriptionRepository.save(prescription);
  }

  findAll() {
    return this.prescriptionRepository.find({
      relations: ['diagnosis', 'medications'],
    });
  }

  async findOne(id: number) {
    const prescription = await this.prescriptionRepository.findOne({
      where: {
        id,
      },
      relations: ['medications'],
    });
    if (prescription) return prescription;
    throw new NotFoundException(`Prescription with id ${id} not found`);
  }

  async findAllForDiagnosis(diagnosisId: number) {
    await this.diagnosisService.findOne(diagnosisId); //check if the diagnosis exists
    return this.prescriptionRepository.find({
      where: {
        diagnosis: {
          id: diagnosisId,
        },
      },
      order: {
        createdAt: 'DESC',
      },
      relations: ['diagnosis', 'medications'],
    });
  }

  update(id: number, updatePrescriptionDto: UpdatePrescriptionDto) {
    return `This action updates a #${id} prescription`;
  }

  remove(id: number) {
    return `This action removes a #${id} prescription`;
  }

  async generatePDF(id: number): Promise<Buffer> {
    const resData = await this.prescriptionRepository.findOne({
      relations: ['medications'],
      where: { id },
    });

    if (!resData) {
      throw new NotFoundException(`Prescription with id ${id} not found`);
    }

    const pdfBuffer: Buffer = await new Promise(async (resolve) => {
      const doc = new PDFDocument({
        size: 'LETTER',
        bufferPages: true,
      });

      let info = '';
      let filledBy = '';
      let filledAt = '';
      let filledPlace = '';

      try {
        const finalData = resData['medications'].map(
          (data) =>
            `\n Name: ${data.name} \n Dosage: ${data.dosage} \n Instructions: ${data.instructions}`,
        );
        //  filledBy = resData['diagnosis']['filledBy']['id'].toString();
        filledAt = new Date(resData['createdAt']).toDateString();
        //filledPlace = resData['diagnosis']['filledBy']['healthCenter']['name'];

        finalData.forEach((line) => {
          info = info + line;
        });
      } catch (err) {
        console.log(err);
        throw new InternalServerErrorException('internal server error');
      }

      //  customize your PDF document
      // doc.fontSize(16).text(filledPlace);

      doc.fontSize(12).text(info, 100, 50);
      //  doc.fontSize(11).text(`Prescribed By ${filledBy}`);
      doc.fontSize(11).text(`Prescribed At ${filledAt}`);
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

  async getPrescriptionsForPatient(refId: string) {
    const patient = await this.patientService.getPatientByRef(refId);
    return (
      this.prescriptionRepository
        .createQueryBuilder('pr')
        .leftJoinAndSelect('pr.medications', 'm')
        .leftJoinAndSelect('pr.diagnosis', 'diag')
        .leftJoinAndSelect('diag.investigationRequest', 'inv')
        .leftJoinAndSelect('inv.vitals', 'v')
        .leftJoinAndSelect('v.patient', 'p')
        .where('p.refId=:id', { id: refId })
        //.select(['pr', 'm', 'diag', 'inv', 'v'])
        .getMany()
    );
  }
}
