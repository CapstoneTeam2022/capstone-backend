import { define } from "typeorm-seeding";
import {faker} from '@faker-js/faker';

import { LabTest } from "../../lab-test/labTest.entity";

define(LabTest, () => {

  const name = faker.lorem.words(1);
  const normalRange = faker.lorem.words(1);
  const measuredIn= faker.lorem.words(1);
  const testCategory = faker.lorem.words(1);



  
    const labTest = new LabTest();
    labTest.name = name;
    labTest.normalRange = normalRange;
    labTest.measuredIn = measuredIn;
    labTest.testCategory = testCategory;

    return labTest;

    
})