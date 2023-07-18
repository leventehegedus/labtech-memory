
const Card = ({ card, isActive, isCleared, onClick }: { card: number; isActive: boolean; isCleared: boolean; onClick: () => void }) => {
    return (
        <div
            key={card}
            className={`memory-card ${isActive ? 'active' : ''} ${isCleared ? 'cleared' : ''}`}
            onClick={onClick}
        >
            {(isActive || isCleared) && Math.floor(card / 2)}
        </div>
    );
};

export default Card;