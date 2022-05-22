import { User } from "../../user/user.entity";
import { define } from "typeorm-seeding";
import {faker} from '@faker-js/faker'
import { HealthCenter } from "../../health-center/healthcenter.entity";
import { Address } from "../../address/address.entity";

define(Address, (faker) => {
    const city = String(faker.address.city());
    const kebelle = String(faker.random.number(2));
    const woreda = String(faker.random.number(2));
    const street = faker.address.streetName();
    const houseNo = String(faker.random.number(5));
    const state = faker.address.state();


    const address = new Address();
    address.city = city;
        address.kebelle = kebelle;
        address.woreda = woreda;
        address.street = street;
        address.houseNo = houseNo;
        address.subCity = city;
        address.zone = state;




    return address;

    
})