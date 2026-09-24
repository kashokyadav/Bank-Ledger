import Card from "./Card"

function StatCard({ title, value, valueClassName = "text-slate-800" }) {
    return (
        <Card>
            <p className="text-sm text-slate-500">
                {title}
            </p>

            <h2 className={`mt-2 text-2xl font-bold ${valueClassName}`}>
                {value}
            </h2>
        </Card>
    )
}

export default StatCard