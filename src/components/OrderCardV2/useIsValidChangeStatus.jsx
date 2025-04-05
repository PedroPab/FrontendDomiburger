import { usePreferences } from "../../Context/PreferencesContext";
import { statusByRole } from "../../Utils/const/statusChange/statusChangeByRole";

const useIsValidChangeStatus = (status) => {
	const { roleSelect } = usePreferences();

	const permittedStatusForRole = statusByRole[roleSelect]
	const arrayStatusRole = Object.values(permittedStatusForRole)
	if (arrayStatusRole?.includes(status)) {
		return true;
	}
	return false;
}

export { useIsValidChangeStatus };