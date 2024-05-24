const AuthLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="flex items-center justify-center w-full px-5 pt-16">
            {children}
        </div>
    )
}

export default AuthLayout;