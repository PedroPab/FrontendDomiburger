import React, { useState } from 'react';
import { FaCartPlus, FaMapMarkerAlt, FaCreditCard } from 'react-icons/fa'; // Importar iconos

// Componente para mostrar la barra de progreso
const ProgressBar = ({ step }) => {
  const steps = ['Productos', 'Envío', 'Pago'];
  const icons = [<FaCartPlus />, <FaMapMarkerAlt />, <FaCreditCard />];  // Iconos correspondientes a cada paso
  const progress = (step / steps.length) * 100;

  return (
    <div className="d-flex justify-content-between my-4">
      {steps.map((stepName, index) => (
        <div key={index} className="text-center">
          <div
            className={`progress-step ${index + 1 <= step ? 'active' : ''}`}
            style={{ color: index + 1 <= step ? '#4caf50' : '#ddd' }}
          >
            {icons[index]} {/* Mostrar icono */}
          </div>
          <div>{stepName}</div>
        </div>
      ))}
      <div className="progress my-2 w-100" style={{ height: '10px' }}>
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
  );
};

// Paso 1: Selección de productos
const Step1 = ({ onNext, product, setProduct }) => {
  return (
    <div className="container">
      <h2 className="mb-4">
        <FaCartPlus className="me-2" /> Selecciona los productos
      </h2>
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          checked={product === 'Producto 1'}
          onChange={() => setProduct('Producto 1')}
          id="producto1"
        />
        <label className="form-check-label" htmlFor="producto1">
          Producto 1
        </label>
      </div>
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          checked={product === 'Producto 2'}
          onChange={() => setProduct('Producto 2')}
          id="producto2"
        />
        <label className="form-check-label" htmlFor="producto2">
          Producto 2
        </label>
      </div>
      <button className="btn btn-primary mt-4" onClick={onNext}>
        Siguiente
      </button>
    </div>
  );
};

// Paso 2: Dirección de envío
const Step2 = ({ onNext, onBack, address, setAddress }) => {
  return (
    <div className="container">
      <h2 className="mb-4">
        <FaMapMarkerAlt className="me-2" /> Ingresa la dirección de envío
      </h2>
      <input
        type="text"
        className="form-control"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Dirección"
      />
      <div className="mt-4">
        <button className="btn btn-secondary" onClick={onBack}>
          Atrás
        </button>
        <button className="btn btn-primary ms-3" onClick={onNext}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

// Paso 3: Método de pago
const Step3 = ({ onBack, product, address }) => {
  return (
    <div className="container">
      <h2 className="mb-4">
        <FaCreditCard className="me-2" /> Selecciona el método de pago
      </h2>
      <select className="form-select mb-4">
        <option>Tarjeta de crédito</option>
        <option>PayPal</option>
      </select>
      <div>
        <h3>Resumen de tu pedido:</h3>
        <p><strong>Producto:</strong> {product}</p>
        <p><strong>Dirección:</strong> {address}</p>
      </div>
      <div className="mt-4">
        <button className="btn btn-secondary" onClick={onBack}>
          Atrás
        </button>
        <button className="btn btn-success ms-3">
          Confirmar pedido
        </button>
      </div>
    </div>
  );
};

// Componente principal para manejar los pasos
const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [product, setProduct] = useState('');
  const [address, setAddress] = useState('');

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="container mt-5">
      <ProgressBar step={step} />
      <div className="card p-4 shadow-sm">
        {step === 1 && <Step1 onNext={nextStep} product={product} setProduct={setProduct} />}
        {step === 2 && <Step2 onNext={nextStep} onBack={prevStep} address={address} setAddress={setAddress} />}
        {step === 3 && <Step3 onBack={prevStep} product={product} address={address} />}
      </div>
    </div>
  );
};

export default MultiStepForm;
