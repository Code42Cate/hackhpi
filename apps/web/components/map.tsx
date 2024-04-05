"use client";
import React, { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

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
      pitchWithRotate: true,
    });

    const el = document.createElement("div");
    el.className = "w-8 h-14 border border-red-500";

    // set marker
    new mapboxgl.Marker(el)
      .setLngLat([13.449106180576361, 52.51349867057073])
      .addTo(map.current);
  });

  return <div ref={mapContainer} className="h-screen" />;
}
