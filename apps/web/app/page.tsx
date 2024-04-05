import Map from "@/components/map";

export default function Page() {
  return (
    <div className="relative flex h-screen flex-col items-center justify-center">
      <div className="w-full shadow-sm">
        <Map />
      </div>
      <div className="absolute right-0 h-screen w-96 rounded-l-lg bg-white p-4">
        <h1 className="text-4xl font-medium">Modules</h1>
      </div>
    </div>
  );
}
