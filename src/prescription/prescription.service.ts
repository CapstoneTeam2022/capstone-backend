import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePrescriptionDto } from './dto';
import { UpdatePrescriptionDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Prescription } from './entities/prescription.entity';
import { Repository } from 'typeorm';
import { DiagnosisService } from '../diagnosis/diagnosis.service';
import * as PDFDocument from 'pdfkit';

import { Medication } from './entities/mdication.entity';

@Injectable()
export class PrescriptionService {
  constructor(
    @InjectRepository(Prescription)
    private readonly prescriptionRepository: Repository<Prescription>,
    private diagnosisService: DiagnosisService,
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
    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const doc = new PDFDocument({
        size: 'LETTER',
        bufferPages: true,
      });

      // customize your PDF document
      doc.text('hello world', 100, 50);

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
