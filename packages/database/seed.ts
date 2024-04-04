import { PrismaClient } from "@prisma/client";
import {
  Founder,
  UniversityDegree,
  Gender,
  prisma,
  Startup,
  CompanyStatus,
  FellowStatus,
  FundingStatus,
  BusinessModel,
  Request,
  Checkout,
} from "./index";
import { faker } from "@faker-js/faker";

// https://fakerjs.dev/guide/usage.html

const database = new PrismaClient();

async function deleteAllEntries() {
  try {
    // Delete all entries in each model

    await database.request.deleteMany({});
    await database.checkout.deleteMany({});
    await database.founder.deleteMany({});
    await database.startup.deleteMany({});

    console.log("All entries deleted successfully. BYE BYE!");
  } catch (error) {
    console.error("Error deleting entries:", error);
  }
}

const uniArray = ["KIT", "TU Berlin", "St. Gallen", "ETH"];
const majorArray = [
  "Industrial Engineering",
  "Economics",
  "Computer Science",
  "Electrical Engineering",
];
const GenderArray: Gender[] = ["Female", "Male", "PreferNotToSay", "Other"];
const degreeArray: UniversityDegree[] = ["Bachelor", "Master", "PhD"];
const CompanyStatusArray: CompanyStatus[] = ["Acquired", "Failed", "Active"];
const FellowStatusArray: FellowStatus[] = [
  "Fellow",
  "Rejected",
  "Alumni",
  "Pending",
];
const FundingStatusArray: FundingStatus[] = [
  "PreSeed",
  "Seed",
  "SeriesA",
  "SeriesB",
  "SeriesC",
  "SeriesD",
  "SeriesE",
  "SeriesF",
  "SeriesG",
];
const businessModelArray: BusinessModel[] = ["B2B", "B2C", "B2G", "B2H", "D2C"];
const numFounders = 10;
const numStartups = 10;
const numRequests = 10;
const numCheckouts = 10;

type FounderWithoutId = Omit<Founder, "id">;
type StartupWithoutId = Omit<Startup, "id">;
type RequestWithoutId = Omit<Request, "id">;
type CheckoutWithoutId = Omit<Checkout, "id">;

const startupObjects: StartupWithoutId[] = [];
const founderObjects: FounderWithoutId[] = [];
const RequestObjects: RequestWithoutId[] = [];
const CheckoutObjects: CheckoutWithoutId[] = [];

async function seedStartups() {
  for (let i = 0; i < numStartups; i++) {
    const startup: StartupWithoutId = {
      industry: faker.company.buzzPhrase(),
      name: faker.company.name(),
      description: faker.company.buzzPhrase(),
      fellowStatus:
        FellowStatusArray[Math.floor(Math.random() * FellowStatusArray.length)],
      fundingStatus:
        FundingStatusArray[
          Math.floor(Math.random() * FundingStatusArray.length)
        ],
      companyStatus:
        CompanyStatusArray[
          Math.floor(Math.random() * CompanyStatusArray.length)
        ],
      logoUrl: faker.image.urlLoremFlickr({ category: "abstract" }),
      foundingDate: faker.date.anytime(),
      country: faker.location.country(),
      website: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      twitter: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      linkedin: "https://www.linkedin.com/in/vasileios-xanthakis-986931186",
      businessModel:
        businessModelArray[
          Math.floor(Math.random() * businessModelArray.length)
        ],
    };
    startupObjects.push(startup);
    //console.log(startup);
  }

  await prisma.startup.createMany({
    data: startupObjects,
  });
}

async function seedFounders() {
  for (let i = 0; i < numFounders; i++) {
    const StartupArray = await database.startup.findMany();

    const founder: FounderWithoutId = {
      city: faker.location.city(),
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      universityDegree:
        degreeArray[Math.floor(Math.random() * degreeArray.length)],
      lastName: faker.person.lastName(),
      dateOfBirth: faker.date.birthdate(),
      phoneNumber: faker.phone.number(),
      country: faker.location.country(),
      hasEuropeanPassport: faker.datatype.boolean(),
      linkedin: "https://www.linkedin.com/in/vasileios-xanthakis-986931186",
      universityName: uniArray[Math.floor(Math.random() * uniArray.length)],
      universityMajor:
        majorArray[Math.floor(Math.random() * majorArray.length)],
      gender: GenderArray[Math.floor(Math.random() * GenderArray.length)],
      avatarUrl: faker.image.avatar(),
      universityStartDate: faker.date.anytime(),
      universityEndDate: faker.date.anytime(),
      startupId:
        StartupArray[Math.floor(Math.random() * StartupArray.length)].id,
    };
    founderObjects.push(founder);
    //console.log(founder);
  }

  await prisma.founder.createMany({
    data: founderObjects,
  });
}

async function seedRequests() {
  for (let i = 0; i < numRequests; i++) {
    const FounderArray = await database.founder.findMany();

    const request: RequestWithoutId = {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
      createdAt: faker.date.anytime(),
      founderId:
        FounderArray[Math.floor(Math.random() * FounderArray.length)].id,
      summary: faker.lorem.sentences(),
    };
    RequestObjects.push(request);
    //console.log(request);
  }

  await prisma.request.createMany({
    data: RequestObjects,
  });
}

async function seedCheckouts() {
  for (let i = 0; i < numCheckouts; i++) {
    const FounderArray = await database.founder.findMany();

    const request: RequestWithoutId = {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
      createdAt: faker.date.anytime(),
      founderId:
        FounderArray[Math.floor(Math.random() * FounderArray.length)].id,
      summary: faker.lorem.sentences(),
    };
    RequestObjects.push(request);
    //console.log(request);
  }

  await prisma.checkout.createMany({
    data: CheckoutObjects,
  });
}

deleteAllEntries();

async function seed() {
  await seedStartups();
  console.log(`Successfully seeded database with startups 🌱`);
  await seedFounders();
  console.log(`Successfully seeded database with founders 🌱`);
  await seedRequests();
  console.log(`Successfully seeded database with requests 🌱`);
  await seedCheckouts();
  console.log(`Successfully seeded database with checkouts 🌱`);
}

seed();
