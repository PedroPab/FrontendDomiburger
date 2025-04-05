import FormContainer from './FormContainer';
import { HelmetClientHome } from './HelmetClientHome';
import { UserLayout } from '../../Layout/UserLayout';

// Obtiene el entorno de ejecución

const FormClient = () => {


	return (
		<>
			<UserLayout>
				<HelmetClientHome />
				<FormContainer />
			</UserLayout>
		</>
	);
};

export default FormClient;
