
import FormContainerAdmin from './FormContainerAdmin';
import LayoutRecepcion from '../../../Layout/Recepcion';
import SelectListDomiciliarios from '../../../components/SelectListDomiciliarios';


const FormAdminV2 = () => {

  return (
    <LayoutRecepcion>

      <FormContainerAdmin />
      <SelectListDomiciliarios />

    </LayoutRecepcion>
  )
}

export { FormAdminV2 }