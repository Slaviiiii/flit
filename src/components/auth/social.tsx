import { Button } from "@/components/ui/button";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export const Social = () => {
    return (
        <div className="flex items-center w-full gap-x-2">
            <Button
                size={"lg"}
                variant={"outline"}
                className="w-full"
            >
                <FcGoogle size={20} />
            </Button>
            <Button
                size={"lg"}
                variant={"outline"}
                className="w-full"
            >
                <FaGithub size={20} />
            </Button>
        </div>
    )
}