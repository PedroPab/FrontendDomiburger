import { Alert } from "react-bootstrap";

const CommentInfoCard = ({ comment }) => {
	return (
		<>
			{comment &&
				<Alert variant="warning">
					{comment}
				</Alert>
			}
		</>
	);
}

export { CommentInfoCard };