import { Examination } from "../../examination/entities/examination.entity";
import {define} from 'typeorm-seeding'
import {faker} from "@faker-js/faker";

define(Examination, () => {

    const symptom = faker.lorem.words(10)
    const physical_examination = faker.lorem.words(10);
    const requestedDate = faker.date.past();
    
    const examination = new Examination();

    examination.symptom = symptom;
    examination.physical_examination = physical_examination;
    examination.requestedDate = requestedDate;

    return examination;

    
})

  