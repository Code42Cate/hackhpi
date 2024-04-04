export type {
  Admin,
  Mentor,
  BusinessModel,
  Category,
  Checkout,
  FundingRound,
  Metric,
  FellowStatus,
  Founder,
  FundingStatus,
  UniversityDegree,
  Gender,
  Partner,
  Request,
  Startup,
} from "@prisma/client";

import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
