import { define } from "typeorm-seeding";
import {faker} from '@faker-js/faker';

import { Diagnosis } from "../../diagnosis/entities/diagnosis.entity";

define(Diagnosis, () => {
    const comment = faker.lorem.words(10);
    const date = faker.date.past();
    
    const diagnoses = new Diagnosis();
    diagnoses.comment = comment;
    diagnoses.createdAt = date;

    return diagnoses;

    
})