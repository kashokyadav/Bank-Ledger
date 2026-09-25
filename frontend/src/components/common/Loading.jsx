function Loading({
    text = "Loading...",
}) {

    return (
        <div
            // Accessible loading status.
            role="status"

            className="
                flex
                w-full
                items-center
                justify-center
                gap-3
                py-10
            "
        >

            {/* Animated loading spinner. */}
            <span
                className="
                    h-5
                    w-5
                    animate-spin
                    rounded-full
                    border-2
                    border-slate-200
                    border-t-blue-600
                "
            />

            {/* Loading message. */}
            <p className="text-sm font-medium text-slate-500">
                {text}
            </p>

        </div>
    )
}


export default Loading