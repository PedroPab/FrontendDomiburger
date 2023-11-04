import { useContext } from 'react';

import { MiContexto } from '../../Context'
import { Alert } from 'react-bootstrap';


export const ErrorAlert = () => {
  const context = useContext(MiContexto)

  const alerts = context.alerts

  return (
    <div className="sticky-bottom col-4 ">
      {alerts.map((alert) => (
        <Alert
          key={alert.id} variant={alert.type}>
          {alert.message}
        </Alert>
      ))}
    </div>
  );
};