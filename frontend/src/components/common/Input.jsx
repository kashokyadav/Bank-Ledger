function Input({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    name,
    error = "",
    disabled = false,
    required = false,
}) {

    return (
        <div className="flex w-full flex-col gap-2">

            {/* Input label. */}
            <label
                htmlFor={name}
                className="text-sm font-semibold text-slate-700"
            >
                {label}

                {/* Show required indicator when requested. */}
                {required && (
                    <span className="ml-1 text-red-500">
                        *
                    </span>
                )}
            </label>


            {/* Input field. */}
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                required={required}

                // Connect the input with its error message.
                aria-invalid={Boolean(error)}

                className={`
                    min-h-11
                    w-full
                    rounded-xl
                    border
                    bg-slate-50
                    px-4
                    py-3
                    text-sm
                    text-slate-800
                    outline-none
                    transition-all
                    duration-200
                    placeholder:text-slate-400
                    focus:bg-white
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                    ${
                        error
                            ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                            : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    }
                `}
            />


            {/* Display validation error when available. */}
            {error && (
                <p className="text-xs font-medium leading-5 text-red-600">
                    {error}
                </p>
            )}

        </div>
    )
}


export default Input