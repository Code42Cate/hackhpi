import { Polygon } from "database";
import {
  Flower,
  TreeDeciduous,
  Trees,
  Droplets,
  Bike,
  FerrisWheel,
  GlassWater,
  Droplet,
  LucideIcon,
  BikeIcon,
  Book,
  Drumstick,
} from "lucide-react";

export const cityModuleCategories = {
  greenery: {
    name: "Greenery",
    modules: ["tree", "flower-bed"],
    icon: Trees,
  },
  mobility: {
    name: "Mobility",
    modules: ["bikes"],
    icon: Bike,
  },
  community: {
    name: "Community",
    modules: ["bbq", "books"],
    icon: FerrisWheel,
  },
};

export const cityModules: Record<
  string,
  {
    name: string;
    likeCount: number;
    Icon: LucideIcon;
    likeCountKey: keyof Omit<Polygon, "Id">;
    description: string;
  }
> = {
  tree: {
    name: "Trees",
    likeCount: 52,
    Icon: TreeDeciduous,
    likeCountKey: "TreesLikeCount",
    description:
      "Plant a tree that spends shadow and improves the air quality.",
  },
  "flower-bed": {
    name: "Flower Bed",
    likeCount: 22,
    likeCountKey: "FlowersLikeCount",
    Icon: Flower,
    description: "Plant a flower bed and give insects a home.",
  },
  bbq: {
    name: "BBQ",
    likeCount: 12,
    Icon: Drumstick,
    likeCountKey: "BBQLikeCount",
    description: "A drinking fountain to quench the thirst.",
  },
  bikes: {
    name: "Bikes",
    likeCount: 2,
    Icon: BikeIcon,
    likeCountKey: "BikesLikeCount",
    description: "A public toilet for the community.",
  },
  books: {
    name: "Books",
    likeCount: 2,
    Icon: Book,
    likeCountKey: "BooksLikeCount",
    description: "A public toilet for the community.",
  },
};
