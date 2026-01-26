import { Card } from "react-bootstrap";

const CardProductResumid = ({ product, onClick }) => (
  <button
    // type="button"
    className="card p-0 h-100 w-100"
    onClick={() => onClick(product)}
    onKeyPress={(e) => {
      if (e.key === 'Enter' || e.key === ' ') onClick(product);
    }}
    style={{ cursor: 'pointer', border: 'none', background: 'none' }}
  >
    <Card
    >
      {/* {product.photos?.[0] && (
				<Card.Img
					variant="top"
					src={product.photos[0]}
					style={{ height: 120, objectFit: 'cover' }}
				/>
			)} */}
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text className="mb-1 text-truncate">{product.description}</Card.Text>
        <Card.Text className="fw-bold">${product.price.toLocaleString()}</Card.Text>
        <div
          style={{
            backgroundColor: product.colorPrimary,
            width: '100%',
            height: '6px',
            borderRadius: '3px',
          }}
        />
      </Card.Body>
    </Card>
  </button>
);

export { CardProductResumid };