/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from "react";
import { Col } from "react-bootstrap";
// import { listaEstados } from "../../Utils/listEstados";
import {listStatusRecepcion} from "../../Utils/listStatus";
// import { OrderCard } from "../../components/OrderCard";
import { RecepcionContexto } from "../../Context/RecepcionContex";
import { BsInbox } from "react-icons/bs";
import { FaExpand } from "react-icons/fa";
import { OrderCardV2 } from "../OrderCardV2";

export const ColsPedidos = ({ pedidos }) => {
  const { domiciliarioIdFilter } = useContext(RecepcionContexto);
  const [filteredPedidos, setFilteredPedidos] = useState(pedidos);
  const [collapsedStates, setCollapsedStates] = useState([]);

  useEffect(() => {
    // Filtrar los pedidos según el filtro del contexto
    if (domiciliarioIdFilter === "ninguno") {
      setFilteredPedidos(pedidos.filter(pedido => !pedido?.domiciliario_asignado));
    } else if (domiciliarioIdFilter) {
      setFilteredPedidos(
        pedidos.filter(pedido => pedido?.domiciliario_asignado?.id === domiciliarioIdFilter)
      );
    } else {
      setFilteredPedidos(pedidos);
    }
  }, [domiciliarioIdFilter, pedidos]);

  useEffect(() => {
    // Inicializar las columnas como colapsadas si no tienen pedidos
    const initialStates = listStatusRecepcion.map((estado) => {
    console.log("🚀 ~ initialStates ~ estado:", estado)

      const pedidosEnEstado = filteredPedidos.filter(
        pedido => pedido.status == estado.name
      );
      return pedidosEnEstado.length === 0; // Mantener colapsado si ya estaba colapsado o no hay pedidos
    });
    setCollapsedStates(initialStates);
  }, [filteredPedidos]);

  const toggleCollapse = index => {
    console.log("🚀 ~ ColsPedidos ~ index:", index)
    setCollapsedStates(prev =>{
      
      console.log("🚀 ~ ColsPedidos ~ prev:", prev)
     return prev.map((isCollapsed, i) => {
        return (i === index ? !isCollapsed : isCollapsed)
      })}
    );
  };


  const estadosPedidos = listStatusRecepcion.map(estado => {
    const icon = estado.icon
      ? React.cloneElement(estado.icon, { style: { color: estado.color } })
      : <BsInbox style={{ color: estado.color }} />;

    return {
      name: estado.name,
      pedidos: filteredPedidos.filter(pedido => pedido.status === estado.name),
      icon: icon
    };
  });

  return (
    <>
      {estadosPedidos.map((estado, index) => {
        const isCollapsed = collapsedStates[index];

        const pedidosCount = estado.pedidos.length;

        // Determinación de colores
        let badgeColor = "bg-secondary"; // Default color (sin pedidos)
        if (pedidosCount > 0) {
          badgeColor = isCollapsed ? "bg-warning" : "bg-success"; // Amarillo si está colapsada, verde si expandida
        }

        return (
          <Col
            key={index}
            className="d-flex flex-column align-items-center"
            style={{
              width: isCollapsed ? "10rem" : "30rem",
              transition: "all 0.3s ease",
              padding: "10px",
            }}
          >
            {/* Título */}
            <div
              className={`d-flex ${isCollapsed ? "flex-column text-center" : "justify-content-between"
                } align-items-center w-100`}
              style={{
                cursor: "pointer",
                borderBottom: "1px solid #ddd",
                padding: "10px 0",
              }}
              onClick={() => toggleCollapse(index)}
            >
              {/* Ícono */}
              <span
                style={{
                  fontSize: "1.5rem",
                  marginBottom: isCollapsed ? "5px" : "0",
                }}
              >
                {estado.icon}
              </span>

              {/* Nombre del estado */}
              {!isCollapsed && (
                <span
                  className="text-center"
                  style={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                >
                  {estado.name}
                </span>
              )}

              {/* Cantidad de pedidos */}
              <span
                className={`badge ${badgeColor}`}
                style={{
                  fontSize: "0.9rem",
                  marginTop: isCollapsed ? "5px" : "0",
                }}
              >
                {pedidosCount}
              </span>
            </div>

            {/* Contenido */}
            <div
              className="d-flex flex-column align-items-center"
              style={{
                height: isCollapsed ? "100px" : "auto",
                overflow: isCollapsed ? "hidden" : "auto",
                width: "100%", // Asegurar que el ancho sea 100%
              }}
            >
              {isCollapsed ? (
                <FaExpand
                  size={30}
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleCollapse(index)}
                />
              ) : (
                estado.pedidos.map((pedido, i) => (
                  // <OrderCard key={i} dataPedido={pedido} />
                 <OrderCardV2 key={i} data={pedido} />
                  
                ))
              )}
            </div>
          </Col>
        );
      })}
    </>
  );
};
