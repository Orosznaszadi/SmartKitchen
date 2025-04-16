import React, { useEffect, useState } from "react";

const gridSize = 10;
let score = 0;
const restaurant = { x: 0, y: 0 };

const getRandomDeliveryPoint = () => {
    const x = Math.floor(Math.random() * (gridSize - 1)) + 1;
    const y = Math.floor(Math.random() * (gridSize - 1)) + 1;
    return { x, y };
};

const generatePath = (from, to) => {
    const path = new Set();
    let x = from.x;
    let y = from.y;
    path.add(`${x},${y}`);

    while (x !== to.x || y !== to.y) {
        if (Math.random() < 0.5) {
            if (x < to.x) x++;
            else if (x > to.x) x--;
        } else {
            if (y < to.y) y++;
            else if (y > to.y) y--;
        }
        path.add(`${x},${y}`);
    }
    return path;
};

const FoodDeliveryGame = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [hasFood, setHasFood] = useState(false); // Kezdetben nincs étel
    const [score, setScore] = useState(0);
    const [delivery, setDelivery] = useState(null); // Kezdetben nincs ház
    const [path, setPath] = useState(new Set());
    const [timeLeft, setTimeLeft] = useState(60);
    const [isDelivering, setIsDelivering] = useState(false);

    useEffect(() => {
        if (isDelivering && delivery) {
            const newPath = generatePath(restaurant, delivery); // fix: útvonal mindig a konyhától induljon
            setPath(newPath);
        }
    }, [isDelivering, delivery]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleKeyDown = (e) => {
        setPosition((prev) => {
            const newPos = { ...prev };
            if (e.key === "ArrowUp" && prev.y > 0) newPos.y--;
            if (e.key === "ArrowDown" && prev.y < gridSize - 1) newPos.y++;
            if (e.key === "ArrowLeft" && prev.x > 0) newPos.x--;
            if (e.key === "ArrowRight" && prev.x < gridSize - 1) newPos.x++;

            // Ha épp kiszállítás alatt vagyunk és letér az útról:


            return newPos;
        });
    };

    useEffect(() => {
        if (isDelivering && !path.has(`${position.x},${position.y}`)) {
            setScore( score - 1)
        }
    }, [position, isDelivering, path]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [path, isDelivering]);

    useEffect(() => {
        // Pickup food (csak ha visszaér a konyhához)
        if (
            position.x === restaurant.x &&
            position.y === restaurant.y &&
            !hasFood &&
            !isDelivering
        ) {
            setHasFood(true);
            setIsDelivering(true); // Most, hogy van étel, elindulhat a kiszállítás
            const newDelivery = getRandomDeliveryPoint();
            setDelivery(newDelivery); // Új célpont
            setPath(generatePath(restaurant, newDelivery)); // Új útvonal a konyhától a házig
        }

        // Deliver food
        if (
            isDelivering &&
            hasFood &&
            position.x === delivery.x &&
            position.y === delivery.y
        ) {
            setHasFood(false); // Ételt kézbesítette
            setIsDelivering(false); // Kiszállítás vége
            setPath(new Set()); // Az útvonal eltűnik
            const distance = Math.abs(delivery.x - restaurant.x) + Math.abs(delivery.y - restaurant.y);
            setScore((s) => s + distance); // Pontszám növelése a távolsággal
            setDelivery(null); // Kiszállítás befejeződött, nincs ház
        }
    }, [position, hasFood, isDelivering, delivery]);

    const getCellContent = (x, y) => {
        if (x === position.x && y === position.y) {
            return (
                <img
                    src={
                        !path.has(`${position.x},${position.y}`) && isDelivering
                            ? "images/delivery_food_red.png"  // ha rossz cellán vagyunk, piros ikon és még szállítunk
                            : hasFood
                                ? "images/delivery_food.png"    // ha van étel
                                : isDelivering
                                    ? "images/delivery_empty.png"    // ha kiszállítottuk és szállítunk
                                    : "images/delivery_empty.png"    // ha nincs étel (visszatértünk az étteremhez)
                    }
                    alt="Futár"
                    className="w-8 h-8"
                />
            );
        } else if (x === restaurant.x && y === restaurant.y) {
            return <img src="images/restaurant.png" alt="Restaurant" className="w-8 h-8" />;
        } else if (delivery && x === delivery.x && y === delivery.y && isDelivering) {
            return <img src="images/house.png" alt="House" className="w-8 h-8" />;
        }
        return null;
    };

    const renderGrid = () => {
        const rows = [];
        for (let y = 0; y < gridSize; y++) {
            const cols = [];
            for (let x = 0; x < gridSize; x++) {
                cols.push(
                    <div
                        key={x}
                        className={`w-10 h-10 border flex items-center justify-center ${
                            path.has(`${x},${y}`) ? "bg-gray-400" : ""
                        }`}
                    >
                        {getCellContent(x, y)}
                    </div>
                );
            }
            rows.push(
                <div key={y} className="flex">
                    {cols}
                </div>
            );
        }
        return rows;
    };

    const restartGame = () => {
        const initialDelivery = getRandomDeliveryPoint();
        const initialPath = generatePath(restaurant, initialDelivery);
        setPosition({ x: 0, y: 0 });
        setHasFood(true);
        setScore(0);
        setDelivery(initialDelivery);
        setPath(initialPath);
        setTimeLeft(60);
        setIsDelivering(true);
    };

    return (
        <div className="flex justify-center items-center h-screen w-screen">
            <div className="p-4 w-500">
                <h1 className="text-2xl font-bold mb-2">Food Delivery Game</h1>
                <p className={`mb-1`}>Pontszám: {score}</p>
                <p className="mb-3">Hátralévő idő: {timeLeft} mp</p>
                {timeLeft > 0 ? (
                    <div>{renderGrid()}</div>
                ) : (
                    <div className="text-center">
                        <div className="text-red-500 font-bold text-xl mb-4">
                            ⏱️ Idő lejárt! Végső pontszám: {score}
                        </div>
                        <button
                            onClick={restartGame}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                            Játék újra indítása
                        </button>
                    </div>


                )}
                <p className="mt-4">Használj nyíl billentyűket a mozgáshoz.</p>
            </div>
        </div>
    );
};

export default FoodDeliveryGame;
