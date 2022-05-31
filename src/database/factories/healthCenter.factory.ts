import { define } from "typeorm-seeding";
import {faker} from '@faker-js/faker';
import { HealthCenter } from "../../health-center/healthcenter.entity";


define(HealthCenter, () => {
    const cName = faker.company.bsNoun();
    const email = faker.internet.email(cName);
    const phone = faker.phone.phoneNumber();
    const type = faker.lorem.words(1);
    
    

    const healthCenter = new HealthCenter();
    healthCenter.name = cName;
    healthCenter.email = email;
    healthCenter.phone = phone;
    healthCenter.type = type;

    return healthCenter;

    
})