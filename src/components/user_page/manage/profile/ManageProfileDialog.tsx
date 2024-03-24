"use client";

import { updatePublicProfile } from "@/actions/management/user/profile";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogButton,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { UserContext } from "@/context/user_context";
import { undoToast } from "@/lib/toast";
import { X } from "lucide-react";
import { useContext, useState } from "react";

function EditProfilePicture({ onRemove }: { onRemove?: () => void }) {
    const context = useContext(UserContext);
    const [removed, setRemoved] = useState(false);

    if (removed || !context?.user?.profile.profile_picture) {
        return (
            <Avatar className="w-16 h-16">
                <AvatarFallback>
                    {context?.user?.user.first_name[0]}
                    {context?.user?.user.last_name[0]}
                </AvatarFallback>
            </Avatar>
        );
    }

    return (
        <div className="flex flex-row gap-2 items-center">
            <img
                src={context?.user!.profile.profile_picture}
                alt="Profile picture"
                className="w-16 h-16 rounded-full"
            />
            <Button
                variant="outline"
                size="iconSm"
                onClick={() => {
                    setRemoved(true);
                    if (onRemove) onRemove();
                }}>
                <X className="w-4 h-4" />
            </Button>
        </div>
    );
}

export default function ManageProfileDialog() {
    const context = useContext(UserContext);
    const [open, setOpen] = useState(false);

    const [firstName, setFirstName] = useState(context?.user?.user.first_name);
    const [lastName, setLastName] = useState(context?.user?.user.last_name);
    const [username, setUsername] = useState(context?.user?.user.username);
    const [bio, setBio] = useState(context?.user?.profile.bio);
    const [profilePicture, setProfilePicture] = useState(
        context?.user?.profile.profile_picture
    );

    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Edit</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Edit the first name, last name, username and profile
                        picture.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col py-4 gap-4">
                    <EditProfilePicture
                        onRemove={() => setProfilePicture("")}
                    />
                    <div className="flex flex-row gap-2 flex-wrap lg:flex-nowrap">
                        <div className="flex-col">
                            <Label htmlFor="first_name">First name</Label>
                            <Input
                                id="first_name"
                                placeholder="John"
                                defaultValue={context?.user?.user.first_name}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="flex-col">
                            <Label htmlFor="last_name">Last name</Label>
                            <Input
                                id="last_name"
                                placeholder="Doe"
                                defaultValue={context?.user?.user.last_name}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            placeholder="john_doe"
                            defaultValue={context?.user?.user.username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                            className="min-h-10"
                            id="bio"
                            placeholder={'e.g. "I\'m a software engineer."'}
                            defaultValue={context?.user?.profile.bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogButton
                        disabled={loading}
                        variant="default"
                        onClick={async () => {
                            if (!context || !context.user) return;

                            setLoading(true);

                            const oldData = {
                                first_name: context!.user!.user.first_name,
                                last_name: context!.user!.user.last_name,
                                username: context!.user!.user.username,
                                bio: context!.user!.profile.bio,
                                profile_picture:
                                    context!.user!.profile.profile_picture,
                            };

                            const data = await updatePublicProfile({
                                user_id: context!.user!.user.id,
                                profile_id: context!.user!.profile.id,
                                first_name: firstName!,
                                last_name: lastName!,
                                username: username!,
                                bio: bio!,
                                profile_picture: profilePicture!,
                            });

                            setLoading(false);

                            if (!data) {
                                toast({
                                    title: "Failed to update profile",
                                    description:
                                        "An error occurred while updating the profile.",
                                    variant: "destructive",
                                });
                                return;
                            }

                            undoToast({
                                toast,
                                title: "Profile updated",
                                description: "This profile has been updated.",
                                undoAction: async (data) => {
                                    await updatePublicProfile(data);

                                    context.setData({
                                        ...context.user,
                                        user: {
                                            ...context.user!.user,
                                            first_name: data.first_name,
                                            last_name: data.last_name,
                                            username: data.username,
                                        },
                                        profile: {
                                            ...context.user!.profile,
                                            bio: data.bio,
                                            profile_picture:
                                                data.profile_picture,
                                        },
                                    });
                                },
                                undoParams: {
                                    user_id: context!.user!.user.id,
                                    profile_id: context!.user!.profile.id,
                                    ...oldData,
                                },
                            });

                            setOpen(false);

                            context.setData({
                                ...context.user,
                                user: {
                                    ...context.user!.user,
                                    first_name: firstName!,
                                    last_name: lastName!,
                                    username: username!,
                                },
                                profile: {
                                    ...context.user!.profile,
                                    bio: bio!,
                                    profile_picture: profilePicture!,
                                },
                            });
                        }}>
                        Save
                    </DialogButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
