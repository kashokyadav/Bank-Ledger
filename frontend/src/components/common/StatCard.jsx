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

            {/* Card content layout. */}
            <div className="flex min-w-0 items-start justify-between gap-4">

                {/* Text section. */}
                <div className="min-w-0 flex-1">

                    {/* Statistic title. */}
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 sm:text-sm sm:normal-case sm:tracking-normal sm:text-slate-500">
                        {title}
                    </p>


                    {/* Statistic value. */}
                    <h2
                        className={`
                            mt-2
                            truncate
                            text-2xl
                            font-bold
                            tracking-tight
                            sm:text-3xl
                            ${valueClassName}
                        `}
                    >
                        {value}
                    </h2>


                    {/* Optional description. */}
                    {description && (
                        <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-400 sm:text-sm">
                            {description}
                        </p>
                    )}

                </div>


                {/* Statistic icon. */}
                {icon && (
                    <div
                        className="
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-blue-100
                            bg-blue-50
                            text-blue-600
                            transition-transform
                            duration-200
                            group-hover:scale-105
                        "
                    >
                        {icon}
                    </div>
                )}

            </div>

        </Card>
    )
}


export default StatCard