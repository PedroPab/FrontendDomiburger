import { InputGroup, FormControl, Form } from 'react-bootstrap';

const FormField = ({ id, label, type, placeholder, value, onChange, icon, feedback, feedbackType }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label htmlFor={id}>{label}</Form.Label>
      <InputGroup>
        <InputGroup.Text>
          {icon}
        </InputGroup.Text>
        <FormControl
          id={id}
          required
          type={type}
          placeholder={placeholder}
          value={value || null}
          onChange={onChange}
        />
        {feedback && <Form.Control.Feedback type={feedbackType}>{feedback}</Form.Control.Feedback>}
      </InputGroup>
    </Form.Group>
  );
};

export default FormField;
