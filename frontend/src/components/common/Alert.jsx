function Alert({ type = "error", children }) {

    const styles = {
        error: "bg-red-50 text-red-600",
        success: "bg-green-50 text-green-600",
        warning: "bg-amber-50 text-amber-600",
        info: "bg-blue-50 text-blue-600",
    }

    return (
        <div
            className={`rounded-lg px-4 py-3 text-sm ${styles[type]}`}
        >
            {children}
        </div>
    )
}

export default Alert