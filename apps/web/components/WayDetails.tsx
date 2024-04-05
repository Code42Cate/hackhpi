import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "ui/components/ui/accordion";

import { Heart } from "lucide-react";
import CityModule from "@/components/CityModule";
import CityModules from "@/components/CityModules";
import { useState } from "react";
import { Spot } from "./map";

import { cityModuleCategories, cityModules } from "@/data/cityModules";

export default function WayDetails({ selectedSpot }: { selectedSpot: Spot }) {
  let [treeState, setTreeState] = useState(false);

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
      <div className="mb-4 mt-6 flex">
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
