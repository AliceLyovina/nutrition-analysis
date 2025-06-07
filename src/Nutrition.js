export const Nutrition = ({ label, quantity, unit }) => {
    return (
        <div>
            <p className="el"><b>{label}</b> - {quantity.toFixed()} {unit}</p>
        </div>
    )
}