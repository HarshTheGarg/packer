import { useState, useEffect } from "react";

import "../css/home.css";
import CardSet from "../components/CardSet";

const Home = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const endpoint = import.meta.env.VITE_API_ENDPOINT;
            try {
                const response = await fetch(`${endpoint}/items`);
                const items = await response.json();
                setItems(items);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };
        fetchItems();
    }, []);

    return (
        <div className="home">
            <div className="header">
                <h1>Items</h1>
            </div>
            <div className="filters">Filters</div>
            <CardSet items={items} />
        </div>
    );
};

export default Home;
