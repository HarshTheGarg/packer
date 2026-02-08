const AddOptionAttribute = ({
    currentOption,
    setCurrentOption,
    optionsList,
    addToOptionsList,
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
                    value={currentOption}
                    onChange={(e) => {
                        setCurrentOption(e.target.value);
                    }}
                />
                <button onClick={addToOptionsList}>Add Option</button>
                {optionsList.length > 0 && (
                    <ul>
                        {optionsList.map((opt, index) => (
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
