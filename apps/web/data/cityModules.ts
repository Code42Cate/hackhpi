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
} from "lucide-react";

export const cityModuleCategories = {
  greenery: {
    name: "Greenery",
    modules: ["tree", "flower-bed"],
    icon: Trees,
  },
  "primary-care": {
    name: "Primary care",
    modules: ["drink-fountain", "public-toilet"],
    icon: Droplets,
  },
  mobility: {
    name: "Mobility",
    modules: [],
    icon: Bike,
  },
  community: {
    name: "Community",
    modules: [],
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
  "drink-fountain": {
    name: "Drink Fountain",
    likeCount: 12,
    Icon: GlassWater,
    likeCountKey: "DrinkFountainLikeCount",
    description: "A drinking fountain to quench the thirst.",
  },
  "public-toilet": {
    name: "Public Toilet",
    likeCount: 2,
    Icon: Droplet,
    likeCountKey: "PublicToiletLikeCount",
    description: "A public toilet for the community.",
  },
};
