import { statusOrderCol } from "../../Utils/listStatus";
import { FooterBadge } from "../common/FooterBadge";

const StatusName = ({ order }) => {
  const status = order.status;
  const statusOrder = statusOrderCol[status]
  return (
    <FooterBadge
      color={statusOrder?.color}>
      {statusOrder?.label}
    </FooterBadge>
  );
}

export { StatusName };