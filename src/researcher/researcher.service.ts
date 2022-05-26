import { Body, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/dto';
import { DiagnosisService } from '../diagnosis/diagnosis.service';
import { PrescriptionService } from 'src/prescription/prescription.service';
import { HealthCenterService } from 'src/health-center/health-center.service';
import { count } from 'console';
import { DiseaseAnalytics } from './dto/analytics.dto';
import { Vitals } from '../vitals/vitals.entity';
import { VitalsService } from '../vitals/vitals.service';
import { VitalsDto } from 'src/vitals/dto';
import { parse } from 'path';

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

  async getDiseaseAnalytics(body: DiseaseAnalytics) {

    var counts = [];
    var diseasedPatientCount = 0;
    var ageGroupCount = 0;
    var byDateCount = 0;
    var genderCount = 0;
    var num = 0;
    
    const diagnoses = this.diagnosis.findAll();
    const vitals = this.vitals.getAll();
    const users = this.userService.getAllUsers();


    (await diagnoses).map((diagnoses) => {
      (diagnoses.diseases).map(async (disease) => {  
        if (body.healthCenter == 'All') {
          if (disease.name == body.disease) {
            diseasedPatientCount = diseasedPatientCount + 1;
            // if (diagnoses.createdAt >= body.startDate && diagnoses.createdAt <= body.endDate) {
            byDateCount = byDateCount + 1;
            const data = diagnoses.investigationRequest;
            (await vitals).map((vital) => {
              ( vital.investigationRequests).map(async (inv) => {
                if (inv.id === data.id) {
                  (await (users)).map((user) => {
                    if (vital.patient.id === user.patient.id) {
                      const age = user.age;
                      if (age >= body.startAgeGroup && age <= body.endAgeGroup) {
                        // num = 10;
                        // console.log('age');
                        ageGroupCount = ageGroupCount + 1;
                        console.log('inside loop ' + ageGroupCount)
                        const gender = user.gender;
                        if (gender === body.gender) {
                          genderCount = genderCount + 1;
                        }
                        }
                      
                    }
                    
                  })
                  
                }
                
              }) 
              
            })
           
          }

         
        }
       
      })
      
    })
    
    // console.log(kk);
    // console.log(diseasedPatientCount);

       setTimeout(function () {
      counts.push(diseasedPatientCount);
      counts.push(byDateCount);
      counts.push(ageGroupCount);
      counts.push(genderCount);
      console.log('outside loop ' + ageGroupCount);
    },200)
    return counts;
 
  }
  
  async getMedicationAnalytics(medication)
  {

    var counts = {
      medicatedPatientCount: 0,
      ageGroupCount: 0,
      byDateCount: 0,
      genderCount: 0
    }
    

    const prescriptions = this.prescription.findAll();
    (await prescriptions).map((prescription) => {
      for (var i; i <= prescription.medications.length; i++){
        if (prescription.diagnosis.filledBy.healthCenter == prescription.diagnosis.filledBy.healthCenter)
        {
          if (prescription.medications[i].name == medication) {
            counts.medicatedPatientCount++;
            if (prescription.createdAt >= medication.startDate && prescription.createdAt <= medication.endDate) {
              counts.byDateCount++;
              const age = prescription.diagnosis.investigationRequest.vitals.patient.user.age;
              if (age >= medication.startAgeGroup && age <= medication.endAgeGroup) {
                counts.ageGroupCount++;
                if (prescription.diagnosis.investigationRequest.vitals.patient.user.gender == medication.gender) {
                  counts.genderCount++;
                }
              }
          }
          }
        }

         else if (prescription.diagnosis.filledBy.healthCenter == medication.healthCenter)
        {
          if (prescription.medications[i].name == medication) {
            counts.medicatedPatientCount++;
            if (prescription.createdAt >= medication.startDate && prescription.createdAt <= medication.endDate) {
              counts.byDateCount++;
              const age = prescription.diagnosis.investigationRequest.vitals.patient.user.age;
              if (age >= medication.startAgeGroup && age <= medication.endAgeGroup) {
                counts.ageGroupCount++;
                if (prescription.diagnosis.investigationRequest.vitals.patient.user.gender == medication.gender) {
                  counts.genderCount++;
                }
              }
          }
        }
        }
      }
    })
    return counts;
  }
}
