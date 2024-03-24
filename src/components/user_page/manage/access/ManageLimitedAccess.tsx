"use client";

import { updateLimitedAccess } from "@/actions/management/user/access";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { UserContext } from "@/context/user_context";
import { PlusCircle } from "lucide-react";
import { useContext, useState } from "react";

function SaveButton({ active }: { active: boolean }) {
    const context = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button
                    variant={active ? "default" : "outline"}
                    className="w-full"
                    disabled={loading}>
                    Save
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Limit access</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to update the user's limited
                        access?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                        onClick={async () => {
                            setLoading(true);

                            const res = await updateLimitedAccess({
                                userId: context!.user!.user.id,
                                limitedAccess:
                                    context!.user!.user.limited_access,
                            });

                            setOpen(false);
                            setLoading(false);

                            if (!res) {
                                toast({
                                    title: "Error updating limited access",
                                    description:
                                        "Something went wrong updating the user's limited access. Please try again later.",
                                    variant: "destructive",
                                });
                                return;
                            }

                            toast({
                                title: "Limited access updated",
                                description:
                                    "The user's limited access has been updated successfully.",
                            });
                        }}>
                        Confirm
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

type LimitedAccessItem = {
    key: string;
    label: string;
};

export default function ManageLimitedAccess() {
    const context = useContext(UserContext);
    const [active, setActive] = useState(false);

    const onChange = () => {
        if (!active) {
            setActive(true);
        }
    };

    const items: LimitedAccessItem[] = [
        { key: "suspended", label: "Suspended" },
        { key: "disabled_premium", label: "Disable buying premium" },
        { key: "disabled_listing", label: "Disabled listing" },
        { key: "disabled_chat", label: "Disabled chat" },
    ];

    return (
        <Card className="w-fit h-fit max-w-80">
            <CardHeader>
                <CardTitle>Limited access</CardTitle>
                <CardDescription>
                    Limit what the user can/cannot do in the application.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="flex flex-row flex-wrap gap-2">
                    {context?.user?.user.limited_access.map((access) => (
                        <Badge key={access} variant="outline">
                            {access}
                        </Badge>
                    ))}
                    {context?.user?.user.limited_access.length === 0 && (
                        <div className="text-muted-foreground text-sm">
                            No limited access
                        </div>
                    )}
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className="flex flex-row gap-2">
                            <PlusCircle size={16} />
                            Add limited access
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuGroup>
                            {items.map((item) => (
                                <DropdownMenuCheckboxItem
                                    key={item.key}
                                    checked={context?.limitedAccess.isEnabled(
                                        item.key
                                    )}
                                    onCheckedChange={(checked) => {
                                        context?.limitedAccess.setEnabled(
                                            item.key,
                                            checked
                                        );

                                        onChange();
                                    }}>
                                    {item.label}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardContent>
            <CardFooter>
                <SaveButton active={active} />
            </CardFooter>
        </Card>
    );
}
