import { Form } from 'react-bootstrap';

const NotesInput = ({ notes, setNotes, error }) => {
  const handleChange = (e) => {
    setNotes(e.target.value);
  };

  return (
    <Form.Group controlId="notesInput" className="mb-3">
      <Form.Label>Notas y Comentarios</Form.Label>
      <Form.Control
        as="textarea"
        rows={2}
        placeholder="Al lado de una piedra..."
        value={notes}
        onChange={handleChange}
      />
      <Form.Text className="text-muted">
        Escriba cualquier comentario o nota adicional que seria util para el domiciliario ubicarse mejor.
      </Form.Text>
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
};

export { NotesInput };
