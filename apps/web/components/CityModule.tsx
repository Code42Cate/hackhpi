import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "ui/components/ui/card";

import {
    Button
} from "ui/components/ui/button";

import { Heart } from "lucide-react";

export default function CityModule({ name, Icon, description = null, likeCount, isLiked = false }) {
    return (
        <Card className="shadow-md hover:shadow-lg hover:bg-gray-100 cursor-pointer">
            <CardHeader>
                <CardTitle className="text-md">
                    <div className="flex justify-between">
                        <div className="flex gap-2">
                            {Icon && <Icon className="h-6 w-6 relative top-[2px]" />}
                            {name}
                        </div>
                        <div className="flex gap-2">
                            <Heart fill={isLiked ? "red" : "none"} className="h-6 w-6 top-[-5px]" />
                            {likeCount + ' '}
                        </div>
                    </div>

                </CardTitle>
            </CardHeader>
            {description && <CardContent>{description}</CardContent>
            }
        </Card >
    );
}
