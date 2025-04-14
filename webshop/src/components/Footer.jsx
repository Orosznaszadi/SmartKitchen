import { Link } from 'react-router-dom';
import '../App.css';

export default function Footer() {
    return (
        <footer className="bg-white py-8 text-center">
            <div>
                <img src="logo.jpg" alt="Smart Kitchen " className="w-40 mx-auto mb-4 rounded-3xl shadow-md" />
            </div>
            <p classNAme="text-gray-500 text-sm">&copy; 2025 Smart Kitchen. Minden jog fenntartva.</p>
        </footer>
    );
}
