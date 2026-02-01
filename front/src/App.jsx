import { Route, Routes } from "react-router-dom";
import Hero from "./components/Hero.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Attributes from "./pages/Attributes.jsx";

import "./css/app.css";

function App() {
    return (
        <>
            <Hero />
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/attributes" element={<Attributes />} />
            </Routes>
        </>
    );
}

export default App;
