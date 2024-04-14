import React from 'react';
import { Alert, Card } from 'react-bootstrap';
import InfoIcon from '../../InfoIcon';
import { FaAward, FaUsers } from 'react-icons/fa';

const AlertInfoRedCodigo = ({ dataCodigo }) => {
  return (
    <div className='m-3'>
      <Alert variant={dataCodigo?.active ? 'info' : 'warning'} className="rounded">
        <div
          className="mb-2 d-flex justify-content-around "
        >
          <InfoIcon Icon={FaUsers} title="" number={dataCodigo?.used?.length} />
          <InfoIcon Icon={FaAward} title="" number={dataCodigo?.reward?.length} />
        </div>
      </Alert>
    </div>
  );
};

export default AlertInfoRedCodigo;