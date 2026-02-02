const AddOptionAttribute = ({
    option,
    setOption,
    options,
    addOption,
    allowMultiple,
    setAllowMultiple,
}) => {
    return (
        <div>
            <div>
                <label htmlFor="option">Option:</label>
                <input
                    type="text"
                    name="option"
                    id="option"
                    value={option}
                    onChange={(e) => {
                        setOption(e.target.value);
                    }}
                />
                <button onClick={addOption}>Add Option</button>
                {options.length > 0 && (
                    <ul>
                        {options.map((opt, index) => (
                            <li key={index}>{opt}</li>
                        ))}
                    </ul>
                )}
            </div>
            <div>
                <label htmlFor="allowMultiple">Allow Multiple Selections:</label>
                <input
                    type="checkbox"
                    name="allowMultiple"
                    id="allowMultiple"
                    checked={allowMultiple}
                    onChange={(e) => setAllowMultiple(e.target.checked)}
                />
            </div>
        </div>
    );
};
export default AddOptionAttribute;
