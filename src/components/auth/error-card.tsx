import { CircleAlert } from "lucide-react"
import { CardWrapper } from "./card-wrapper"


export const ErrorCard = () => {
    return (
        <CardWrapper
            title="Something went wrong!"
            label="Try singing in again"
            backButtonLabel="Go back to Sign in"
            backButtonHref="/auth/sign-in"
            showSocials={false}
        >
            <div className="flex justify-center">
                <CircleAlert size={29} />
            </div>
        </CardWrapper>
    )
}