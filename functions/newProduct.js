import { faker } from '@faker-js/faker';

export default function newProduct() {
  return {
    title: faker.commerce.product(),
    price: 10,
    description: faker.commerce.productMaterial(),
    categoryId: 1,
    images: ["https://placehold.co/600x400"]
  }
}