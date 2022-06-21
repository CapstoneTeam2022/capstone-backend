import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/dto';

import { DiagnosisService } from '../diagnosis/diagnosis.service';
import { PrescriptionService } from 'src/prescription/prescription.service';
import { HealthCenterService } from 'src/health-center/health-center.service';

import { DiseaseAnalytics, MedicationAnalytics } from './dto/analytics.dto';
import { Vitals } from '../vitals/vitals.entity';
import { VitalsService } from '../vitals/vitals.service';

import { InvestigationRequest } from 'src/investigation-request/investigationRequest.entity';
import { Diagnosis } from 'src/diagnosis/entities/diagnosis.entity';
import { PatientService } from 'src/patient/patient.service';
import { DiseaseService } from 'src/disease/disease.service';
import { ExaminationService } from 'src/examination/examination.services';
import { InvestigationRequestService } from 'src/investigation-request/investigation-request.service';
import { User } from 'src/user/user.entity';
import { UpdateResearcherDto } from './dto/update-researcher.dto';
import { HealthCenter } from 'src/health-center/healthcenter.entity';
import { Patient } from 'src/patient/patient.entity';

@Injectable()
export class ResearcherService {
  readonly roleName = 'Researcher';

  constructor(
    private userService: UserService,
    private diagnosisService: DiagnosisService,
    private prescriptionService: PrescriptionService,
    private healthCenterService: HealthCenterService,
    private vitalsService: VitalsService,
    private patientsService: PatientService,
    private diseaseService: DiseaseService,
    private examinationService: ExaminationService,
    private investigationRequestService: InvestigationRequestService,
  ) {}

  getAll() {
    return this.userService.findAllByRoleName(this.roleName);
  }

  async getAllInDateRange(start: Date, end: Date) {
    const users = await this.userService.getAllInDateRangeForRole(
      this.roleName,
      start,
      end,
      {
        select: ['name'],
      },
    );

    return users.map((user) => user.name);
  }

  getById(id: number) {
    return this.userService.findOneByRoleName(id, this.roleName, 'address');
  }

  create(user: UserDto) {
    user.isResearcher = true;
    return this.userService.addUser(user, this.roleName);
  }

  async getNumOfResearchers() {
    const num = (await this.userService.findAllByRoleName(this.roleName))
      .length;
    return num;
  }

  async updateResearcher(id: number, data: UpdateResearcherDto) {
    return this.userService.updateUser(id, {
      ...data,
      isResearcher: true,
      image: '',
      isAdmin: false,
    });
  }

