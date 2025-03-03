
import { useContext } from 'react'
import { MiContexto } from '../../Context'
import { Marker } from "@react-google-maps/api"
import { iconMarker } from './iconMarker'

const ListMarker = ({ pedidos }) => {
	const context = useContext(MiContexto)

	return (
		<>
			{pedidos.map((pedido, index) => (
				<Marker
					key={index}
					position={pedido?.address?.coordinates}
					title='title'
					animation='DROP'
					label={`${pedido?.numeroDeOrdenDelDia}`}
					clickable={true}
					icon={iconMarker(pedido?.estado)}
					visible={true}
					onClick={() => {
						context.setIdItemSelect(pedido?.id)
					}}
				/>
			))}
		</>
	)
}

export default ListMarker