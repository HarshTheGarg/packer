import { useState } from "react";

import Card from "./Card";
import Modal from "./Modal";
import AddItemModal from "./AddItemModal";

import "../css/cardset.css";

const CardSet = ({ items, attributes }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    if (items !== undefined) {
        return (
            <>
                <div className="card-set">
                    {items.map((item) => (
                        <Card key={item._id} props={item} />
                    ))}
                    <Card isAddNew={true} onClick={openModal} thingToAdd="item" />
                </div>
                <AddItemModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </>
        );
    } else if (attributes !== undefined) {
        return (
            <>
                <div className="card-set">
                    {attributes.map((attribute) => (
                        <Card key={attribute._id} props={attribute} />
                    ))}
                    <Card isAddNew={true} onClick={openModal} thingToAdd="attribute" />
                </div>
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <h2>Add Attribute</h2>
                </Modal>
            </>
        );
    }
};

export default CardSet;
