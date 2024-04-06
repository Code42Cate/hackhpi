import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "ui/components/ui/card";

import { Heart } from "lucide-react";
import { likeSpot } from "@/lib/actions";
import { useRouter } from "next/navigation";

export default function CityModule({
  name,
  likeCountKey,
  Icon,
  description = null,
  polygonId,
  likeCount,
  isLiked = false,
}) {
  const router = useRouter();

  return (
    <Card
      className="cursor-pointer shadow-md hover:bg-gray-100 hover:shadow-lg"
      onClick={async () => {
        await likeSpot(polygonId, likeCountKey);
        router.refresh();
      }}
    >
      <CardHeader>
        <CardTitle className="text-base">
          <div className="flex justify-between">
            <div className="flex flex-row items-center gap-2">
              {Icon && <Icon className="relative h-6 w-6" />}
              {name}
            </div>
            <div className="flex gap-2">
              <Heart
                fill={isLiked ? "red" : "none"}
                className="top-[-5px] h-6 w-6"
              />
              {likeCount + " "}
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      {description && <CardContent>{description}</CardContent>}
    </Card>
  );
}
