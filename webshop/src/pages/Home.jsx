

import { useEffect, useState } from 'react';


function Home() {
    const [menuData, setMenuData] = useState({});
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('/menuData.json')
            .then(res => res.json())
            .then(data => setMenuData(data));
    }, []);

    const addToCart = (item) => {
        setCart(prevCart => {
            const existing = prevCart.find(cartItem => cartItem.id === item.id);
            if (existing) {
                return prevCart.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    };

    const increaseQuantity = (id) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantity = (id) => {
        setCart(prevCart =>
            prevCart
                .map(item =>
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter(item => item.quantity > 0) // ha 0, törlés
        );
    };

    const removeItem = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="flex">

            <div className="flex-1 p-6 max-w-7xl mx-auto space-y-12">
                <h1 className="text-4xl font-bold mb-8">Étlap</h1>
                {Object.entries(menuData).map(([category, items]) => (
                    <section key={category}>
                        <h2 className="text-3xl font-bold mb-6">{category}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {items.map((item, index) => (
                                <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
                                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="object-cover h-full w-full"
                                            />
                                        ) : (
                                            <span className="text-gray-500">Nincs kép</span>
                                        )}
                                    </div>
                                    <div className="p-4 text-center flex-grow flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold">{item.name}</h3>
                                            <p className="text-sm text-gray-500">{item.price} Ft</p>
                                        </div>
                                        <button
                                            onClick={() => addToCart(item)}
                                            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                        >
                                            Kosárba
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            {/* Kosár oldalsáv */}
            <div className="w-60 bg-gray-100 p-6 border-l border-gray-300">
                <h2 className="text-2xl font-bold mb-4">🛒 Kosár</h2>
                {cart.length === 0 ? (
                    <p className="text-gray-500">A kosár üres.</p>
                ) : (
                    <ul className="space-y-4">
                        {cart.map((item) => (
                            <li key={item.id} className="border-b pb-3">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-sm text-gray-500">
                                            {item.quantity} × {item.price} Ft
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold">{item.price * item.quantity} Ft</p>
                                        <div className="flex justify-end mt-1 space-x-1">
                                            <button
                                                className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                                                onClick={() => decreaseQuantity(item.id)}
                                            >
                                                −
                                            </button>
                                            <button
                                                className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                                                onClick={() => increaseQuantity(item.id)}
                                            >
                                                +
                                            </button>
                                            <button
                                                className="px-2 py-1 text-sm bg-red-200 text-red-700 rounded hover:bg-red-300"
                                                onClick={() => removeItem(item.id)}
                                            >
                                                x
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                {cart.length > 0 && (
                    <div className="mt-6 border-t pt-4 text-right">
                        <p className="text-lg font-bold">Összesen: {totalPrice} Ft</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
