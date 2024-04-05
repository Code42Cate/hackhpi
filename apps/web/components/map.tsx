"use client";
import React, { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxDraw from "@mapbox/mapbox-gl-draw"; // eslint-disable-line import/no-webpack-loader-syntax
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiY29kZTQyY2F0ZSIsImEiOiJjbHU5MG15NzEwNGJpMmpta2gzNWMxazFqIn0.DmdGNtsf_SCeRxqEDlt0UQ";

export default function Map({
  setSelectedSpot,
}: {
  setSelectedSpot: (spot: string) => void;
}) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/standard",
      center: [13.4394958, 52.518519],
      zoom: 18,
      antialias: true,
      dragRotate: true,
      dragPan: true,
      touchPitch: true,
      pitch: 30,
      pitchWithRotate: true,
    });

    const el = document.createElement("div");
    el.className = "w-8 h-14 border border-red-500";
    const Draw = new MapboxDraw();

    map.current.addControl(Draw, "top-left");

    map.current.on("load", () => {
      map.current.addSource("parkingspots", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [13.4394958, 52.518519],
                [13.4394149, 52.5185354],
                [13.439405, 52.5185173],
                [13.4394859, 52.5185009],
                [13.4394958, 52.518519],
              ],
            ],
          },
        },
      });

      // Add a new layer to visualize the polygon.
      map.current.addLayer({
        id: "parkingspots",
        type: "fill",
        source: "parkingspots", // reference the data source
        layout: {},
        paint: {
          "fill-color": "#0080ff", // blue color fill
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

      map.current.on("mouseenter", "parkingspots", () => {
        map.current.getCanvas().style.cursor = "pointer";
      });

      // Change the cursor back to a pointer
      // when it leaves the states layer.
      map.current.on("mouseleave", "parkingspots", () => {
        map.current.getCanvas().style.cursor = "";
      });

      map.current.on("click", "parkingspots", (e) => {
        setSelectedSpot(e.lngLat.toString());
      });
    });
  });

  return <div ref={mapContainer} className="h-screen" />;
}
