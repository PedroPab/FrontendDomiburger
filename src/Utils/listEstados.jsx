import { ESTADOS, ROLES } from "./constList";

export const listaEstados = [
  {
    name: ESTADOS.PendienteConfimacion,
    color: ` #FFB6C1`,
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
  },
  {
    name: ESTADOS.PendieteTransferencia,
    color: `#ADD8E6`,
    estadoNext: `Facturar`,
    rolesView: [
      ROLES.admin,
      ROLES.recepcion,
    ],
    rolesActions: [

    ]
  },
]