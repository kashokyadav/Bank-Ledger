function Card({ children, className = "" }) {
    return (
        <div
            className={`
                rounded-2xl
                border border-slate-200/80
                bg-white
                p-5
                shadow-[0_4px_20px_rgba(15,23,42,0.04)]
                transition-shadow
                duration-200
                hover:shadow-[0_8px_30px_rgba(15,23,42,0.06)]
                sm:p-6
                ${className}
            `}
        >
            {children}
        </div>
    )
}

export default Card