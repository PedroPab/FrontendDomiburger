import { OverlayTrigger, Tooltip } from "react-bootstrap";

const DisabledComponent = ({ children, message }) => {
	return (
		<OverlayTrigger
			placement="top"
			overlay={<Tooltip>{message}</Tooltip>}
		>
			{/* El span envuelve el botón para que reciba el evento hover */}
			<span className="d-inline-block">
				{children}
			</span>
		</OverlayTrigger>

	)
}

export { DisabledComponent }