import { ESTADOS, ROLES } from "./constList";
import { FaHourglassStart, FaFire, FaUtensils, FaClock, FaTruck, FaCheckCircle, FaReceipt, FaMoneyCheckAlt } from "react-icons/fa"; // Ejemplo de íconos de react-icons

export const listaEstados = [
  {
    name: ESTADOS.Calientes,
    color: `#87CEEB`,
    estadoNext: `Preparara`,
    rolesView: [
      ROLES.admin,
      ROLES.recepcion,
      ROLES.cocinero,
      ROLES.domiciliario,
    ],
    rolesActions: [
      ROLES.admin,
      ROLES.recepcion,
      ROLES.cocinero,
    ],
    icon: <FaFire /> // Ícono de "caliente"
  },
  {
    name: ESTADOS.Preparando,
    color: `#E6E6FA`,
    estadoNext: `A Espera`,
    rolesView: [
      ROLES.admin,
      ROLES.recepcion,
      ROLES.cocinero,
      ROLES.domiciliario,
    ],
    rolesActions: [
      ROLES.admin,
      ROLES.recepcion,
      ROLES.cocinero,
    ],
    icon: <FaUtensils /> // Ícono de "preparación"
  },
  {
    name: ESTADOS.Espera,
    color: ` #FFDAB9`,
    estadoNext: `Despachar`,
    rolesView: [
      ROLES.admin,
      ROLES.recepcion,
      ROLES.domiciliario,
    ],
    rolesActions: [
      ROLES.admin,
      ROLES.recepcion,
      ROLES.domiciliario,
    ],
    icon: <FaClock /> // Ícono de "espera"
  },
  {
    name: ESTADOS.Despachados,
    color: `#98FB98`,
    estadoNext: `Entregado`,
    rolesView: [
      ROLES.admin,
      ROLES.recepcion,
      ROLES.domiciliario,
    ],
    rolesActions: [
      ROLES.admin,
      ROLES.recepcion,
      ROLES.domiciliario,
    ],
    icon: <FaTruck /> // Ícono de "despacho"
  },
  {
    name: ESTADOS.Entregados,
    color: `#FFFACD`,
    estadoNext: `Facturar`,
    rolesView: [
      ROLES.admin,
      ROLES.recepcion,
      ROLES.domiciliario,
    ],
    rolesActions: [
      ROLES.admin,
      ROLES.recepcion,
    ],
    icon: <FaCheckCircle /> // Ícono de "entregado"
  },
  {
    name: ESTADOS.Facturados,
    color: `#D3D3D3`,
    estadoNext: `PendieteTransferencia`,
    rolesView: [
      ROLES.admin,
      ROLES.recepcion,
      ROLES.domiciliario,
    ],
    rolesActions: [
      ROLES.admin,
      ROLES.recepcion,
    ],
    icon: <FaReceipt /> // Ícono de "factura"
  },
  {
    name: ESTADOS.PendieteTransferencia,
    color: `#ADD8E6`,
    estadoNext: `Facturar`,
    rolesView: [
      ROLES.admin,
      ROLES.recepcion,
    ],
    rolesActions: [],
    icon: <FaMoneyCheckAlt /> // Ícono de "transferencia pendiente"
  },
];
