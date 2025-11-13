import { faker } from "@faker-js/faker";

export class UserFactory {
  static createUser(login, password) {
    return {
      login: login,
      password: password,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      postalCode: faker.location.zipCode(),
    };
  }
}
