import PropTypes from 'prop-types';
import { Modal, Button } from "react-bootstrap";

const ReusableModal = ({ show, handleClose, title, children }) => {
	return (
		<Modal show={show} onHide={handleClose} >
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{children}
			</Modal.Body>
			<Modal.Footer>
				<Button className="btn-secondary" onClick={handleClose}>Cerrar</Button>
			</Modal.Footer>
		</Modal>
	);
};

ReusableModal.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

export default ReusableModal;
