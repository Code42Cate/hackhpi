"use client";
import Map, { Spot } from "@/components/map";
import { useState } from "react";

export default function Page() {
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);

  return (
    <div className="relative flex h-screen flex-col items-center justify-center">
      <div className="w-full shadow-sm">
        <Map setSelectedSpot={setSelectedSpot} />
      </div>
      <div className="absolute right-0 h-screen w-96 rounded-l-lg bg-white p-4">
        <h1 className="text-4xl font-medium">Modules</h1>
        <pre>{JSON.stringify(selectedSpot, null, 2)}</pre>
      </div>
    </div>
  );
}
