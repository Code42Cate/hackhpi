"use client";
import React, { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxDraw from "@mapbox/mapbox-gl-draw"; // eslint-disable-line import/no-webpack-loader-syntax
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiY29kZTQyY2F0ZSIsImEiOiJjbHU5MG15NzEwNGJpMmpta2gzNWMxazFqIn0.DmdGNtsf_SCeRxqEDlt0UQ";

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(13.449106180576361);
  const [lat, setLat] = useState(52.51349867057073);
  const [zoom, setZoom] = useState(16);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/standard",
      center: [lng, lat],
      zoom: zoom,
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
      map.current.addSource("parkingspot0", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [13.448435173048354, 52.51399535732365],
                [13.448388420543562, 52.514022845002046],
                [13.448336913371245, 52.51397655009469],
                [13.448393967273294, 52.51395340257737],
                [13.448435173048354, 52.51399535732365],
              ],
            ],
          },
        },
      });

      // Add a new layer to visualize the polygon.
      map.current.addLayer({
        id: "parkingspot0",
        type: "fill",
        source: "parkingspot0", // reference the data source
        layout: {},
        paint: {
          "fill-color": "#0080ff", // blue color fill
          "fill-opacity": 0.3,
        },
      });

      map.current.addLayer({
        id: "outline",
        type: "line",
        source: "parkingspot0",
        layout: {},
        paint: {
          "line-color": "#0080ff",
          "line-width": 2,
          "line-opacity": 0.8,
        },
      });
    });
  });

  return <div ref={mapContainer} className="h-screen" />;
}
