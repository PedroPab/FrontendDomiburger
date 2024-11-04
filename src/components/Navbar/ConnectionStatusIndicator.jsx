// components/ConnectionStatusIndicator.js
import { useContext } from 'react';
import { MiContexto } from '../../Context/index';
import { FaWifi } from 'react-icons/fa';
import { BiWifiOff } from 'react-icons/bi';

const ConnectionStatusIndicator = () => {
  const { isConnected } = useContext(MiContexto);

  return (
    <>
      {isConnected ? (
        <FaWifi
          size={20}
          color="green"
          title="Conectado"
          style={{ marginLeft: '10px' }}
        />
      ) : (
        <BiWifiOff
          size={20}
          color="red"
          title="Desconectado"
          style={{ marginLeft: '10px' }}
        />
      )}
    </>
  );
};

export { ConnectionStatusIndicator };
