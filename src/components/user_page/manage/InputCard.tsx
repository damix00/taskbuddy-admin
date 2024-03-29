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
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";

export enum InputType {
    INPUT,
    TEXTAREA,
}

type InputProps = {
    label: string;
    initialValue: any;
    placeholder: string;
    type: string;
    inputType?: InputType;
};

export default function InputCard({
    title,
    description,
    onClick,
    buttonText = "Save",
    inputs,
    btnDisabled = false,
}: {
    title: string;
    description: string;
    onClick: (values: any[]) => void;
    buttonText?: string;
    inputs: InputProps[];
    btnDisabled?: boolean;
}) {
    const values = useRef(inputs.map((input) => input.initialValue));
    const [active, setActive] = useState(false);

    return (
        <Card className="w-fit h-fit">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                {inputs.map(({ label, type, placeholder, initialValue }, i) => {
                    let Element: any = Input;

                    if (inputs[i].inputType === InputType.TEXTAREA) {
                        Element = Textarea;
                    }

                    return (
                        <div key={label} className="space-y-1">
                            <Label htmlFor="newInput">{label}</Label>
                            <Element
                                onChange={(e: any) => {
                                    values.current[i] = e.target.value;
                                    let shouldActivate = false;

                                    for (
                                        let j = 0;
                                        j < values.current.length;
                                        j++
                                    ) {
                                        console.log(
                                            values.current[j],
                                            inputs[j].initialValue
                                        );
                                        if (
                                            values.current[j] !=
                                            inputs[j].initialValue
                                        ) {
                                            if (!active) {
                                                setActive(true);
                                            }
                                            shouldActivate = true;
                                            break;
                                        }
                                    }

                                    if (!shouldActivate) {
                                        setActive(false);
                                    }
                                }}
                                name="hidden"
                                type={type}
                                id="newInput"
                                placeholder={placeholder}
                                defaultValue={initialValue}
                                autoComplete="false"
                            />
                        </div>
                    );
                })}
            </CardContent>
            <CardFooter>
                <Button
                    disabled={btnDisabled}
                    variant={active ? "default" : "outline"}
                    className="w-full"
                    onClick={() => {
                        onClick(values.current);
                        setActive(false);
                    }}>
                    {buttonText}
                </Button>
            </CardFooter>
        </Card>
    );
}
