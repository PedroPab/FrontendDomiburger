import { useContext } from "react";
import ModalAgregarDomiciliarios from "../ModalAgregarDomiciliarios";
import { RecepcionContexto } from "../../Context/RecepcionContex";

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