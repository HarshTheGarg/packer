import { useState, useEffect } from "react";

import CardSet from "../components/CardSet";

const Attributes = () => {
    const [attributes, setAttributes] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const endpoint = import.meta.env.VITE_API_ENDPOINT;
            try {
                const response = await fetch(`${endpoint}/attributes`);
                const items = await response.json();
                setAttributes(items);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };
        fetchItems();
    }, []);

    return (
        <div className="home">
            <div className="header">
                <h1>Attributes</h1>
            </div>
            <CardSet attributes={attributes} setAttributes={setAttributes} />
        </div>
    );
};

export default Attributes;
