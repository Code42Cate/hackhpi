"use client";

import { Polygon } from "database";
import Map from "./map";
import data from "../minified.json";
import { edgeServerAppPaths } from "next/dist/build/webpack/plugins/pages-manifest-plugin";
import { useEffect } from "react";

export default function RefreshingMap({ polygons }: { polygons: Polygon[] }) {
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("refresh 3d models");

      //@ts-ignore
      window.tb.clear();

      polygons.forEach((polygon) => {
        drawCityModules(polygon);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [polygons]);

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
  const coords = feature.geometry.coordinates[0];
  const average = coords
    .reduce(([ax, ay], [x, y]) => [ax + x, ay + y], [0, 0])
    .map((c) => c / coords.length);

  const findMaxEdgeFrom = (coords, start) => {
    const edgeVector = [];
    const edgeDistance = [];
    for (let i = 0; i < coords.length - 1; i++) {
      edgeVector[i] = [];
      let coord1 = coords[i];
      let coord2 = coords[i < coords.length - 1 ? i + 1 : 0];

      edgeVector[i][0] = (coord1[0] + coord2[0]) / 2 - start[0];
      edgeVector[i][1] = (coord1[1] + coord2[1]) / 2 - start[1];

      edgeDistance[i] = Math.sqrt(
        Math.pow(edgeVector[i][0], 2) + Math.pow(edgeVector[i][1], 2),
      );
    }
    let maxDistance = Math.max(...edgeDistance);
    let maxEdgeIndex = edgeDistance.indexOf(maxDistance);

    let [x, y] = edgeVector[maxEdgeIndex];
    return [x + start[0], y + start[1]];
  };

  let endpoint1 = findMaxEdgeFrom(coords, average);
  let endpoint2 = findMaxEdgeFrom(coords, endpoint1);

  let direction = [endpoint2[0] - endpoint1[0], endpoint2[1] - endpoint1[1]];
  let distance = Math.sqrt(
    Math.pow(direction[0], 2) + Math.pow(direction[1], 2),
  );

  let points = [];

  let n = Math.ceil((distance * 10000) / 2);

  for (let i = 0; i < n; i++) {
    let t = (2 * i + 1) / (2 * n);
    points[i] = [
      endpoint1[0] + t * direction[0],
      endpoint1[1] + t * direction[1],
    ];
  }

  takeMostVoted(polygon, n).forEach((cm, i) => {
    drawCityModule(cm, points[i][0], points[i][1], 90);
  });
}

function takeMostVoted(polygon, n) {
  const keys = [
    "BBQLikeCount",
    "BikesLikeCount",
    "TreesLikeCount",
    "FlowersLikeCount",
    "BooksLikeCount",
  ];
  const stats = keys.map((k) => [k, polygon[k]]);
  stats.sort(([, a], [, b]) => b - a);

  let result = [];
  for (let i = 0; i < n && i < stats.length; i++) {
    if (stats[i][1] > 0) result.push(stats[i][0]);
  }
  return result;
}

function drawCityModule(countKey, lng, lat, rot = 90) {
  const objMap = {
    BooksLikeCount: "/Bookshelf.glb",
    BBQLikeCount: "/bbq.glb",
    TreesLikeCount: "/maple_tree.glb",
    BikesLikeCount: "/bike-station1.glb",
    FlowersLikeCount: "/flower_bed.glb",
  };

  const obj = objMap[countKey];

  const scale = {
    "/bbq.glb": 0.2,
    "/maple_tree.glb": 0.1,
    "/bike-station1.glb": 2,
    "/Bookshelf.glb": 0.4,
    "/flower_bed.glb": 2,
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
