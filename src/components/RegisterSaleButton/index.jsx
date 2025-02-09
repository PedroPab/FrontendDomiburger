function RegisterSaleButton({ onClick }) {
  return (
    <div className="d-flex justify-content-center mt-5 mb-5">
      <button
        className="btn btn-primary register-sale-button"
        onClick={onClick}
      >
        Registrar Venta
      </button>
      <style>{`
        .register-sale-button {
          border-radius: 30px;
          border: 2px solid #007bff;
          padding: 12px 30px;
          font-size: 18px;
          font-weight: bold;
          color: #fff;
          background: linear-gradient(90deg, #007bff, #0056b3);
          box-shadow: 0 4px 15px rgba(0, 123, 255, 0.5);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .register-sale-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 300%;
          height: 100%;
          background: rgba(255, 255, 255, 0.2);
          transform: skewX(-45deg);
          transition: left 0.3s ease-in-out;
        }

        .register-sale-button:hover {
          background: linear-gradient(90deg, #0056b3, #004085);
          box-shadow: 0 6px 20px rgba(0, 123, 255, 0.6);
          transform: scale(1.05);
        }

        .register-sale-button:hover::before {
          left: 100%;
        }

        .register-sale-button:active {
          transform: scale(0.95);
          box-shadow: 0 3px 10px rgba(0, 123, 255, 0.4);
        }
      `}</style>
    </div>
  );
}

export default RegisterSaleButton;
