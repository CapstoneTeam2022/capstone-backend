import { define } from "typeorm-seeding";
import {faker} from '@faker-js/faker';
import { InvestigationRequest } from "../../investigation-request/investigationRequest.entity";

define(InvestigationRequest, () => {
    const note = faker.lorem.words(10);
    const date = faker.date.past();

    const inv = new InvestigationRequest();
    inv.note = note;
    inv.date = date;

    return inv;

    
})