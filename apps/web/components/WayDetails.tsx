import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "ui/components/ui/accordion";

import {
    Heart,
    Flower,
    TreeDeciduous,
    Trees,
    Droplets,
    Bike,
    FerrisWheel,
    GlassWater,
    Droplet,
} from "lucide-react";
import CityModule from "@/components/CityModule";
import CityModules from "@/components/CityModules";
import { useState } from "react";
import { Spot } from "./map";

export default function WayDetails({ selectedSpot }: { selectedSpot: Spot }) {
    let [treeState, setTreeState] = useState(false);

    let cityModuleCategories = {
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
    let cityModules = {
        tree: {
            name: "Trees",
            likeCount: 52,
            isLiked: treeState,
            Icon: TreeDeciduous,
            description:
                "Plant a tree that spends shadow and improves the air quality.",
        },
        "flower-bed": {
            name: "Flower Bed",
            likeCount: 22,
            Icon: Flower,
            description: "Plant a flower bed and give insects a home.",
        },
        "drink-fountain": {
            name: "Drink Fountain",
            likeCount: 12,
            Icon: GlassWater,
            description: "A drinking fountain to quench the thirst.",
        },
        "public-toilet": {
            name: "Public Toilet",
            likeCount: 2,
            Icon: Droplet,
            description: "A public toilet for the community.",
        },
    };
    let noMostVoted = 3;
    let mostVoted = Object.keys(cityModules)
        .sort((a, b) => cityModules[b].likeCount - cityModules[a].likeCount)
        .slice(0, noMostVoted);

    return (
        <div>
            <h1 className="mb-6 text-3xl font-bold">{selectedSpot.streetname}</h1>
            <div>
                <h2 className="text-2xl">Most Popular</h2>
                <div className="mb-2 mt-6">
                    <CityModules>
                        {mostVoted
                            .map((m) => cityModules[m])
                            .map((cityModule) => (
                                <CityModule
                                    name={cityModule.name}
                                    likeCount={cityModule.likeCount}
                                    Icon={cityModule.icon}
                                />
                            ))}
                    </CityModules>
                </div>
            </div>
            <div className="flex mt-6 mb-4">
                <h2 className="mr-2 text-xl">Your Votes</h2>
                {[...Array(5)].map((_, i) => (
                    <Heart
                        className="relative top-[4px] h-5 w-5"
                        key={"unused-heart-" + i}
                    />
                ))}
            </div>
            <Accordion type="single" collapsible className="w-full">
                {Object.values(cityModuleCategories).map((category) => (
                    <AccordionItem value={category.name}>
                        <AccordionTrigger>
                            <category.icon className="h-4 w-4" />
                            {category.name}
                        </AccordionTrigger>

                        <AccordionContent>
                            <CityModules>
                                <div onClick={() => [] /* TODO */}>
                                    {category.modules
                                        .map((m) => cityModules[m])
                                        .map((cityModule) => (
                                            <CityModule
                                                name={cityModule.name}
                                                description={cityModule.description}
                                                likeCount={cityModule.likeCount}
                                                Icon={cityModule.icon}
                                            />
                                        ))}
                                </div>
                            </CityModules>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
