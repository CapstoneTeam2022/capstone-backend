import { define } from "typeorm-seeding";
import { faker } from '@faker-js/faker';
import {Patient} from '../../patient/patient.entity';

define(Patient, () => {


    const emergencyContactName = faker.name.findName();
    const emergencyContactPhone = faker.phone.phoneNumber(); 
    const refId = faker.random.numeric(10);


    const patient = new Patient();
    patient.emergencyContactName = emergencyContactName;
    patient.emergencyContactPhone = emergencyContactPhone;
    patient.refId = refId;

    return patient;

    
})


  