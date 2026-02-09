import { useState } from "react";

import Modal from "./Modal";
import AddOptionAttribute from "./attributes/AddOptionAttribute";
import AddNumericalAttribute from "./attributes/AddNumericalAttribute";
import AddBinaryAttribute from "./attributes/AddBinaryAttribute";

const AddAttributeModal = ({ isOpen, onClose, attributes, setAttributes }) => {
    const [error, setError] = useState("");

    // Common values
    const [attributeName, setAttributeName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [requires, setRequires] = useState([]);

    // Options specific values
    const [optionsList, setOptions] = useState([]);
    const [currentOption, setCurrentOption] = useState("");
    const [allowMultiple, setAllowMultiple] = useState(false);

    // Numerical specific values
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(100);
    const [unit, setUnit] = useState("Units");

    // Binary specific values
    const [trueLabel, setTrueLabel] = useState("Yes");
    const [falseLabel, setFalseLabel] = useState("No");

    const addToOptionsList = (e) => {
        e.preventDefault();
        setOptions([...optionsList, currentOption]);
        setCurrentOption("");
    };

    const submitForm = async (e) => {
        e.preventDefault();
        if (attributeName.trim() === "") {
            setError("Attribute name is required.");
            console.log(error);
            return;
        }

        if (type === "") {
            setError("Attribute type is required.");
            console.log(error);
            return;
        }

        const newAttribute = {
            name: attributeName,
            description,
            requires,
        };

        let response;

        if (type === "options") {
            newAttribute.options = optionsList;
            newAttribute.allowMultiple = allowMultiple;

            response = await fetch(
                `${import.meta.env.VITE_API_ENDPOINT}/select-attributes`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newAttribute),
                },
            );
        } else if (type === "numerical") {
            newAttribute.minValue = minValue;
            newAttribute.maxValue = maxValue;
            newAttribute.unit = unit;

            response = await fetch(
                `${import.meta.env.VITE_API_ENDPOINT}/numerical-attribute`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newAttribute),
                },
            );
        } else if (type === "binary") {
            newAttribute.trueLabel = trueLabel;
            newAttribute.falseLabel = falseLabel;

            response = await fetch(
                `${import.meta.env.VITE_API_ENDPOINT}/binary-attribute`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newAttribute),
                },
            );
        }

        if (!response.ok) {
            const errorData = await response.json();
            setError(errorData.message || "Failed to create attribute.");
            console.log(errorData);
            return;
        }

        const createdAttribute = await response.json();
        setAttributes([...attributes, createdAttribute]);

        onClose();
        console.log("New Attribute:", newAttribute);
        setAttributeName("");
        setDescription("");
        setType("");
        setRequires([]);
        setOptions([]);
        setCurrentOption("");
        setAllowMultiple(false);
        setMinValue(0);
        setMaxValue(100);
        setUnit("Units");
        setTrueLabel("Yes");
        setFalseLabel("No");
    };

    const requiredChange = (e) => {
        const value = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) {
            setRequires([...requires, value]);
        } else {
            setRequires(requires.filter((req) => req !== value));
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2>Add Attribute</h2>
            <form onSubmit={submitForm}>
                <div>
                    <label htmlFor="attributeName">Attribute Name:</label>
                    <input
                        id="attributeName"
                        type="text"
                        name="attributeName"
                        value={attributeName}
                        onChange={(e) => setAttributeName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        name="description"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="type">Type:</label>
                    <select
                        name="type"
                        id="type"
                        onChange={(e) => setType(e.target.value)}
                        value={type}
                    >
                        <option value="">Select</option>
                        <option value="options">Options</option>
                        <option value="numerical">Numerical</option>
                        <option value="binary">Binary</option>
                    </select>
                </div>

                <div>
                    <div>Attributes Required:</div>
                    {attributes.map((attribute) => (
                        <div key={attribute._id}>
                            <label htmlFor={attribute._id}>{attribute.name}</label>
                            <input
                                type="checkbox"
                                name="requires"
                                value={attribute._id}
                                id={attribute._id}
                                onChange={(e) => {
                                    requiredChange(e);
                                }}
                            />
                        </div>
                    ))}
                </div>

                {type === "options" && (
                    <AddOptionAttribute
                        currentOption={currentOption}
                        setCurrentOption={setCurrentOption}
                        optionsList={optionsList}
                        addToOptionsList={addToOptionsList}
                        allowMultiple={allowMultiple}
                        setAllowMultiple={setAllowMultiple}
                    />
                )}

                {type === "numerical" && (
                    <AddNumericalAttribute
                        minValue={minValue}
                        setMinValue={setMinValue}
                        maxValue={maxValue}
                        setMaxValue={setMaxValue}
                        unit={unit}
                        setUnit={setUnit}
                    />
                )}

                {type === "binary" && (
                    <AddBinaryAttribute
                        trueLabel={trueLabel}
                        falseLabel={falseLabel}
                        setTrueLabel={setTrueLabel}
                        setFalseLabel={setFalseLabel}
                    />
                )}

                <button type="submit">Add Attribute</button>
            </form>
        </Modal>
    );
};

export default AddAttributeModal;
