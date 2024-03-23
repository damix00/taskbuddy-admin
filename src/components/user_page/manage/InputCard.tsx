"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InputCard({
    title,
    description,
    initialValue = "",
    placeholder = "",
    type = "text",
    onClick,
    buttonText = "Save",
}: {
    title: string;
    description: string;
    initialValue?: string;
    placeholder?: string;
    type?: string;
    onClick: () => void;
    buttonText?: string;
}) {
    return (
        <div className="flex flex-row flex-wrap gap-2">
            <Card>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Label htmlFor="newInput">{title}</Label>
                    <Input
                        name="hidden"
                        type={type}
                        id="newInput"
                        placeholder={placeholder}
                        defaultValue={initialValue}
                        autoComplete="false"
                    />
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={onClick}>
                        {buttonText}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
