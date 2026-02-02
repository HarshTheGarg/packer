import { useState } from "react";

import Modal from "./Modal";

const AddItemModal = ({ isOpen, onClose }) => {
    const [itemName, setItemName] = useState("");
    const [description, setDescription] = useState("");

    const submitForm = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        alert(`Item Added: ${itemName}\nDescription: ${description}`);
    };

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
                <button type="submit">Add Item</button>
            </form>
        </Modal>
    );
};

export default AddItemModal;
