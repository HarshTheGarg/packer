const AddBinaryAttribute = ({
    trueLabel,
    falseLabel,
    setTrueLabel,
    setFalseLabel,
}) => {
    return (
        <div>
            <div>
                <label htmlFor="trueLabel">True Label:</label>
                <input
                    type="text"
                    name="trueLabel"
                    id="trueLabel"
                    value={trueLabel}
                    onChange={(e) => {
                        setTrueLabel(e.target.value);
                    }}
                />
            </div>
            <div>
                <label htmlFor="falseLabel">False Label:</label>
                <input
                    type="text"
                    name="falseLabel"
                    id="falseLabel"
                    value={falseLabel}
                    onChange={(e) => setFalseLabel(e.target.value)}
                />
            </div>
        </div>
    );
};

export default AddBinaryAttribute;
