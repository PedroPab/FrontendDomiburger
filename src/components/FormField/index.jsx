import { InputGroup, FormControl, Form } from 'react-bootstrap';

const FormField = (props) => {
  const { id, label, type, placeholder, value, onChange, icon, feedback, feedbackType, agregado } = props
  return (
    <Form.Group className="mb-3">
      <Form.Label htmlFor={id}>{label}</Form.Label>
      <InputGroup>
        <InputGroup.Text>
          {icon}
        </InputGroup.Text>
        {
          agregado
        }
        <FormControl
          id={id}
          required
          type={type}
          placeholder={placeholder}
          value={value || null}
          onChange={onChange}
          autoComplete='true'
          {...props}
        />
        {feedback && <Form.Control.Feedback type={feedbackType}>{feedback}</Form.Control.Feedback>}
      </InputGroup>
    </Form.Group>
  );
};

export default FormField;
