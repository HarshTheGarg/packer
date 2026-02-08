import { useState } from "react";

import Card from "./Card";
import AddItemModal from "./AddItemModal";
import AddAttributeModal from "./AddAttributeModal";

import "../css/cardset.css";

const CardSet = ({ items, attributes, setAttributes }) => {
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
                <AddAttributeModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    attributes={attributes}
                    setAttributes={setAttributes}
                />
            </>
        );
    }
};

export default CardSet;
