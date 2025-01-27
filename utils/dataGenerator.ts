import { faker } from '@faker-js/faker';

const generateUserData = () => {
    return {
        randomWord: faker.lorem.word(5),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        userName: faker.person.firstName().toLowerCase(),
        password: faker.internet.password() + "ABCabc@123" ,
        repoName: "test_repo_" + faker.lorem.word(),
        description: faker.lorem.sentence(),
        branchName: faker.word.sample(5)
    };
};
export {generateUserData};