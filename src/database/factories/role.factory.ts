import { define } from "typeorm-seeding";
import {faker} from '@faker-js/faker';
import { Role } from "../../role/role.entity";

define(Role, () => {
    const name = faker.lorem.words(1);
    const role = new Role();
    role.name = name;

    return role;

    
})