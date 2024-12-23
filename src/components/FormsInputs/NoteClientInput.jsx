import { FaNotesMedical } from 'react-icons/fa';
import FormField from '../FormField';

const NoteClientInput = ({ note, setNote }) => {
  return (
    <FormField
      label="Nota del Cliente"
      type="text"
      icon={<FaNotesMedical />}
      placeholder="Ingrese una nota para el cliente"
      helptext="Esto se va a guardar en el cliente y no lo ve el cliente"
      value={note}
      onChange={(e) => setNote(e.target.value)}
    />
  );
};

export default NoteClientInput;
