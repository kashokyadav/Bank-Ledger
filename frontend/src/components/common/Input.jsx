function Input({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    name,
}) {
    return (
        <div className="flex flex-col gap-2">
            <label
                htmlFor={name}
                className="text-sm font-medium text-slate-700"
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
                className="rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
        </div>
    )
}

export default Input