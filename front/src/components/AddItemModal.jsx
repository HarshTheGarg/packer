import Modal from "./Modal";

const AddItemModal = ({ isOpen, onClose }) => {
    const submitForm = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2>Add Item</h2>
            <form onSubmit={submitForm}>
                <div>
                    <label htmlFor="itemName">Item Name:</label>
                    <input id="itemName" type="text" name="itemName" required />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea name="description" id="description"></textarea>
                </div>
                <button type="submit">Add Item</button>
            </form>
        </Modal>
    );
};

export default AddItemModal;
