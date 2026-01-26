import { Card } from "react-bootstrap";
import { usePreferences } from "../../Context/PreferencesContext";
import { ROLES } from "../../Utils/const/roles";
import { DeliveryDropdown } from "./DeliveryDropdown";
import { NextStatusButton } from "./NextStatusButton";

function CardFooterComponent({ data }) {
  const { roleSelect } = usePreferences();

  return (
    <Card.Footer className="d-flex flex-wrap justify-content align-items-center gap-2">
      {(roleSelect === ROLES.ADMIN.value || roleSelect === ROLES.RECEPTION.value) && (
        <DeliveryDropdown
          assignedCourierUserId={data?.assignedCourierUserId}
          orderId={data.id}
        />
      )}
      <NextStatusButton data={data} />
    </Card.Footer>
  );
}

export { CardFooterComponent };
