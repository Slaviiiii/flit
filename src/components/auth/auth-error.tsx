import { CircleAlert } from "lucide-react";

type AuthErrorProps = {
    message?: string;
}

export const AuthError = ({ message }: AuthErrorProps) => {
    if (!message) return null;

    return (
        <div className="w-full p-3 flex items-center gap-x-2.5 rounded-lg text-destructive dark:text-red-600 dark:bg-destructive/25 bg-destructive/15">
            <CircleAlert /> {message}
        </div>
    )
}