  async getHealthCenterAnalytics(email: string) {
    let doctor = 0;
    let nurse = 0;
    let receptionist = 0;
    let hospitalAdmin = 0;
    let labTechnican = 0;
    let radiologist = 0;
    let system_admin = 0;
    let researcher = 0;
    let male = 0;
    let female = 0;
    const userRoleGroup = {};
    let check = 0;


    const healthcenter = await this.userService.getUserByEmail(email);


    const users = await this.healthCenterService.getHealthcenter(await healthcenter);
    
    const allUsers = this.userService.getAllUsers();
    if (users.length != 0) {
       console.log("found one ");
      console.log("users " + users);
     
      (await (allUsers)).map(async (user) => {
        
       users.map((oneUser) => {
        if (oneUser.id === user.id ) {
            if (user.role.name === 'Doctor' || user.role.name === 'doctor') {
              doctor = doctor + 1;
            } else if (user.role.name === 'Nurse' || user.role.name === 'nurse') {
              nurse = nurse + 1;
            } else if (
              user.role.name === 'Hospital Admin' ||
              user.role.name === 'Hospital admin' ||
              user.role.name === 'hospital Admin' ||
              user.role.name === 'hospital admin'
            ) {
              hospitalAdmin = hospitalAdmin + 1;
            } else if (
              user.role.name === 'Radiologist' ||
              user.role.name === 'radiologist'
            ) {
              radiologist = radiologist + 1;
            } else if (
              user.role.name === 'LabExpert'
            ) {
              labTechnican = labTechnican + 1;
            } else if (
              user.role.name === 'System Admin' ||
              user.role.name === 'system Admin' ||
              user.role.name === 'System admin' ||
              user.role.name === 'system admin'
            ) {
              system_admin = system_admin + 1;
            } else if (
              user.role.name === 'receptionist' ||
              user.role.name === 'Receptionist'
            ) {
              receptionist = receptionist + 1;
            } else if (
              user.role.name === 'researcher' ||
              user.role.name === 'Researcher'
            ) {
              researcher = researcher + 1;
            }

              if (user.gender === 'male' || user.gender === 'Male') {
                male = male + 1;
              } else if (user.gender === 'female' || user.gender === 'Female') {
                female = female + 1;
              }
          }
        });
      });
    } else {
      console.log('found noting');
    }
    

    userRoleGroup['receptionist'] = receptionist;
    userRoleGroup['radiologist'] = radiologist;
    userRoleGroup['doctor'] = doctor;
    userRoleGroup['nurse'] = nurse;
    userRoleGroup['system_admin'] = system_admin;
    userRoleGroup['hospital_admin'] = hospitalAdmin;
    userRoleGroup['lab_technican'] = labTechnican;
    userRoleGroup['male'] = male;
    userRoleGroup['female'] = female;
    userRoleGroup['researcher'] = researcher;
    userRoleGroup['hospital_name'] = healthcenter;


    return userRoleGroup;
  }

  async getVitals(
    body: DiseaseAnalytics | MedicationAnalytics,
    datas: InvestigationRequest[],
  ) {
    const vitals = this.vitalsService.getAll();
    const vitalDatas: Vitals[] = [];

    (await vitals).map((vital) => {
      vital.investigationRequests.map((inv) => {
        datas.map((data) => {
          if (inv.id === data.id) {
            vitalDatas.push(vital);
          }
        });
      });
    });

    return vitalDatas;
  }

