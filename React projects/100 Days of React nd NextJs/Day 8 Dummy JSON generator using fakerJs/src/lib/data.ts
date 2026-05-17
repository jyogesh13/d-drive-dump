import { faker } from "@faker-js/faker";

export const generateUser = () => {
  return {
    id: crypto.randomUUID(),
    fullname: faker.person.fullName(),
    email: faker.internet.email(),
    bio: faker.person.bio(),
    mobile: faker.phone.number({ style: "international" }),
    gender: faker.person.gender(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
    pincode: faker.location.zipCode(),
    createdAt: faker.date.anytime(),
  };
};

export const generateProducts = () => {
  return {
    id: crypto.randomUUID(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    category: faker.commerce.productAdjective(),
    price: Number(faker.commerce.price()),
    discount: Number(faker.commerce.price({ min: 0, max: 100 })),
    rating: Math.floor(Number(faker.commerce.price({ min: 1, max: 5 }))),
    stock: Math.floor(Number(faker.commerce.price({ min: 1, max: 1000 }))),
    brand: faker.company.buzzNoun(),
    image: faker.image.urlPicsumPhotos(),
    createdAt: faker.date.anytime(),
  };
};
export const generatePayments = () => {
  return {
    id: crypto.randomUUID(),
    user: {
      id: crypto.randomUUID(),
      fullname: faker.person.fullName(),
      email: faker.internet.email(),
      mobile: faker.phone.number({ style: "international" }),
    },
    product: {
      id: crypto.randomUUID(),
      title: faker.commerce.productName(),
      category: faker.commerce.productAdjective(),
    },
    amount: Number(faker.commerce.price()),
    orderId: `OID-${crypto.randomUUID()}`,
    transactionId: `TSC-${crypto.randomUUID()}`,
    method: "UPI",
    tax: Number(faker.commerce.price({ min: 0, max: 50 })),
    createdAt: faker.date.anytime(),
  };
};
export const generateEmployee = () => {
  return {
    id: crypto.randomUUID(),
    fullname: faker.person.fullName(),
    email: faker.internet.email(),
    bio: faker.person.bio(),
    mobile: faker.phone.number({ style: "international" }),
    gender: faker.person.gender(),
    address: faker.location.streetAddress(),
    salary: Math.floor(
      Number(faker.commerce.price({ min: 20000, max: 1200000 })),
    ),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
    pincode: Number(faker.location.zipCode()),
    createdAt: faker.date.anytime(),
  };
};