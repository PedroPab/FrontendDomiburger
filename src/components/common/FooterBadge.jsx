import { Badge } from 'react-bootstrap';

const FooterBadge = ({ color, children }) => {
	return (
		<Badge
			bg=""
			style={{
				backgroundColor: color,
				color: "white",
				fontSize: "0.85rem",
				padding: "5px 10px",
			}}
		>
			{children}
		</Badge>
	);
};

export { FooterBadge };
