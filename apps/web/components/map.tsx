"use client";
import React, { useRef, useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import data from "../minified.json";
import { Threebox } from "threebox-plugin";
import { Polygon } from "database";
import { useRouter } from "next/navigation";

mapboxgl.accessToken =
  "pk.eyJ1IjoiY29kZTQyY2F0ZSIsImEiOiJjbHU5MG15NzEwNGJpMmpta2gzNWMxazFqIn0.DmdGNtsf_SCeRxqEDlt0UQ";

export type Spot = {
  id: string;
  streetname: string;
  likes?: Polygon;
  aqi?: number;
};

const origin: mapboxgl.LngLatLike = [13.435310637279885, 52.51957888613136];

const features = (data as any).features.filter((x) =>
  x.properties.polygon_id.startsWith("P106_"),
);

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/standard",
      center: origin,
      zoom: 17,
      antialias: true,
      dragRotate: true,
      dragPan: true,
      touchPitch: true,
      pitch: 30,
      pitchWithRotate: true,
    });

    map.current.on("load", () => {
      let tb;
      map.current.addLayer({
        id: "custom_layer",
        type: "custom",
        renderingMode: "3d",
        onAdd: function (map, mbxContext) {
          // @ts-ignore
          tb = new Threebox(map, mbxContext, {
            defaultLights: true,
          });
          // @ts-ignore
          window.tb = tb;
        },

        render: function () {
          tb.update();
        },
      });

      map.current.addSource("parkingspots", {
        type: "geojson",
        generateId: true,
        data: {
          type: "FeatureCollection",
          features,
        },
      });

      // Add a new layer to visualize the polygon.
      map.current.addLayer({
        id: "areas",
        type: "fill",
        source: "parkingspots", // reference the data source
        layout: {},
        paint: {
          "fill-color": [
            "case",
            ["boolean", ["feature-state", "clicked"], true],
            "#00b335", // if selected true, paint in blue
            "#888888", // else paint in gray
          ],
          "fill-opacity": 0.3,
        },
      });

      map.current.addLayer({
        id: "outline",
        type: "line",
        source: "parkingspots",
        layout: {},
        paint: {
          "line-color": "#0080ff",
          "line-width": 2,
          "line-opacity": 0.8,
        },
      });

      map.current.on("mouseenter", "areas", () => {
        map.current.getCanvas().style.cursor = "pointer";
      });

      map.current.on("mouseleave", "areas", () => {
        map.current.getCanvas().style.cursor = "";
      });

      let currentPolygonId = null;
      map.current.on("click", "areas", async (e) => {
        const feature = e.features[0];
        const id = feature.id;
        router.push(`/?spot=${feature.properties.polygon_id}`);

        if (currentPolygonId) {
          map.current.setFeatureState(
            { source: "parkingspots", id: currentPolygonId },
            { clicked: true },
          );
        }

        map.current.setFeatureState(
          { source: "parkingspots", id },
          { clicked: false },
        );
        currentPolygonId = id;

        //addTree(e.lngLat.lng, e.lngLat.lat);
      });
    });
  });

  return <div ref={mapContainer} className="h-screen" />;
}
