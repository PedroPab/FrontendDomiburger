import PropTypes from 'prop-types';
import { Pagination } from 'react-bootstrap';

const PaginationComponent = ({ page, handlePageChange }) => {
  return (

    <Pagination className="justify-content-center">
      <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 1} />
      <Pagination.Item active>{page}</Pagination.Item>
      <Pagination.Next onClick={() => handlePageChange(page + 1)} />
    </Pagination>
  );
};

PaginationComponent.propTypes = {

  page: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

export default PaginationComponent;
