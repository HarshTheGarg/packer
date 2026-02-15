import { useState, useEffect } from "react";

import Modal from "./Modal";

const AddItemModal = ({ isOpen, onClose, setItems }) => {
    const [itemName, setItemName] = useState("");
    const [description, setDescription] = useState("");
    const [keywords, setKeywords] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [notes, setNotes] = useState("");
    const [selectedAttributes, setSelectedAttributes] = useState([]);

    const [error, setError] = useState("");

    const [selectedAttributesAndValues, setSelectedAttributesAndValues] =
        useState({});

    const submitForm = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        const newItem = {
            name: itemName,
            description,
            keywords,
            notes,
            attributes: selectedAttributes.map((attrId) => ({
                attribute: attrId,
                value: selectedAttributesAndValues[attrId],
            })),
            isPacked: false,
        };

        const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/item`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newItem),
        });
        if (!response.ok) {
            const errorData = await response.json();
            setError(errorData.message || "Failed to create item.");
            console.log(errorData);
            return;
        }

        const createdItem = await response.json();
        setItems((prevItems) => [...prevItems, createdItem]);

        // Reset form fields
        setItemName("");
        setDescription("");
        setKeywords([]);
        setKeyword("");
        setNotes("");
        setSelectedAttributes([]);
        setSelectedAttributesAndValues({});
        onClose();
    };

    const [attributes, setAttributes] = useState([]);
    useEffect(() => {
        const fetchAttributes = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_ENDPOINT}/attributes`,
                );
                const data = await response.json();
                setAttributes(data);
            } catch (error) {
                console.error("Error fetching attributes:", error);
            }
        };
        if (isOpen) {
            fetchAttributes();
        }
    }, [isOpen]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2>Add Item</h2>
            <form onSubmit={submitForm}>
                <div>
                    <label htmlFor="itemName">Item Name:</label>
                    <input
                        id="itemName"
                        type="text"
                        name="itemName"
                        required
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
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
                    <label htmlFor="keywords">Keywords:</label>
                    <input
                        id="keywords"
                        type="text"
                        name="keywords"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            if (keyword.trim() !== "") {
                                setKeywords([...keywords, keyword.trim()]);
                                setKeyword("");
                            }
                        }}
                    >
                        Add Keyword
                    </button>
                    {keywords.length > 0 && (
                        <ul>
                            {keywords.map((kw, index) => (
                                <li key={index}>{kw}</li>
                            ))}
                        </ul>
                    )}
                </div>
                <div>
                    <label htmlFor="notes">Notes:</label>
                    <textarea
                        name="notes"
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    ></textarea>
                </div>
                <div>
                    <label>Attributes:</label>
                    {attributes.length > 0 ? (
                        attributes.map((attr) => (
                            <div key={attr._id}>
                                <input
                                    type="checkbox"
                                    id={`attr-${attr._id}`}
                                    value={attr._id}
                                    checked={selectedAttributes.includes(attr._id)}
                                    onChange={(e) => {
                                        const attrId = e.target.value;
                                        if (e.target.checked) {
                                            setSelectedAttributes([...selectedAttributes, attrId]);
                                        } else {
                                            setSelectedAttributes(
                                                selectedAttributes.filter((id) => id !== attrId),
                                            );
                                            setSelectedAttributesAndValues((prev) => {
                                                const updated = { ...prev };
                                                delete updated[attrId];
                                                return updated;
                                            });
                                        }
                                    }}
                                />
                                <label htmlFor={`attr-${attr._id}`}>{attr.name}</label>

                                {selectedAttributes.includes(attr._id) &&
                                    attr.type === "BinaryAttribute" && (
                                        <div>
                                            <label htmlFor={`value-${attr._id}`}>Value:</label>
                                            <input
                                                type="radio"
                                                name={`value-${attr._id}`}
                                                id={`value-${attr._id}-${attr.truthyLabel}`}
                                                onChange={() => {
                                                    setSelectedAttributesAndValues({
                                                        ...selectedAttributesAndValues,
                                                        [attr._id]: attr.truthyLabel,
                                                    });
                                                }}
                                            />
                                            <label htmlFor={`value-${attr._id}-${attr.truthyLabel}`}>
                                                {attr.truthyLabel}
                                            </label>
                                            <input
                                                type="radio"
                                                name={`value-${attr._id}`}
                                                id={`value-${attr._id}-${attr.falsyLabel}`}
                                                onChange={() => {
                                                    setSelectedAttributesAndValues({
                                                        ...selectedAttributesAndValues,
                                                        [attr._id]: attr.falsyLabel,
                                                    });
                                                }}
                                            />
                                            <label htmlFor={`value-${attr._id}-${attr.falsyLabel}`}>
                                                {attr.falsyLabel}
                                            </label>
                                        </div>
                                    )}

                                {selectedAttributes.includes(attr._id) &&
                                    attr.type === "NumericalAttribute" && (
                                        <div>
                                            <label htmlFor={`value-${attr._id}`}>Value:</label>
                                            <input
                                                type="number"
                                                min={attr.min}
                                                max={attr.max}
                                                id={`value-${attr._id}`}
                                                onChange={(e) => {
                                                    setSelectedAttributesAndValues({
                                                        ...selectedAttributesAndValues,
                                                        [attr._id]: e.target.value,
                                                    });
                                                }}
                                            />
                                            <span>
                                                Min: {attr.min} Max:{attr.max}
                                            </span>
                                        </div>
                                    )}
                                {selectedAttributes.includes(attr._id) &&
                                    attr.type === "SelectAttribute" && (
                                        <div>
                                            <label htmlFor={`value-${attr._id}`}>Value:</label>
                                            <select
                                                id={`value-${attr._id}`}
                                                onChange={(e) => {
                                                    setSelectedAttributesAndValues({
                                                        ...selectedAttributesAndValues,
                                                        [attr._id]: e.target.value,
                                                    });
                                                }}
                                            >
                                                <option value="">Select an option</option>
                                                {attr.options.map((option, index) => (
                                                    <option key={index} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                            </div>
                        ))
                    ) : (
                        <p>No attributes available</p>
                    )}
                </div>
                <button type="submit">Add Item</button>
            </form>
            {error && <p className="error">{error}</p>}
        </Modal>
    );
};

export default AddItemModal;
