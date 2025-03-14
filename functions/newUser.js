import { faker } from '@faker-js/faker';

export default function newUser() {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    avatar: "https://picsum.photos/800"
  }
}