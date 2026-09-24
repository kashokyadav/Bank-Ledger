import Card from "./Card"

function StatCard({
    title,
    value,
    icon,
    description,
    valueClassName = "text-slate-900",
}) {
    return (
        <Card className="group">

            <div className="flex items-start justify-between gap-4">

                <div className="min-w-0">

                    <p className="text-sm font-medium text-slate-500">
                        {title}
                    </p>

                    <h2
                        className={`
                            mt-2
                            truncate
                            text-2xl
                            font-bold
                            tracking-tight
                            ${valueClassName}
                        `}
                    >
                        {value}
                    </h2>

                    {description && (
                        <p className="mt-2 text-xs text-slate-400">
                            {description}
                        </p>
                    )}

                </div>

                {icon && (
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition duration-200 group-hover:scale-105">
                        {icon}
                    </div>
                )}

            </div>

        </Card>
    )
}

export default StatCard