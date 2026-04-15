import { useContext } from 'react';
import { MiContexto } from '../../Context/index';
import { FaWifi } from 'react-icons/fa';
import { BiWifiOff, BiCloud } from 'react-icons/bi';
import { MdSignalWifiOff } from 'react-icons/md';
import { Button, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { CONNECTION_STATUS } from '../../hooks/useConnectionStatus';

const STATUS_CONFIG = {
  [CONNECTION_STATUS.CONNECTED]: {
    icon: FaWifi,
    color: 'success',
    text: 'Conectado',
    showSpinner: false,
    showButton: false,
  },
  [CONNECTION_STATUS.CONNECTING]: {
    icon: BiCloud,
    color: 'info',
    text: 'Conectando...',
    showSpinner: true,
    showButton: false,
  },
  [CONNECTION_STATUS.RECONNECTING]: {
    icon: BiCloud,
    color: 'warning',
    text: 'Reconectando...',
    showSpinner: true,
    showButton: false,
  },
  [CONNECTION_STATUS.DISCONNECTED]: {
    icon: BiWifiOff,
    color: 'danger',
    text: 'Desconectado',
    showSpinner: false,
    showButton: true,
  },
  [CONNECTION_STATUS.OFFLINE]: {
    icon: MdSignalWifiOff,
    color: 'secondary',
    text: 'Sin internet',
    showSpinner: false,
    showButton: false,
  },
  [CONNECTION_STATUS.IDLE]: {
    icon: BiCloud,
    color: 'secondary',
    text: 'Iniciando...',
    showSpinner: true,
    showButton: false,
  },
};

const ConnectionStatusIndicator = () => {
  const { connectionStatus, reconnectSocket } = useContext(MiContexto);

  const config = STATUS_CONFIG[connectionStatus] || STATUS_CONFIG[CONNECTION_STATUS.IDLE];
  const IconComponent = config.icon;

  const renderTooltip = (props) => (
    <Tooltip id="connection-tooltip" {...props}>
      {config.text}
    </Tooltip>
  );

  // Conectado: solo icono verde
  if (connectionStatus === CONNECTION_STATUS.CONNECTED) {
    return (
      <OverlayTrigger placement="bottom" overlay={renderTooltip}>
        <span style={{ marginLeft: '10px', cursor: 'help' }}>
          <IconComponent size={20} className="text-success" />
        </span>
      </OverlayTrigger>
    );
  }

  // Estados de carga
  if (config.showSpinner) {
    return (
      <div className="d-flex align-items-center" style={{ marginLeft: '10px' }}>
        <Spinner
          animation="border"
          variant={config.color}
          size="sm"
          className="me-2"
          role="status"
        >
          <span className="visually-hidden">{config.text}</span>
        </Spinner>
        <span className={`text-${config.color} small d-none d-md-inline`}>
          {config.text}
        </span>
      </div>
    );
  }

  // Estados de error
  return (
    <div className="d-flex align-items-center" style={{ marginLeft: '10px' }}>
      <IconComponent size={20} className={`text-${config.color}`} />
      <span className={`text-${config.color} small ms-2 d-none d-md-inline`}>
        {config.text}
      </span>

      {config.showButton && (
        <Button
          onClick={reconnectSocket}
          variant={`outline-${config.color}`}
          size="sm"
          className="d-flex align-items-center ms-2"
          style={{ borderRadius: '20px', padding: '2px 10px' }}
        >
          Reconectar
        </Button>
      )}
    </div>
  );
};

export { ConnectionStatusIndicator };
