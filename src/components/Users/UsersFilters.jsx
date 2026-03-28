import { useState } from 'react';
import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { ROLES } from '../../Utils/const/roles';

const UsersFilters = ({ onFilter, onClear, loading }) => {
  const [filterType, setFilterType] = useState('email');
  const [filterValue, setFilterValue] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const filterOptions = [
    { key: 'email', label: 'Email' },
    { key: 'name', label: 'Nombre' },
    { key: 'phone', label: 'Telefono' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const filters = [];

    if (filterValue.trim()) {
      filters.push({
        key: filterType,
        value: filterValue.trim(),
        option: filterType === 'name' ? 'contains' : '=='
      });
    }

    if (roleFilter) {
      filters.push({
        key: 'roles',
        value: roleFilter,
        option: 'array-contains'
      });
    }

    onFilter(filters);
  };

  const handleClear = () => {
    setFilterValue('');
    setRoleFilter('');
    onClear();
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4 p-3 bg-light rounded shadow-sm">
      <Row className="g-3 align-items-end">
        <Col xs={12} md={2}>
          <Form.Label className="fw-bold">Buscar por</Form.Label>
          <Form.Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            {filterOptions.map(opt => (
              <option key={opt.key} value={opt.key}>{opt.label}</option>
            ))}
          </Form.Select>
        </Col>

        <Col xs={12} md={4}>
          <Form.Label className="fw-bold">Valor</Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder={`Buscar por ${filterType}...`}
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            />
          </InputGroup>
        </Col>

        <Col xs={12} md={2}>
          <Form.Label className="fw-bold">Rol</Form.Label>
          <Form.Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">Todos</option>
            {Object.values(ROLES).map(role => (
              <option key={role.value} value={role.value}>{role.name}</option>
            ))}
          </Form.Select>
        </Col>

        <Col xs={12} md={4}>
          <div className="d-flex gap-2">
            <Button type="submit" variant="primary" disabled={loading}>
              <FaSearch className="me-1" /> Buscar
            </Button>
            <Button type="button" variant="outline-secondary" onClick={handleClear}>
              <FaTimes className="me-1" /> Limpiar
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export { UsersFilters };
