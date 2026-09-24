function Button({ children, type = "button", onClick, disabled = false }) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed cursor-pointer disabled:opacity-50"
        >
            {children}
        </button>
    )
}

export default Button