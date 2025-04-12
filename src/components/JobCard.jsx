import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const JobCard = ({ role, roleData, isSelected, onSelect }) => {
	return (
		<Card
			className={`job-card shadow-sm border-0 text-center h-100 ${isSelected ? "selected-card" : ""
				}`}
		>
			<Card.Body className="d-flex flex-column align-items-center justify-content-center p-4">
				<Card.Title className="job-title mb-3">
					{roleData.name.toUpperCase()}
				</Card.Title>
				<Link to={`/${roleData.name}`}>
					<Button
						variant={isSelected ? "primary" : "outline-primary"}
						onClick={() => onSelect(role)}
						className="w-100"
					>
						{isSelected ? "Seleccionado" : "Ver más"}
					</Button>
				</Link>
			</Card.Body>
		</Card>
	);
};

export default JobCard;
