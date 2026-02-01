import "../css/card.css";

const Card = ({ isAddNew = false, onClick, thingToAdd, props }) => {
    return (
        <div
            className="card"
            onClick={() => {
                onClick();
            }}
        >
            {isAddNew ? (
                <h2>Add New {thingToAdd}</h2>
            ) : (
                <>
                    <h2>{props.name}</h2>
                    <p>{props._id}</p>
                </>
            )}
        </div>
    );
};

export default Card;
