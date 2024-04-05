import Map from "@/components/map";

export default function Page() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="w-full max-w-4xl shadow-sm">
        <Map />
      </div>
    </div>
  );
}
