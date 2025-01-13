import { Link } from "react-router-dom";

export default function NavLink({ to, text, className = "" }) {
	return (
		<div>
			<Link
				to={to}
				className={`nav-link hover:bg-white/10 px-4 py-2 rounded text-white font-semibold transition-all duration-300 ${className}`}
			>
				{text}
			</Link>
		</div>
	);
}