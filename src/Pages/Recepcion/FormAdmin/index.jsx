
import FormContainerAdmin from './FormContainerAdmin';
import LayoutRecepcion from '../../../Layout/Recepcion';
import SelectListDomiciliarios from '../../../components/SelectListDomiciliarios';


const FormAdmin = () => {

  return (
    <LayoutRecepcion>

      <FormContainerAdmin />
      <SelectListDomiciliarios />

    </LayoutRecepcion>
  )
}

export default FormAdmin