import { define } from "typeorm-seeding";
import {faker} from '@faker-js/faker';
import { Vitals } from "../../vitals/vitals.entity";

define(Vitals, () => {


    
  const temperature = parseInt(faker.random.numeric(2));
  const pulse = parseInt(faker.random.numeric(2));
  const respiratoryRate = parseInt(faker.random.numeric(2));
  const bloodPressure = parseInt(faker.random.numeric(2));
  const weight = parseInt(faker.random.numeric());
  const spo2Level = parseInt(faker.random.numeric());
  const date = faker.date.past();
    
    const vital = new Vitals();
    vital.temperature = temperature;
    vital.pulse = pulse;
    vital.respiratoryRate = respiratoryRate;
    vital.bloodPressure = bloodPressure;
    vital.weight = weight;
    vital.spo2Level = spo2Level;
    vital.filledDate = date;
    vital.requestedDate = date;


    return vital;

    
})