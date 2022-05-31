import { User } from "../../user/user.entity";
import { define } from "typeorm-seeding";
import {faker} from '@faker-js/faker';
import { HealthCenter } from "../../health-center/healthcenter.entity";
import { Address } from "../../address/address.entity";

define(User, () => {
    const name = faker.name.firstName();
    const email = faker.internet.email(name);
    const phone = faker.phone.phoneNumber();
    const age = parseInt(faker.random.numeric(2));
    const gender = faker.name.gender();
    const password = faker.internet.password(8);
    const city = String(faker.address.city());
    const kebelle = String(faker.random.numeric(2));
    const woreda = String(faker.random.numeric(2));
    const street = faker.address.streetName();
    const houseNo = String(faker.random.numeric(5));
    const state = faker.address.state();
    const cName = faker.company.bsNoun();
    const type = faker.lorem.words(1);
    
    

    const healthCenter = new HealthCenter();
    healthCenter.name = cName;
    healthCenter.email = email;
    healthCenter.phone = phone;
    healthCenter.type = type;

    const address = new Address();
    address.city = city;
        address.kebelle = kebelle;
        address.woreda = woreda;
        address.street = street;
        address.houseNo = houseNo;
        address.subCity = city;
        address.zone = state;


    const user = new User();
    user.name = name;
    user.phone = phone;
    user.age = age;
    user.gender = gender;
    user.password = password;
    user.email = email;
    user.isActive = true;
    user.isAdmin = false;
    user.isResearcher = false;
    user.address = address;

    user.healthCenter = healthCenter;

    return user;

    
})