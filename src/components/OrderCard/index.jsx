 
// OrderCard.js
import { useContext } from "react";
import { Card, Badge } from "react-bootstrap";
import { CardHeader } from "./CardHeader";
import { ResumenProductos } from "./ResumenProductos";
import { ProductoList } from "./ProductoList";
import { TotalPrecio } from "./TotalPrecio";
import { ListButtonModalPedido } from "./ListButtonModalPedido";
import { MiContexto } from "../../Context";
import { listaEstados } from "../../Utils/listEstados";
import { formatTimeString } from "../../Utils/formatTime";
import CopiableText from "./CopiableText";
import { usePreferences } from "../../Context/PreferencesContext";

const OrderCard = ({ dataPedido }) => {
  useContext(MiContexto);
  const { roleSelect } = usePreferences()
  const indexEstado = listaEstados.findIndex(e => e.name === dataPedido?.estado);
  const objEstado = listaEstados[indexEstado];
  const colorEstado = objEstado?.color;
  const urlAdress = encodeURIComponent(dataPedido?.address.address_complete);


  const origin = dataPedido?.origin
  let colorCard = false
  if (origin?.name == 'formClient') {
    colorCard = `alert alert-warning`
  }

  return (
    <Card
      className={`mb-3 shadow-sm mt-3 ${colorCard}`}
      style={{
        width: "100%",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
      }}
    >
      <Card.Body style={{ padding: "16px 20px" }}>
        <CardHeader
          title={dataPedido?.name}
          orden={dataPedido?.numeroDeOrdenDelDia}
          horaCreate={formatTimeString(dataPedido?.date)}
          horaPronostico={formatTimeString({
            ...dataPedido?.date,
            _seconds:
              dataPedido?.date._seconds +
              (dataPedido?.duracionEstimada?.value * 60 || 0),
          })}
          urlMap={`https://www.google.com/maps/dir/?api=1&destination=${urlAdress}`}
          urlPhone={`tel:${dataPedido?.phone}`}
        />
        <hr className="my-3" style={{ borderColor: "#e0e0e0" }} />
        <div className="mb-3">
          <CopiableText
            text={
              dataPedido?.address.direccionIput ||
              dataPedido?.address.address_complete
            }
          />
        </div>
        {dataPedido?.note && (
          <div className="mb-3 text-muted" style={{ fontSize: "0.9rem" }}>
            {dataPedido?.note}
          </div>
        )}
        <ResumenProductos listProducts={dataPedido?.order} />
        <ProductoList productos={dataPedido?.order} />
        <TotalPrecio
          listProducts={dataPedido?.orden}
          totalPrecio={dataPedido?.priceTotal.priceTotal}
          fee={dataPedido?.fee}
          yaPago={dataPedido?.pagoConfirmado?.confirmado}
        />
      </Card.Body>
      <Card.Footer
        className=""
        style={{
          borderTop: "1px solid #e0e0e0",
          padding: "10px 20px",
        }}
      >
        <ListButtonModalPedido dataPedido={dataPedido} role={roleSelect} />
      </Card.Footer>
      <Badge
        pill
        bg=""
        className="position-absolute top-0 start-50 translate-middle"
        style={{
          backgroundColor: colorEstado,
          color: "#000",
          fontSize: "0.85rem",
          padding: "5px 10px",
        }}
      >
        {dataPedido?.estado}
      </Badge>
    </Card>
  );
};

export default OrderCard;
export { OrderCard };
