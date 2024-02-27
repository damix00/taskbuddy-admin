"use client";

import { login } from "@/actions/auth";
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginFormSchema } from "@/schemas/login_form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as zod from "zod";

export default function LoginForm() {
    const form = useForm<zod.infer<typeof LoginFormSchema>>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Log in</CardTitle>
                <CardDescription>
                    Log into your account to access the dashboard.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <div className="space-y-2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="example@latinary.com"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            placeholder="********"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </Form>
            </CardContent>
            <CardFooter>
                <Button
                    onClick={form.handleSubmit(async (data) => {
                        const result = await login(data.email, data.password);

                        if (!result.success) {
                            form.setError("email", {
                                type: "manual",
                                message: "Invalid email or password",
                            });

                            form.setError("password", {
                                type: "manual",
                                message: "Invalid email or password",
                            });
                        }
                    })}
                    className="w-full">
                    Log in
                </Button>
            </CardFooter>
        </Card>
    );
}
