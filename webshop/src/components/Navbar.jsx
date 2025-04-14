import { Link } from 'react-router-dom';
import '../App.css';
export default function Navbar() {
    return (
        <nav className="bg-green-600 text-white p-4 flex space-x-6">
            <Link to="/">Főoldal</Link>
            <Link to="/about">Rólunk</Link>
            <Link to="/contact">Kapcsolat</Link>
        </nav>
    );
}
