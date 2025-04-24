import { faker } from '@faker-js/faker';

// Generate fake first name
export const fakeFirstName = () => faker.person.firstName();

// Generate fake lastname
export const fakeLastName = () => faker.person.lastName();

// Generate fake phone
export const fakePhone = () => faker.phone.number();
// Generate fake email
export const fakeEmail = () => `${faker.person.firstName()}@1secmail.com`;

// Generate fake password
export const fakePassword = () => faker.internet.password();

// Generate fake address
export const fakeStreetAddress = () => faker.location.streetAddress();


export const generateUserData = () => ({
 name: faker.person.fullName(),
 email: faker.internet.email(),
 phone: faker.phone.number(),
 address: faker.location.streetAddress(),
 company: faker.company.name()
});