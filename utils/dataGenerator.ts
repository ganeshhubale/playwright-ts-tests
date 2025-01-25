import { faker } from '@faker-js/faker';

const generateUserData = () => {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        userName: faker.person.firstName().toLowerCase(),
        password: faker.internet.password() + "ABCabc@123" ,
    };
};
export {generateUserData};