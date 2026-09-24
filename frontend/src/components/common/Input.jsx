function Input({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    name,
    error = "",
}) {
    return (
        <div className="flex flex-col gap-2">

            <label
                htmlFor={name}
                className="text-sm font-semibold text-slate-700"
            >
                {label}
            </label>

            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`
                    w-full
                    rounded-xl
                    border
                    bg-slate-50
                    px-4
                    py-3
                    text-sm
                    text-slate-800
                    outline-none
                    transition
                    placeholder:text-slate-400
                    focus:bg-white
                    focus:ring-4
                    ${
                        error
                            ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                            : "border-slate-200 focus:border-blue-500 focus:ring-blue-50"
                    }
                `}
            />

            {error && (
                <p className="text-xs font-medium text-red-600">
                    {error}
                </p>
            )}

        </div>
    )
}

export default Input