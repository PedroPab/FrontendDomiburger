import { ESTADOS, ROLES } from "./constList";

export const listaEstados = [
  {
    name: ESTADOS.PendienteConfimacion,
    color: ``,
    estadoNext: `A calientes`,
    rolesView: [
      ROLES.admin,
      ROLES.recepcion,
      ROLES.domiciliario,
    ],
    rolesActions: [
      ROLES.admin,
      ROLES.recepcion,
    ]
  },
  {
    name: ESTADOS.Calientes,
    color: ``,
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
    ]
  },
  {
    name: ESTADOS.Preparando,
    color: ``,
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
    ]
  },
  {
    name: ESTADOS.Espera,
    color: ``,
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
    ]
  },
  {
    name: ESTADOS.Despachados,
    color: ``,
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
    ]
  },
  {
    name: ESTADOS.Entregados,
    color: ``,
    estadoNext: `Facturar`,
    rolesView: [
      ROLES.admin,
      ROLES.recepcion,
      ROLES.domiciliario,
    ],
    rolesActions: [
      ROLES.admin,
      ROLES.recepcion,
      ROLES.domiciliario,
    ]
  },
  {
    name: ESTADOS.Facturados,
    color: ``,
    estadoNext: `PendieteTransferencia`,
    rolesView: [
      ROLES.admin,
      ROLES.recepcion,
      ROLES.domiciliario,
    ],
    rolesActions: [
      ROLES.admin,
      ROLES.recepcion,
      ROLES.domiciliario,
    ]
  },
  {
    name: ESTADOS.PendieteTransferencia,
    color: ``,
    estadoNext: `Facturar`,
    rolesView: [
      ROLES.admin,
      ROLES.recepcion,
    ],
    rolesActions: [

    ]
  },
]