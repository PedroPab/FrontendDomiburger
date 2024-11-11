import LayoutRecepcion from "../../Layout/Recepcion";
import { getUrlBackend, getUrlCodigos, getUrlSocket } from "../../Utils/getUrlApiByOriginPath";

const Experimentos = () => {
  const apiUrl = getUrlBackend();
  const urlSocket = getUrlSocket();
  const urlCodigo = getUrlCodigos()
  return (
    <>
      <LayoutRecepcion>

        <h1>Experimentos</h1>

        <p>Esta es una página de experimentos</p>

        <div className="alert alert-info">
          <strong>API URL:</strong> {apiUrl}
        </div>

        <div className="alert alert-info">
          <strong>Socket URL:</strong> {urlSocket}
        </div>

        <div className="alert alert-info">
          <strong>Códigos URL:</strong> {urlCodigo}
        </div>


      </LayoutRecepcion>
    </>
  );
};

export default Experimentos;
