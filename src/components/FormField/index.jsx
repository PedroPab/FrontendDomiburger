import { InputGroup, FormControl, Form } from 'react-bootstrap';

const FormField = (props) => {
  const { as, id, label, type, placeholder, value, onChange, icon, feedback, feedbackType, agregado, agregado2, required, helptext, error } = props;
  return (
    <Form.Group className="mb-3">
      <Form.Label htmlFor={id}>{label}</Form.Label>
      <InputGroup>
        <InputGroup.Text>
          {icon}
        </InputGroup.Text>
        {agregado}
        <FormControl
          as={as}
          id={id}
          type={type}
          placeholder={placeholder}
          value={value || ''}
          onChange={onChange}
          autoComplete="true"
          required={required}
          {...props}
        />
        {agregado2}
        {feedback && <Form.Control.Feedback type={feedbackType}>{feedback}</Form.Control.Feedback>}
      </InputGroup>
      {helptext && <Form.Text className="text-muted">{helptext}</Form.Text>}  {/* Aquí está el texto de ayuda */}
      {error && <Form.Text className="text-danger">{error}</Form.Text>}

    </Form.Group>
  );
};

export default FormField;
