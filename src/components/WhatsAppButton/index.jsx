import { Button } from "react-bootstrap";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = ({ phoneNumber, message }) => {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <Button
      variant="success"
      onClick={handleClick}
      className="d-flex align-items-center"
      style={{
        fontWeight: "bold",
        borderRadius: "50px",
        padding: "10px 20px",
        fontSize: "16px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <FaWhatsapp size={24} className="me-2" />
      Enviar mensaje
    </Button>
  );
};

export default WhatsAppButton;
