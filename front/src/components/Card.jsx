import "../css/card.css";

const Card = ({ isAddNew = false, onClick, cardType, ...props }) => {
    return (
        <div
            className="card"
            onClick={() => {
                onClick();
            }}
        >
            {isAddNew ? (
                <h2>Add New {cardType}</h2>
            ) : (
                <>
                    {cardType === "item" && (
                        <>
                            <h2>{props.item.name}</h2>
                            {props.item.attributes &&
                                props.item.attributes.length > 0 &&
                                props.item.attributes.map((attr) => {
                                    return (
                                        <p key={attr._id}>
                                            {attr.attribute.name}: {attr.value}
                                        </p>
                                    );
                                })}
                        </>
                    )}
                    {cardType === "attribute" && (
                        <>
                            <h2>{props.attribute.name}</h2>
                            <p>{props.attribute.type}</p>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Card;