  async getUsers(
    body: DiseaseAnalytics | MedicationAnalytics,
    datas: Vitals[],
  ) {
   
    let ageGroupCount = 0;
    let genderCount = 0;
    const usersData = [];
    const count = 0;
    let patient: Patient;
    let users = [];
    const allPatients = this.patientsService.getAllPatients();
    
    (await allPatients).map((singlePatient) => {
      console.log("single " + singlePatient.id);
      datas.map(async (data) => {
    
        patient = data.patient;
        let newPatient: Patient;
        console.log(patient.id);
  
        console.log("id " + singlePatient.id);
        if (singlePatient.id === patient.id) {
          
        
        const user = singlePatient.user;
          console.log("single uu " + user.age);
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
    usersData.push(genderCount);
    return usersData;
  }

  async getDiseasedPatient(body: DiseaseAnalytics) {
    const diagnoses = this.diagnosisService.findAll();
    const diagnosesCount = (await diagnoses).length;
    let diseasedPatientCount = 0;
    let byDateCount = 0;
    const invs: InvestigationRequest[] = [];
    const datas = {};

    (await diagnoses).map((diagnoses) => {
      diagnoses.diseases.map(async (disease) => {
        if (body.healthCenter == 'All') {
          if (disease.name == body.disease) {
            diseasedPatientCount = diseasedPatientCount + 1;
            //  const date = diagnoses.createdAt.toDateString();
            //  if (date >= body.startDate && date <= body.endDate) {
            byDateCount = byDateCount + 1;

            invs.push(diagnoses.investigationRequest);
          }
        } else {
          const healthCenter = this.getHealthCenter(diagnoses.filledBy);
          if (healthCenter) {
            if (disease.name == body.disease) {
              diseasedPatientCount = diseasedPatientCount + 1;
              //  const date = diagnoses.createdAt.toDateString();
              //  if (date >= body.startDate && date <= body.endDate) {
              byDateCount = byDateCount + 1;

              invs.push(diagnoses.investigationRequest);
            }
          }
        }
      });
    });

    datas['total_diagnoses'] = diagnosesCount;
    datas['diseased_patient_count'] = diseasedPatientCount;
    datas['by_date_count'] = byDateCount;

    const vitals = await this.getVitals(body, invs);
    const usersData = await this.getUsers(body, vitals);
    datas['by_age'] = usersData[0];
    datas['by_gender'] = usersData[1];
    return datas;
  }
  async getMedicationAnalytics(body: MedicationAnalytics) {
    const diagnoses = this.diagnosisService.findAll();
    const diagnosesCount = 0;

    const datas = {};
    let medicatedPatientCount = 0;
    const ageGroupCount = 0;
    let byDateCount = 0;
    const genderCount = 0;
     const invs: InvestigationRequest[] = [];
    const diagnosis = [];

    const prescriptions = this.prescriptionService.findAll();
    const prescriptionsCount = (await prescriptions).length;
    (await prescriptions).map((prescription) => {
      diagnosis.push(prescription.diagnosis);
      prescription.medications.map(async (medication) => {
        if (medication.name === body.medication) {
          medicatedPatientCount = medicatedPatientCount + 1;
          // if (prescription.createdAt >= medication.startDate && prescription.createdAt <= medication.endDate) {
          byDateCount = byDateCount + 1;
          // }
          invs.push(await this.getInvestigationRequest(prescription.diagnosis));
        }
      });
    });

    datas['total_prescriptions'] = prescriptionsCount;
    datas['medicated_patient_count'] = medicatedPatientCount;
    datas['by_date'] = byDateCount;

     
    const vitals = await this.getVitals(body, invs);
    const usersData = await this.getUsers(body, vitals);
    datas['by_age'] = usersData[0];
    datas['by_gender'] = usersData[1];

    return datas;
  }

  async getInvestigationRequest(diagnosis) {
    const diagnoses = this.diagnosisService.findAll();
    let invs: InvestigationRequest;
    // console.log(diagnosis);
    (await diagnoses).map((dia) => {
        if (dia.id === diagnosis.id) {
          invs = dia.investigationRequest;
        }
    });

    return invs;
  }

  async getHealthCenter(filledBy: User) {
    const data = filledBy.healthCenter.name;
    const healthCenter = [];
    const users = await this.userService.getAllUsers();
    users.map((user) => {
      if (data === user.healthCenter.name) {
        healthCenter.push[data];
      }
    });
    return healthCenter;
  }

  async getPatientRecord() {
    const group = {};
    let infants = 0;
    let toddler = 0;
    let child = 0;
    let teen = 0;
    let adult = 0;
    let middle_age_adult = 0;
    let senior_adult = 0;
    let male = 0;
    let female = 0;

    const patients = this.patientsService.getAllPatients();
    (await patients).map((patient) => {
      if (patient.user.age >= 0 && patient.user.age <= 1) {
        infants = infants + 1;
      } else if (patient.user.age >= 2 && patient.user.age <= 4) {
        toddler = toddler + 1;
      } else if (patient.user.age >= 5 && patient.user.age <= 12) {
        child = child + 1;
      } else if (patient.user.age >= 13 && patient.user.age <= 19) {
        teen = teen + 1;
      } else if (patient.user.age >= 20 && patient.user.age <= 39) {
        adult = adult + 1;
      } else if (patient.user.age >= 40 && patient.user.age <= 59) {
        middle_age_adult = middle_age_adult + 1;
      } else if (patient.user.age >= 60) {
        senior_adult = senior_adult + 1;
      } else {
      }

      if (patient.user.gender === 'male' || patient.user.gender === 'Male') {
        male = male + 1;
      } else if (
        patient.user.gender === 'female' ||
        patient.user.gender === 'Female'
      ) {
        female = female + 1;
      }
    });

    group['infant'] = infants;
    group['toddler'] = toddler;
    group['child'] = child;
    group['teen'] = teen;
    group['adult'] = adult;
    group['middle_age_adult'] = middle_age_adult;
    group['senior_adult'] = senior_adult;
    group['female'] = female;
    group['male'] = male;

    return group;
  }

  async getUserRecord() {
    let doctor = 0;
    let nurse = 0;
    let receptionist = 0;
    let hospitalAdmin = 0;
    let labTechnican = 0;
    let radiologist = 0;
    let system_admin = 0;
    let researcher = 0;
    let male = 0;
    let female = 0;
    const userRoleGroup = {};

    const users = this.userService.getAllUsers();
    (await users).map((user) => {
      if (user.role.name === 'Doctor' || user.role.name === 'doctor') {
        doctor = doctor + 1;
      } else if (user.role.name === 'Nurse' || user.role.name === 'nurse') {
        nurse = nurse + 1;
      } else if (
        user.role.name === 'Hospital Admin' ||
        user.role.name === 'Hospital admin' ||
        user.role.name === 'hospital Admin' ||
        user.role.name === 'hospital admin'
      ) {
        hospitalAdmin = hospitalAdmin + 1;
      } else if (
        user.role.name === 'Radiologist' ||
        user.role.name === 'radiologist'
      ) {
        radiologist = radiologist + 1;
      } else if (
        user.role.name === 'Lab Technican' ||
        user.role.name === 'Lab Technican' ||
        user.role.name === 'Lab technican' ||
        user.role.name === 'lab Technican' ||
        user.role.name === 'lab technican'
      ) {
        labTechnican = labTechnican + 1;
      } else if (
        user.role.name === 'System Admin' ||
        user.role.name === 'system Admin' ||
        user.role.name === 'System admin' ||
        user.role.name === 'system admin'
      ) {
        system_admin = system_admin + 1;
      } else if (
        user.role.name === 'receptionist' ||
        user.role.name === 'Receptionist'
      ) {
        receptionist = receptionist + 1;
      } else if (
        user.role.name === 'researcher' ||
        user.role.name === 'Researcher'
      ) {
        researcher = researcher + 1;
      }

      if (user.gender === 'male' || user.gender === 'Male') {
        male = male + 1;
      } else if (user.gender === 'female' || user.gender === 'Female') {
        female = female + 1;
      }
    });

    userRoleGroup['receptionist'] = receptionist;
    userRoleGroup['radiologist'] = radiologist;
    userRoleGroup['doctor'] = doctor;
    userRoleGroup['nurse'] = nurse;
    userRoleGroup['system_admin'] = system_admin;
    userRoleGroup['hospital_admin'] = hospitalAdmin;
    userRoleGroup['lab_technican'] = labTechnican;
    userRoleGroup['male'] = male;
    userRoleGroup['female'] = female;
    userRoleGroup['researcher'] = researcher;

    return userRoleGroup;
  }

  async counts() {
    const patientsCount = (await this.patientsService.getAllPatients()).length;
    const prescriptionsCount = (await this.prescriptionService.findAll())
      .length;
    const usersCount = (await this.userService.getAllUsers()).length;
    const diagnosisCount = (await this.diagnosisService.findAll()).length;
    const diseaseCount = (await this.diseaseService.findAll()).length;
    const invsCount = (await this.investigationRequestService.getAll()).length;
    const examCount = (await this.examinationService.findAll()).length;
    const vitalsCount = (await this.vitalsService.getAll()).length;
    const healthCenterCount = (
      await this.healthCenterService.getAllHealthCenters()
    ).length;

    const counts = {};
    counts['patient'] = patientsCount;
    counts['prescription'] = prescriptionsCount;
    counts['user'] = usersCount;
    counts['diagnosis'] = diagnosisCount;
    counts['disease'] = diseaseCount;
    counts['investigation'] = invsCount;
    counts['examination'] = examCount;
    counts['vital'] = vitalsCount;
    counts['health_center'] = healthCenterCount;
    return counts;
  }
}
