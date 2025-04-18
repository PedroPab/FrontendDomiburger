import { useEffect, useState, useCallback, useMemo } from "react";
import { Button, Col, Row, Spinner, Form, Alert } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import { ClientsService } from "../../apis/clientV2/ClientsService";
import { useAuth } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import NameInput from "../FormsInputs/NameInput";
import { useFindLocationsByIdClient } from "../../hooks/api/useFindLocationsByIdClient";
import { tr } from "faker/lib/locales";
import { useImportLocation } from "../../hooks/api/useImportLocation";

const CREATE_CLIENT = { CLOSED: "closed", OPEN: "open", INQUIRING: "inquiring" };

const ClientSearchModule = ({ dataClient, setDataClient }) => {
	const { token } = useAuth();
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingCreateClient, setIsLoadingCreateClient] = useState(false);
	const [openCreateClient, setOpenCreateClient] = useState(CREATE_CLIENT.CLOSED);

	// Memoizamos el servicio para que no se recree en cada render.
	const clientsService = useMemo(() => new ClientsService(token), [token]);
	const { locations, findLocationsByIdClient } = useFindLocationsByIdClient();

	useEffect(() => {
		if (dataClient === null) {
			setName("");
			setPhone("");
			setOpenCreateClient(CREATE_CLIENT.CLOSED);
			return;
		}
		findLocationsByIdClient(dataClient.id);

	}, [dataClient]);

	const findClientForPhone = useCallback(async () => {
		if (!phone) {
			toast.error("Por favor ingresa un número de teléfono válido.");
			return;
		}
		setIsLoading(true);
		try {
			const response = await clientsService.findByPhone(phone);
			if (!response?.body) throw new Error("Cliente no encontrado");
			setDataClient(response.body);
			toast.success("Cliente encontrado");
			setOpenCreateClient(CREATE_CLIENT.CLOSED);
		} catch (error) {
			setDataClient(null);
			toast.error(error.message);
			setOpenCreateClient(CREATE_CLIENT.INQUIRING);
		} finally {
			setIsLoading(false);
		}
	}, [phone, clientsService, setDataClient]);

	const { importLocation, loading: importLoading, error: errorImport, data: responseImport } = useImportLocation();

	useEffect(() => {
		if (responseImport) setDataClient((prevDataClient) => ({ ...prevDataClient }));
	}, [responseImport]);

	useEffect(() => {
		if (dataClient) {
			setName(dataClient.name);
		}
	}, [dataClient]);

	const createClient = useCallback(async () => {
		if (!name) {
			toast.error("Por favor ingresa un nombre válido.");
			return;
		}
		setIsLoadingCreateClient(true);
		try {
			const response = await clientsService.create({ name, phone });
			setDataClient(response.body);
			toast.success("Cliente creado");
			setOpenCreateClient(CREATE_CLIENT.CLOSED);
		} catch (error) {
			setDataClient(null);
			toast.error(error.message);
		} finally {
			setIsLoadingCreateClient(false);
		}
	}, [name, phone, clientsService, setDataClient]);

	return (
		<>
			<h3 className="mb-4 text-center">Buscar Cliente</h3>
			<Form className="mb-4">
				<Form.Group>
					<Form.Label>Teléfono</Form.Label>
					<Row className="align-items-center mb-3">
						<Col xs={12} md={8} className="mb-2 mb-md-0">
							<PhoneInput
								placeholder="Ingresa el número de teléfono"
								value={phone}
								onChange={setPhone}
								country="CO"
								defaultCountry="CO"
								inputComponent={Form.Control}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										e.preventDefault();
										findClientForPhone();
									}
								}}
							/>
						</Col>
						<Col xs={12} md={4}>
							<Button
								type="button"
								variant="primary"
								onClick={findClientForPhone}
								disabled={isLoading}
								className="w-100"
							>
								{isLoading ? (
									<>
										<Spinner animation="border" size="sm" className="me-2" />
										Buscando...
									</>
								) : (
									"Buscar Cliente"
								)}
							</Button>
						</Col>
					</Row>
					<Row>
						{dataClient && (
							<>
								<h4>Cliente Encontrado</h4>
								<NameInput name={name} setName={setName} />

								{/* solo si no tiene ubicaciones creadas */}
								{/* boton para importar la ubicación de un cliente */}
								{locations && locations.length === 0 && (
									<Button
										type="button"
										variant="warning"
										onClick={() => importLocation(dataClient.id)}
										className="w-100 my-2"
										disabled={importLoading}
									>
										{importLoading ? (
											<>
												<Spinner animation="border" size="sm" className="me-2" />
												Importando...
											</>
										) : (
											"Importar Ubicación"
										)}
									</Button>
								)}
								{errorImport && (
									<Col xs={12} className="text-center my-2">
										<Alert variant="danger">
											Error al importar ubicación: {errorImport.message}
										</Alert>
									</Col>
								)}
								{responseImport && (
									<Col xs={12} className="text-center my-2">
										<Alert variant="success">Ubicación importada exitosamente</Alert>
									</Col>
								)}

								{/* // editar cliente */}

								<Button
									type="button"
									variant="primary"
									onClick={() => toast.info("Funcionalidad no implementada,,, pero imaginese que si")}
									className="w-100 my-2"
								>
									Editar Cliente
								</Button>
							</>

						)}
						{openCreateClient === CREATE_CLIENT.INQUIRING && (
							<Button
								type="button"
								variant="primary"
								onClick={() => setOpenCreateClient(CREATE_CLIENT.OPEN)}
								className="w-100 my-2"
							>
								Crear Cliente?
							</Button>
						)}
						{openCreateClient === CREATE_CLIENT.OPEN && (
							<>
								<h4>Crear Cliente</h4>
								<NameInput name={name} setName={setName} />
								<Button
									type="button"
									variant="primary"
									onClick={createClient}
									className="w-100"
									disabled={isLoadingCreateClient}
								>
									{isLoadingCreateClient ? (
										<>
											<Spinner animation="border" size="sm" className="me-2" />
											Creando...
										</>
									) : (
										"Crear Cliente"
									)}
								</Button>
							</>
						)}
					</Row>
				</Form.Group>
			</Form>
		</>
	);
};

export { ClientSearchModule };