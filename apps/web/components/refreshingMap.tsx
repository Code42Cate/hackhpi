"use client";

import { Polygon } from "database";
import Map from "./map";
import { useEffect } from "react";
import data from "../minified.json";

export default function RefreshingMap({ polygons }: { polygons: Polygon[] }) {
  /*
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("refresh 3d models");

      //@ts-ignore
      window.tb.clear();

      polygons.forEach((polygon) => {
        drawCityModules(polygon);
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [polygons]);
*/

  return (
    <Map
      onLoad={() => {
        polygons.forEach((polygon) => {
          drawCityModules(polygon);
        });
      }}
    />
  );
}

function drawCityModules(polygon: Polygon) {
  // @ts-ignore
  const feature = data.features.find(
    (x) => x.properties.polygon_id === polygon.Id,
  );

  const lng = feature.geometry.coordinates[0][0][0];
  const lat = feature.geometry.coordinates[0][0][1];

  const counts = {
    PublicToiletLikeCount: polygon.PublicToiletLikeCount,
    DrinkFountainLikeCount: polygon.DrinkFountainLikeCount,
    TreesLikeCount: polygon.TreesLikeCount,
    FlowersLikeCount: polygon.FlowersLikeCount,
  };

  // find key with highest value
  const max = Object.keys(counts).reduce((a, b) =>
    counts[a] > counts[b] ? a : b,
  );

  drawCityModule(max, lng, lat, 90);
}

function drawCityModule(countKey, lng, lat, rot = 90) {
  const objMap = {
    PublicToiletLikeCount: "/dusty_old_bookshelf_free.glb",
    DrinkFountainLikeCount: "/bike-station1.glb",
    TreesLikeCount: "/maple_tree.glb",
    FlowersLikeCount: "/landmann_grill.glb",
  };
  const obj = objMap[countKey];

  const scale = {
    "/landmann_grill.glb": 0.0025,
    "/maple_tree.glb": 0.1,
    "/bike-station1.glb": 1.5,
    "/sports_rackets_bats_and_balls.glb": 0.1,
    "/dusty_old_bookshelf_free": 10,
    "/emrysquick_project1.glb": 10,
  };

  const options = {
    type: "gltf",
    obj,
    scale: scale[obj],
    units: "meters",
    adjustment: { x: 0, y: 0.5, z: 0 },
    anchor: "bottom",
    rotation: { x: rot, y: 0, z: 0 },
  };

  // @ts-ignore
  window.tb.loadObj(options, function (model: any) {
    const truck = model.setCoords([lng, lat]);
    truck.addEventListener("ObjectChanged", console.log, false);
    // @ts-ignore
    window.tb.add(truck);
  });
}
