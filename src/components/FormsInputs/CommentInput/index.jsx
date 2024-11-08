import FormField from '../../FormField';
import { FaComment } from 'react-icons/fa';

const CommentInput = ({ comment, setComment }) => {
  const handleChange = (e) => {
    //solo debe permitir letras y espacios y números
    // const rta = e.target.value.replace(/[^a-zA-Z0-9\s]/g, '')
    const rta = e.target.value
    setComment(rta);
  };

  return (
    <FormField
      id="formComentario"
      label="Comentario"
      type="text"
      icon={<FaComment />}
      placeholder="Algún comentario del cliente"
      value={comment}
      onChange={handleChange}
      required
      helptext="Un comentario para hacer tu pedido mas personalizado"
    />
  )
};

export default CommentInput;
