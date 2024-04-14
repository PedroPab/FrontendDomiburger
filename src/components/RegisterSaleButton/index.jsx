import React from 'react';

function RegisterSaleButton({ onClick }) {
  return (
    <div className="d-flex justify-content-center mt-4"> {/* Clase para centrar el botón */}
      <button
        className="btn btn-primary" // Botón primario de Bootstrap
        style={{
          borderRadius: '20px', // Bordes redondeados
          border: '2px solid #007bff', // Borde elegante, del mismo color que el botón
          padding: '10px 20px', // Padding para hacerlo más rectangular
          fontSize: '16px' // Tamaño de fuente adecuado
        }}
        onClick={onClick}
      >
        Registrar Venta
      </button>
    </div>
  );
}

export default RegisterSaleButton;
