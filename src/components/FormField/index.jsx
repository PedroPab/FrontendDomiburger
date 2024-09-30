import { InputGroup, FormControl, Form } from 'react-bootstrap';

const FormField = (props) => {
  const { id, label, type, placeholder, value, onChange, icon, feedback, feedbackType, agregado, agregado2, required, helpText } = props;

  return (
    <Form.Group className="mb-3">
      <Form.Label htmlFor={id}>{label}</Form.Label>
      <InputGroup>
        <InputGroup.Text>
          {icon}
        </InputGroup.Text>
        {agregado}
        <FormControl
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
      {helpText && <Form.Text className="text-muted">{helpText}</Form.Text>}  {/* Aquí está el texto de ayuda */}
    </Form.Group>
  );
};

export default FormField;
