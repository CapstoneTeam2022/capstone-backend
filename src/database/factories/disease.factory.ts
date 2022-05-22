import { define } from "typeorm-seeding";
import { faker } from '@faker-js/faker';
import { Disease } from "../../disease/entities/disease.entity";

define(Disease, () => { 
    const name = faker.lorem.words(10);
    const description = faker.lorem.words(10);


    const disease = new Disease();
    disease.name = name;
    disease.description = description;



    return disease;

    
})