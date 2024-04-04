"use client";
import React, { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  "pk.eyJ1IjoiY29kZTQyY2F0ZSIsImEiOiJjbHU5MG15NzEwNGJpMmpta2gzNWMxazFqIn0.DmdGNtsf_SCeRxqEDlt0UQ";

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(8.40444);
  const [lat, setLat] = useState(49.00937);
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
    });

    const el = document.createElement("div");
    el.className = "w-8 h-8 bg-red-500 rounded-full";

    // set marker
    new mapboxgl.Marker(el)
      .setLngLat([8.409056081007058, 49.00927741395377])
      .addTo(map.current);
  });

  return (
    <div
      ref={mapContainer}
      className="h-[500px] overflow-hidden rounded-2xl border"
    />
  );
}
