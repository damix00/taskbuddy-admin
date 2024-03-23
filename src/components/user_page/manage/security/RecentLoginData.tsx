"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { RecentLogin } from "./types";
import { timeAgo } from "@/utils/utils";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    deleteLogin,
    logoutOfAllDevices,
} from "@/actions/management/user/security";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useContext, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { UserContext } from "@/context/user_context";

function convertUserAgent(userAgent: string) {
    // split by / and get the first part
    return userAgent.split("/")[0];
}

function RecentLoginItem({
    login,
    onDelete,
}: {
    login: RecentLogin;
    onDelete: (id: number) => any;
}) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    return (
        <div className="flex flex-row justify-between items-center w-full gap-2">
            <div key={login.id} className="flex flex-row gap-2 items-center">
                <div className="text-sm">{timeAgo(login.date)}</div>
                <div className="text-sm text-muted-foreground">{login.ip}</div>
                <div className="text-sm text-muted-foreground">
                    {convertUserAgent(login.userAgent)}
                </div>
            </div>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                    <Button variant="outline" size="iconSm">
                        <X className="w-4 h-4" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete login</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this login?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button
                            disabled={loading}
                            onClick={async () => {
                                setLoading(true);

                                const res = await deleteLogin({
                                    loginId: login.id,
                                });

                                setLoading(false);
                                setOpen(false);

                                if (!res) {
                                    toast({
                                        title: "Error",
                                        description:
                                            "An error occurred while deleting the login.",
                                        variant: "destructive",
                                    });

                                    return;
                                }

                                toast({
                                    title: "Success",
                                    description: "Login deleted successfully.",
                                });

                                onDelete(login.id);
                            }}>
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

function LogoutAllSessions({ onLogout }: { onLogout?: () => any }) {
    const context = useContext(UserContext);
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger>
                <Button variant="outline" className="w-full">
                    Log out all sessions
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Log out all sessions</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to log out of all sessions?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                        disabled={loading}
                        onClick={async () => {
                            setLoading(true);

                            if (!context?.user) return;

                            const res = await logoutOfAllDevices({
                                userId: context?.user!.user.id,
                            });

                            setOpen(false);
                            setLoading(false);

                            if (!res) {
                                toast({
                                    title: "Error",
                                    description:
                                        "An error occurred while logging out of all sessions.",
                                    variant: "destructive",
                                });

                                return;
                            }

                            toast({
                                title: "Success",
                                description:
                                    "Logged out of all sessions successfully.",
                            });

                            if (onLogout) onLogout();
                        }}>
                        Log out
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default function RecentLoginData({ logins }: { logins: RecentLogin[] }) {
    const [loginData, setLoginData] = useState(logins);

    return (
        <Card className="w-fit h-fit max-w-72 lg:max-w-none">
            <CardHeader>
                <CardTitle>Logins</CardTitle>
                <CardDescription>
                    Recent logins to the user's account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {loginData.length === 0 && (
                    <div className="text-sm text-muted-foreground">
                        No recent logins
                    </div>
                )}
                <ScrollArea className="flex flex-col gap-2 max-h-[100px] h-fit">
                    <ScrollBar orientation="horizontal" />
                    <ScrollBar orientation="vertical" />
                    {loginData.map((login, index) => (
                        <>
                            <RecentLoginItem
                                login={login}
                                onDelete={(id) => {
                                    setLoginData(
                                        loginData.filter(
                                            (login) => login.id !== id
                                        )
                                    );
                                }}
                            />
                            {index !== logins.length - 1 && (
                                <Separator className="my-2" />
                            )}
                        </>
                    ))}
                </ScrollArea>
            </CardContent>
            <CardFooter>
                <LogoutAllSessions
                    onLogout={() => {
                        setLoginData([]);
                    }}
                />
            </CardFooter>
        </Card>
    );
}
