function Button({
    children,
    type = "button",
    onClick,
    disabled = false,
    variant = "primary",
}) {

    const variants = {
        primary:
            "bg-blue-600 text-white shadow-sm shadow-blue-200 hover:bg-blue-700",

        secondary:
            "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",

        danger:
            "bg-red-600 text-white shadow-sm shadow-red-200 hover:bg-red-700",

        success:
            "bg-emerald-600 text-white shadow-sm shadow-emerald-200 hover:bg-emerald-700",

        ghost:
            "bg-transparent text-slate-600 hover:bg-slate-100",
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                flex
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
                transition-all
                duration-200
                active:scale-[0.98]
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:ring-offset-2
                disabled:cursor-not-allowed
                disabled:opacity-50
                ${variants[variant]}
            `}
        >
            {children}
        </button>
    )
}

export default Button