import { PrismaClient, Polygon } from "@prisma/client";
import { faker } from "@faker-js/faker";
import data from "../../apps/web/minified.json";

const database = new PrismaClient();
async function seed() {
  console.log(`Successfully seeded database 🌱`);

  // @ts-ignore
  const polygons: Polygon[] = data.features.map((feature) => ({
    Id: feature.properties.polygon_id,
    TreesLikeCount: 0,
    BBQLikeCount: 0,
    FlowersLikeCount: 0,
    BikesLikeCount: 0,
    BooksLikeCount: 0,
  }));

  await database.polygon.createMany({
    data: polygons,
    skipDuplicates: true,
  });
}

seed();
