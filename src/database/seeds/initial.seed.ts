import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from '../../user/user.entity';
import { Address } from '../../address/address.entity';
import { HealthCenter } from '../../health-center/healthcenter.entity';
import { Role } from '../../role/role.entity';
import { Disease } from '../../disease/entities/disease.entity';
import {LabTest} from '../../lab-test/labTest.entity';
import { Radiology } from '../../radiology/radiology.entity';
import { InvestigationRequest } from '../../investigation-request/investigationRequest.entity';
import { Diagnosis } from '../../diagnosis/entities/diagnosis.entity';
import { Prescription } from '../../prescription/entities/prescription.entity';
import { Medication } from '../../prescription/entities/mdication.entity';
import { Vitals } from '../../vitals/vitals.entity';
import { Examination } from '../../examination/entities/examination.entity';
import { Patient } from '../../patient/patient.entity';
import { LabResult } from '../../lab-result/labResult.entity';
export default class CreateUsers implements Seeder{
    public async run(factory: Factory, connection: Connection): Promise<any> {
  
       const max = 10
       const min = 0
       const arr=[];
        for (var i = 0; i < max; i++) {
            var x = Math.floor( Math.random() * max) + min;
            if(arr.includes(x) == true){
                i=i-1;
            }else{
                if(x>max==false){
                    arr.push(x);
                }
            }
        }

        const address = await factory(Address)({ roles: [] }).createMany(10);
        const role = await factory(Role)({ roles: [] }).createMany(10);
        const disease = await factory(Disease)({ roles: [] }).createMany(10);
        const labTest = await factory(LabTest)({ roles: [] }).createMany(10);
        

        var value = 0;
        const healthCenter = await factory(HealthCenter)()
            .map(async (healthCenter) => {
                healthCenter.address = address[arr[value]];
                value++;
                return healthCenter;
            }).createMany(10);
        
        value = 0;
        const user = await factory(User)()
            .map(async (user) => {
                user.healthCenter = healthCenter[arr[value]];
                user.address = address[arr[value] + 10];
                user.role = role[arr[value]];
                value++;
                return user;
            }).createMany(10);
        
        value = 0;
        const patient = await factory(Patient)()
            .map(async (patient) => {
                patient.registeredBy = user[arr[value]];
                patient.user = user[arr[value] + 20];
                value++;
                return patient;
            }).createMany(10);
        
        value = 0;
        const vital = await factory(Vitals)()
            .map(async (vital) => {
                vital.requestedBy = user[arr[value]];
                vital.filledBy = user[arr[value] + 10];
                vital.patient = patient[arr[value]];
                value++;
                return vital;
            }).createMany(10);
        
        value = 0;
        const inv = await factory(InvestigationRequest)()
            .map(async (inv) => {
                inv.vitals = vital[arr[value]];
                inv.registeredBy = user[arr[value]];
                inv.labTests = labTest;
                value++;
                return inv;
            }).createMany(10);
        
        value = 0;
        const examination = await factory(Examination)()
            .map(async (examination) => {
                examination.vital = vital[arr[value]];
                value++;
                return examination;
            }).createMany(10);
        
        var value = 0;
        const radiology = await factory(Radiology)()
            .map(async (radiology) => {
                radiology.requestedBy = user[arr[value]];
                radiology.investigationRequest = inv[arr[value]];
                value++;
                return radiology;
            }).createMany(10);
        
        var value = 0;
        const diagnoses = await factory(Diagnosis)()
            .map(async (diagnoses) => {
                diagnoses.filledBy = user[arr[value]];
                diagnoses.investigationRequest = inv[arr[value]];
                diagnoses.diseases = disease;
                value++;
                return diagnoses;
            }).createMany(10);
        
        var value = 0;
        const prescription = await factory(Prescription)()
            .map(async (prescription) => {
                prescription.diagnosis = diagnoses[arr[value]];
                value++;
                return prescription;
            }).createMany(10);
        
        var value = 0;
        const medication = await factory(Medication)()
            .map(async (medication) => {
                medication.prescription = prescription[arr[value]];
                value++;
                return medication;
            }).createMany(10);
        
        var value = 0;
        const labResults = await factory(LabResult)()
            .map(async (labResults) => {
                labResults.investigationRequest = inv[arr[value]];
                labResults.filledBy = user[arr[value]];
                value++;
                return labResults;
            }).createMany(10);

    }
}