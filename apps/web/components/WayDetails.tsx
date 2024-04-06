"use client";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "ui/components/ui/accordion";
import { Button } from "ui/components/ui/button";
import CityModule from "@/components/CityModule";
import CityModules from "@/components/CityModules";
import { Spot } from "./map";

import { cityModuleCategories, cityModules } from "@/data/cityModules";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { likeSpot } from "@/lib/actions";
import { useRouter } from "next/navigation";

export default function WayDetails({ selectedSpot }: { selectedSpot: Spot }) {
  let noMostVoted = 3;
  let mostVoted = Object.keys(cityModules)
    .sort((a, b) => cityModules[b].likeCount - cityModules[a].likeCount)
    .slice(0, noMostVoted);
  const router = useRouter();

  const router = useRouter();

  return (
    <div>
      <h1 className="mb-6 flex flex-row gap-2 text-3xl font-bold">
        <Button
          variant="outline"
          className="md:hidden"
          onClick={() => {
            router.push("/");
          }}
        >
          <XIcon className="h-6 w-6" />
        </Button>

        {selectedSpot.streetname}
      </h1>
      <div>
        <h2 className="text-2xl">Most Popular</h2>
        <div className="mb-2 mt-6">
          <div className="flex flex-wrap gap-2">
            {/* <CityModules> */}
            {mostVoted
              .map((m) => cityModules[m])
              .map((cityModule) => (
                <CityModule
                  className="shrink-0"
                  key={`${cityModule.name}--most-voted`}
                  polygonId={selectedSpot.likes.Id}
                  likeCountKey={cityModule.likeCountKey}
                  name={cityModule.name}
                  likeCount={selectedSpot.likes[cityModule.likeCountKey]}
                  Icon={cityModule.Icon}
                />
              ))}
          </div>
          {/* </CityModules> */}
        </div>
      </div>
      <h2 className="mt-8 text-2xl">Vote here</h2>
      <Accordion type="multiple" className="mt-6 w-full">
        {Object.values(cityModuleCategories).map((category) => (
          <AccordionItem value={category.name} key={category.name}>
            <AccordionTrigger>
              <category.icon className="h-5 w-5" />
              {category.name}
            </AccordionTrigger>

            <AccordionContent>
              <CityModules>
                {category.modules
                  .map((m) => cityModules[m])
                  .map((cityModule) => (
                    <CityModule
                      className="cursor-pointer"
                      key={`${cityModule.name}--${category.name}`}
                      name={cityModule.name}
                      description={cityModule.description}
                      likeCount={selectedSpot.likes[cityModule.likeCountKey]}
                      Icon={cityModule.Icon}
                      onClick={async () => {
                        await likeSpot(
                          selectedSpot.likes.Id,
                          cityModule.likeCountKey,
                        );
                        router.refresh();
                      }}
                    />
                  ))}
              </CityModules>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
