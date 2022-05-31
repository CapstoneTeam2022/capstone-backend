import { Body, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/dto';
import { DiagnosisService } from '../diagnosis/diagnosis.service';
import { PrescriptionService } from 'src/prescription/prescription.service';
import { HealthCenterService } from 'src/health-center/health-center.service';
import { count } from 'console';
import { Analytics } from './dto/analytics.dto';
import { Vitals } from '../vitals/vitals.entity';
import { VitalsService } from '../vitals/vitals.service';
import { VitalsDto } from 'src/vitals/dto';
import { parse } from 'path';
import { InvestigationRequest } from 'src/investigation-request/investigationRequest.entity';
import { Diagnosis } from 'src/diagnosis/entities/diagnosis.entity';

@Injectable()
export class ResearcherService {
  readonly roleName = 'Researcher';
  userInfoByRole= {
    doctor: {},
    nurse: {},
    researcher: {},
    patient: {},
    healthcenterAdmin: {},
    admin: {},
    labTechnican: {},
    radiologist: {}
  }

  userInfoByAge = {}

  constructor(
    private userService: UserService,
    private diagnosis: DiagnosisService,
    private prescription: PrescriptionService,
    private healthCenter: HealthCenterService,
    private vitals: VitalsService
  
  ) { }

  getAll() {
    return this.userService.findAllByRoleName(this.roleName);
  }

  getById(id: number) {
    return this.userService.findOneByRoleName(id, this.roleName);
  }

  create(user: UserDto) {
    user.isResearcher = true;
    return this.userService.addUser(user, this.roleName);
  }

   getHealthCenterAnalytics(healthcenter: string){ 
    return {};
   }
 

  async getVitals(body: Analytics, datas: InvestigationRequest[]) {
    const vitals = this.vitals.getAll();
    var vitalDatas: Vitals[] = [];
    
    (await vitals).map((vital) => {
      
      ( vital.investigationRequests).map( (inv) => {
        (datas).map((data) => {
          
          if (inv.id === data.id) {
            vitalDatas.push(vital);             
          }          
        })
      })           
    });
    
    return vitalDatas;
  }
  
  async getUsers(body: Analytics, datas: Vitals[]) {
    const users = this.userService.getAllUsers();
    var ageGroupCount = 0;
    var genderCount = 0;
    var usersData = [];
    var count = 0;
    (await ((users))).map((user) => {
      
      (datas).map(async (data) => {
        
      if (data.patient.id === user.patient.id) {
        console.log('yes');
        if (user.age >= body.startAgeGroup && user.age <= body.endAgeGroup) {
          ageGroupCount = ageGroupCount + 1;
          console.log('agecount ' + ageGroupCount);
          
          const gender = user.gender;
          if (gender === body.gender) {
            genderCount = genderCount + 1;
            console.log('gender ' + genderCount);
          }
        }
      }
      
    })
    });
    
    usersData.push(ageGroupCount);
    usersData.push(genderCount)
    return usersData;
  }


   
  
  async getDiseasedPatient(body: Analytics ) {
    const diagnoses = this.diagnosis.findAll();
    var diseasedPatientCount = 0;
    var byDateCount = 0;
    var invs: InvestigationRequest[] = [];
    var datas = [];
    

(await diagnoses).map((diagnoses) => {
  (diagnoses.diseases).map(async (disease) => {
   if (body.healthCenter == 'All') {
     if (disease.name == body.disease) {
       diseasedPatientCount = diseasedPatientCount + 1;
      //  const date = diagnoses.createdAt.toDateString();
      //  if (date >= body.startDate && date <= body.endDate) {
         byDateCount = byDateCount + 1;
       
         invs.push(diagnoses.investigationRequest);
     
          }
          
        }
      });
    });

    datas.push(diseasedPatientCount);
    datas.push(byDateCount);
  
    const vitals = await this.getVitals(body, invs);
    const usersData = await this.getUsers(body, vitals);  
    datas.push(usersData[0]);
    datas.push(usersData[1]);
    return datas; 
  }


  async getMedicationAnalytics(body : Analytics)
  {
  
    var datas = [];
    var medicatedPatientCount= 0;
    var ageGroupCount= 0;
    var byDateCount= 0;
    var genderCount= 0;
  
    
    var diagnosis = [];
  
    const prescriptions = this.prescription.findAll();
    (await prescriptions).map((prescription) => {
      diagnosis.push(prescription.diagnosis);
      (prescription.medications).map((medication) => {
        if (medication.name === body.medication) {
          medicatedPatientCount = medicatedPatientCount + 1;
          // if (prescription.createdAt >= medication.startDate && prescription.createdAt <= medication.endDate) {
          byDateCount = byDateCount + 1;
          // }



        }
      })
    })

    datas.push(medicatedPatientCount);
    datas.push(byDateCount);


    const invs = await this.getInvestigationRequest(diagnosis);
    const vitals = await this.getVitals(body, invs);
    const usersData = await this.getUsers(body, vitals);  
    datas.push(usersData[0]);
    datas.push(usersData[1]);


    return datas;
  }

  async getInvestigationRequest(diagnosis: Diagnosis[])
  {
    var diagnoses = this.diagnosis.findAll();
    var invs = [];
    // console.log(diagnosis);
    (await (diagnoses)).map((dia) => {
    (diagnosis).map( (diagnos) => {
        if (dia.id === diagnos.id) {
          
          invs.push(dia.investigationRequest);
        }
      })
    });
   
    return invs;
  }
}


// for (var i = 0; i <= prescription.medications.length; i++){
//         if (prescription.diagnosis.filledBy.healthCenter == prescription.diagnosis.filledBy.healthCenter)
//         {
//           if (prescription.medications[i].name == medication) {
//             counts.medicatedPatientCount++;
//             if (prescription.createdAt >= medication.startDate && prescription.createdAt <= medication.endDate) {
//               counts.byDateCount++;
//               const age = prescription.diagnosis.investigationRequest.vitals.patient.user.age;
//               if (age >= medication.startAgeGroup && age <= medication.endAgeGroup) {
//                 counts.ageGroupCount++;
//                 if (prescription.diagnosis.investigationRequest.vitals.patient.user.gender == medication.gender) {
//                   counts.genderCount++;
//                 }
//               }
//           // }
//           }
//         }