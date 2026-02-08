const AddNumericalAttribute = ({
    minValue,
    setMinValue,
    maxValue,
    setMaxValue,
    unit,
    setUnit,
}) => {
    return (
        <div>
            <div>
                <label>Min value</label>
                <input
                    type="number"
                    name="minValue"
                    value={minValue}
                    onChange={(e) => {
                        setMinValue(e.target.value);
                    }}
                />
            </div>
            <div>
                <label>Max Value</label>
                <input
                    type="number"
                    name="maxValue"
                    value={maxValue}
                    onChange={(e) => {
                        setMaxValue(e.target.value);
                    }}
                />
            </div>
            <div>
                <label>Unit</label>
                <input
                    type="text"
                    name="unit"
                    value={unit}
                    onChange={(e) => {
                        setUnit(e.target.value);
                    }}
                />
            </div>
        </div>
    );
};

export default AddNumericalAttribute;
