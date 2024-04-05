"use server";
import { Polygon, prisma } from "database";
type Response = {
  list: {
    main: {
      aqi: number;
    };
  }[];
};

export async function fetchAirQuality(lat: number, lon: number) {
  const token = process.env.OPENWEATHERMAP_API_KEY;
  const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${token}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch air quality data");
  }

  const data = (await response.json()) as Response;

  return data.list[0].main.aqi;
}

export async function getSpotLikes(polygonId: string): Promise<Polygon> {
  const polygon = await prisma.polygon.findUnique({
    where: { Id: polygonId },
  });
  return polygon;
}
