import { Spinner } from 'react-bootstrap';

const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <Spinner animation="border" role="status" size="md" >
        <span className="sr-only"></span>
      </Spinner>
    </div>
  );
};

export default Loading;