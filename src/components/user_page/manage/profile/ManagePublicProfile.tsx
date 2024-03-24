"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { UserContext } from "@/context/user_context";
import { X } from "lucide-react";
import { useContext, useState } from "react";
import ManageProfileDialog from "./ManageProfileDialog";

function ProfileAvatar() {
    const context = useContext(UserContext);

    if (!context?.user?.profile.profile_picture) {
        return (
            <Avatar className="w-28 h-28 lg:w-16 lg:h-16">
                <AvatarFallback>
                    {context?.user?.user.first_name[0]}
                    {context?.user?.user.last_name[0]}
                </AvatarFallback>
            </Avatar>
        );
    }

    return (
        <Dialog>
            <DialogTrigger>
                <Avatar className="w-28 h-28 lg:w-16 lg:h-16">
                    <AvatarImage src={context?.user?.profile.profile_picture} />
                    <AvatarFallback>
                        {context?.user?.user.first_name[0]}
                        {context?.user?.user.last_name[0]}
                    </AvatarFallback>
                </Avatar>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Profile picture</DialogTitle>
                </DialogHeader>
                <div className="flex justify-center items-center">
                    <img
                        src={context?.user?.profile.profile_picture}
                        alt="Profile picture"
                        className="h-full w-auto max-h-[75vw]"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default function ManagePublicProfile() {
    const context = useContext(UserContext);

    return (
        <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-4">
            <div className="flex flex-col gap-2 w-full lg:w-fit">
                <div className="flex flex-col gap-2 lg:gap-4 lg:flex-row items-center truncate">
                    <ProfileAvatar />
                    <div className="flex flex-row items-center gap-2 lg:gap-4 truncate">
                        <div className="flex flex-col gap-0.5 truncate">
                            <h1 className="text font-bold truncate">
                                {context?.user?.user.first_name}{" "}
                                {context?.user?.user.last_name}
                            </h1>
                            <p className="text-sm text-muted-foreground truncate">
                                @{context?.user?.user.username}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start">
                    <div className="font-bold">Biography</div>
                    <div className="text-muted-foreground whitespace-pre-wrap">
                        {context?.user?.profile.bio}
                    </div>
                </div>
            </div>
            <ManageProfileDialog />
        </div>
    );
}
