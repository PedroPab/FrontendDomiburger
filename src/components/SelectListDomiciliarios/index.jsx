import { useContext } from "react";
import { RecepcionContexto } from "../../Context/RecepcionContex";
import ModalAgregarDomiciliarios from "../OrderCard/ModalAgregarDomiciliarios";

const SelectListDomiciliarios = () => {

  const contexRecepcion = useContext(RecepcionContexto)

  return (
    <>
      <ModalAgregarDomiciliarios
        show={contexRecepcion.showModalAgregarDomiciliarios}
        handleClose={contexRecepcion.openCloseModalAgregarDo}
      />
    </>
  )
}

export default SelectListDomiciliarios