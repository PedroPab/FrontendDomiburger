import { ROLES } from "../roles";
import { ORDER_STATUSES } from "../status";
//lista de los estados que puede cambiar cada rol
const statusByRole = {}

statusByRole[ROLES.COOK.value] = [
  ORDER_STATUSES.FRESH,
  ORDER_STATUSES.PREPARING,
]

statusByRole[ROLES.COURIER.value] = [
  ORDER_STATUSES.READY_FOR_PICKUP,
  ORDER_STATUSES.DISPATCHED,
]

statusByRole[ROLES.RECEPTION.value] = ORDER_STATUSES

statusByRole[ROLES.ADMIN.value] = ORDER_STATUSES

statusByRole[ROLES.SUPERVISOR.value] = []

export { statusByRole }