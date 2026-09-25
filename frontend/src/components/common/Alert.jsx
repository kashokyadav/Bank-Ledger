function Alert({ type = "error", children }) {

    // Define visual styles for each alert type.
    const styles = {
        error: {
            container: "border-red-200 bg-red-50 text-red-700",
            icon: "bg-red-100",
        },

        success: {
            container: "border-emerald-200 bg-emerald-50 text-emerald-700",
            icon: "bg-emerald-100",
        },

        warning: {
            container: "border-amber-200 bg-amber-50 text-amber-700",
            icon: "bg-amber-100",
        },

        info: {
            container: "border-blue-200 bg-blue-50 text-blue-700",
            icon: "bg-blue-100",
        },
    }

    // Use error styling if an unknown type is provided.
    const currentStyle =
        styles[type] || styles.error


    return (
        <div
            // role="alert" improves accessibility for important messages.
            role="alert"

            className={`
                flex
                w-full
                items-start
                gap-3
                rounded-xl
                border
                px-4
                py-3
                text-sm
                font-medium
                leading-5
                ${currentStyle.container}
            `}
        >

            {/* Small visual indicator for the alert. */}
            <span
                className={`
                    mt-1
                    h-2
                    w-2
                    shrink-0
                    rounded-full
                    ${currentStyle.icon}
                `}
            />

            {/* Alert message. */}
            <div className="min-w-0 flex-1 break-words">
                {children}
            </div>

        </div>
    )
}


export default Alert