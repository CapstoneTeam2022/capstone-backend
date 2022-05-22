import { define } from "typeorm-seeding";
import {faker} from '@faker-js/faker';
import { LabResult } from "../../lab-result/labResult.entity";

define(LabResult, () => {
  
    const name = faker.lorem.words(1);
    const type= faker.lorem.words(1);
    const result = faker.lorem.words(5);
    const isAbnormal = faker.random.boolean();
    const comment = faker.lorem.words(10);

    const labResult = new LabResult();
    labResult.name = name;
    labResult.comment = comment;
    labResult.type = type;
    labResult.result = result;
    labResult.isAbnormal = isAbnormal;

    return labResult;

    
})