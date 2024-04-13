import { Form } from 'react-bootstrap';

const CommentInput = ({ comment, setComment }) => {
  const handleChange = (e) => {
    //solo debe permitir letras y espacios y números
    const rta = e.target.value.replace(/[^a-zA-Z0-9\s]/g, '')
    setComment(rta);
  };

  return (
    <div className='m-3'>
      <Form.Group controlId="formCodigo">
        <Form.Label>Comentario:</Form.Label>
        <Form.Control
          as="textarea"
          value={comment}
          onChange={handleChange}
          placeholder="Algún comentario del cliente"
        />
        <Form.Text id="codigoHelpBlock" muted>
          La opinión del cliente es importante. xd
        </Form.Text>
      </Form.Group>
    </div>
  );
};

export default CommentInput;
