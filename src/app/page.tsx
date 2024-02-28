import LoginForm from "@/components/auth/LoginForm";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function Login() {
    return (
        <main>
            <div className="flex items-center justify-center min-h-screen py-4">
                <LoginForm />
            </div>
        </main>
    );
}
