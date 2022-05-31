import { define } from "typeorm-seeding";
import {faker} from '@faker-js/faker';

import { Radiology } from "../../radiology/radiology.entity";

define(Radiology, () => {
const name = faker.lorem.words(1);
const focalArea = faker.lorem.words(1);
const orderDate = faker.date.past();
const filledDate = faker.date.past();
const report = faker.lorem.word(10);
    const image1 = faker.image.image();
    const image2 = faker.image.image();
    const image3 = faker.image.image();
    const images = [image1, image2, image3];
const comment = faker.lorem.words(10);

    const radiology = new Radiology();
    radiology.name = name;
    radiology.focalArea = focalArea;
    radiology.orderDate = orderDate;
    radiology.filledDate = filledDate;
    radiology.report = report;
    radiology.images = images;
    radiology.comment = comment;


    return radiology;

    
})