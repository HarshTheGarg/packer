import "../css/navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <div className="navBar">
                <div className="tab">
                    <Link to="/">Items</Link>
                </div>
                <div className="tab">
                    <Link to="/attributes">Attributes</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
