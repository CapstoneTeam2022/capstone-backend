import { define } from "typeorm-seeding";
import {faker} from '@faker-js/faker';

import { Prescription } from "../../prescription/entities/prescription.entity";

define(Prescription, () => {

    const createdAt = faker.date.past();

    const prescription = new Prescription();
    prescription.createdAt = createdAt;

    return prescription;

    
})


  