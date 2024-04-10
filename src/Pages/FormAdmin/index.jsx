import { useContext } from 'react';

import { MiContexto } from '../../Context';
import FormContainerAdmin from './FormContainerAdmin';
import LayoutRecepcion from '../../Layout/Recepcion';


const FormAdmin = () => {
  const context = useContext(MiContexto)

  const token = context.tokenLogin.token
  const userId = context.tokenLogin.user.id


  return (
    <>
      <LayoutRecepcion>

        <FormContainerAdmin
          token={token}
          userId={userId}
        />

      </LayoutRecepcion>
    </>
  )
}

export default FormAdmin