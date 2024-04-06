import Map, { Spot } from "@/components/map";
import WayDetails from "@/components/WayDetails";
import { getSpotLikes } from "@/lib/actions";
import data from "../minified.json";
import { prisma } from "database";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const selectedSpotPolygonId = searchParams["spot"];
  let selectedSpot: Spot | null = null;

  if (selectedSpotPolygonId) {
    // @ts-ignore
    const x = data.features.find(
      (spot) => spot.properties.polygon_id === selectedSpotPolygonId,
    );

    selectedSpot = {
      id: x.properties.polygon_id,
      streetname: x.properties.strassenname,
      likes: await getSpotLikes(selectedSpotPolygonId),
    };
  }

  const polygons = await prisma.polygon.findMany({
    where: {
      AND: {
        Id: {
          startsWith: "P106_",
        },
        OR: [
          {
            PublicToiletLikeCount: {
              not: 0,
            },
          },
          {
            DrinkFountainLikeCount: {
              not: 0,
            },
          },
          {
            TreesLikeCount: {
              not: 0,
            },
          },
          {
            FlowersLikeCount: {
              not: 0,
            },
          },
        ],
      },
    },
  });

  return (
    <div className="relative flex h-screen flex-col items-center justify-center">
      <div className="w-full shadow-sm">
        <Map polygons={polygons} />
      </div>
      {selectedSpotPolygonId && (
        <div className="absolute bottom-0 h-96 w-screen overflow-y-auto rounded-t-lg bg-white p-4 md:right-0 md:h-screen md:w-96 md:rounded-l-lg">
          <WayDetails selectedSpot={selectedSpot} />
        </div>
      )}
    </div>
  );
}
