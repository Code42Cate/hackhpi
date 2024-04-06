"use client";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "ui/components/ui/accordion";

import CityModule from "@/components/CityModule";
import CityModules from "@/components/CityModules";
import { Spot } from "./map";

import { cityModuleCategories, cityModules } from "@/data/cityModules";

export default function WayDetails({ selectedSpot }: { selectedSpot: Spot }) {
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
                  key={`${cityModule.name}--most-voted`}
                  polygonId={selectedSpot.likes.Id}
                  likeCountKey={cityModule.likeCountKey}
                  name={cityModule.name}
                  likeCount={selectedSpot.likes[cityModule.likeCountKey]}
                  Icon={cityModule.Icon}
                />
              ))}
          </CityModules>
        </div>
      </div>
      <Accordion type="single" collapsible className="mt-4 w-full">
        {Object.values(cityModuleCategories).map((category) => (
          <AccordionItem value={category.name} key={category.name}>
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
                        key={`${cityModule.name}--${category.name}`}
                        polygonId={selectedSpot.likes.Id}
                        likeCountKey={cityModule.likeCountKey}
                        name={cityModule.name}
                        description={cityModule.description}
                        likeCount={selectedSpot.likes[cityModule.likeCountKey]}
                        Icon={cityModule.Icon}
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
