function Button({
    children,
    type = "button",
    onClick,
    disabled = false,
    variant = "primary",
    className = "",
}) {

    // Define the visual style for every supported button variant.
    const variants = {

        primary:
            "border border-blue-600 bg-blue-600 text-white shadow-sm shadow-blue-200 hover:border-blue-700 hover:bg-blue-700",

        secondary:
            "border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50",

        danger:
            "border border-red-600 bg-red-600 text-white shadow-sm shadow-red-200 hover:border-red-700 hover:bg-red-700",

        success:
            "border border-emerald-600 bg-emerald-600 text-white shadow-sm shadow-emerald-200 hover:border-emerald-700 hover:bg-emerald-700",

        ghost:
            "border border-transparent bg-transparent text-slate-600 hover:bg-slate-100",

    }


    return (
        <button
            // Keep the supplied button type.
            type={type}

            // Run the supplied click handler.
            onClick={onClick}

            // Disable the button when requested.
            disabled={disabled}

            // Combine common styles, selected variant and custom styles.
            className={`
                inline-flex
                min-h-11
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                px-4
                py-3
                text-sm
                font-semibold
                leading-5
                transition-all
                duration-200
                active:scale-[0.98]
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:ring-offset-2
                disabled:cursor-not-allowed
                disabled:pointer-events-none
                disabled:opacity-50
                sm:w-auto
                ${variants[variant] || variants.primary}
                ${className}
            `}
        >
            {children}
        </button>
    )
}


export default Button