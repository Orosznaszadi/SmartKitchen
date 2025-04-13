import { Link } from 'react-router-dom';
import '../App.css';

export default function Footer() {
    return (
        <footer class="bg-white py-8 text-center">
            <div>
                <img src="logo.jpg" alt="Smart Kitchen " class="w-40 mx-auto mb-4 rounded-3xl shadow-md" />
            </div>
            <p class="text-gray-500 text-sm">&copy; 2025 Smart Kitchen. Minden jog fenntartva.</p>
        </footer>
    );
}
