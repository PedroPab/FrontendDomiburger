import { Route } from "react-router-dom"
import ProtectedRoute from "../../../components/ProtectedRoute"
import Cocina from "../../Cocina"
import { ROLES } from "../../../Utils/constList"
import { ContextProvider } from "../../../Context"
import { LOGIN_ROUTES, COCINA_ROUTES } from "../../../Utils/const/namesRutes"
import { WorkerProvider } from "../../../Context/WorkerContext"

const routes = COCINA_ROUTES.routes;

const CocinaRoutes = () => {
	return (
		<Route
			path={COCINA_ROUTES.path}
			element={
				<ContextProvider>
					<WorkerProvider>

						<ProtectedRoute
							users={[ROLES.admin, ROLES.recepcion, ROLES.cocina, "cocinero"]}
							redirectTo={LOGIN_ROUTES.path}
						/>

					</WorkerProvider>
				</ContextProvider>
			}>
			<Route index element={< Cocina />} />
		</Route >
	)
}

export { CocinaRoutes }