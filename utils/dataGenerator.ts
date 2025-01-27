import { faker } from '@faker-js/faker';

const generateUserData = () => {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        userName: faker.person.firstName().toLowerCase(),
        password: faker.internet.password() + "ABCabc@123" ,
        repoName: "test_repo_" + faker.lorem.word(),
        description: faker.lorem.sentence()
    };
};
export {generateUserData};