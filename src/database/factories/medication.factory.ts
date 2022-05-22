 import { define } from "typeorm-seeding";
import {faker} from '@faker-js/faker';
import {Medication} from '../../prescription/entities/mdication.entity';

define(Medication, () => {

  const name = faker.lorem.words(1);
  const dosage = faker.lorem.words(1);
  const instructions= faker.lorem.words(1);

    const medications = new Medication();
    medications.name = name;
    medications.dosage = dosage;
    medications.instructions = instructions;

    return medications;

    
})


  