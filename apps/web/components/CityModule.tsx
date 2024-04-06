import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "ui/components/ui/card";

import { Heart } from "lucide-react";

export default function CityModule({
  name,
  Icon,
  description = null,
  likeCount,
  isLiked = false,
  className = "",
  ...rest
}) {
  return (
    <Card
      {...rest}
      className={"shadow-md hover:bg-gray-100 hover:shadow-lg " + className}
    >
      <CardHeader>
        <CardTitle className="text-base">
          <div className="flex justify-between">
            <div className="flex flex-row items-center gap-2">
              {Icon && <Icon className="relative h-6 w-6" />}
              {name}
            </div>
            <div className="ml-4 flex gap-1">
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
