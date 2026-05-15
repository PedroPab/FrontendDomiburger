import { useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Form, Row } from "react-bootstrap";
import { FaCalendarDay, FaCalendarWeek, FaSearch } from "react-icons/fa";

const getStartOfDay = (date = new Date()) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const getEndOfDay = (date = new Date()) => {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};

const formatLocalDateTime = (date) => {
  const tzOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
};

const FormFilterOrder = ({ fetchOrders, loading }) => {
  const [startDate, setStartDate] = useState(() => getStartOfDay());
  const [endDate, setEndDate] = useState(() => getEndOfDay());

  const handleDateTimeChange = (e, setDateFunction) => {
    const newDate = new Date(e.target.value);
    setDateFunction(newDate);
  };

  const handleFetchOrders = () => {
    fetchOrders(startDate.toISOString(), endDate.toISOString());
  };

  const applyQuickFilter = (start, end) => {
    setStartDate(start);
    setEndDate(end);
    fetchOrders(start.toISOString(), end.toISOString());
  };

  const filterToday = () => applyQuickFilter(getStartOfDay(), getEndOfDay());

  const filterYesterday = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    applyQuickFilter(getStartOfDay(yesterday), getEndOfDay(yesterday));
  };

  const filterThisWeek = () => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    applyQuickFilter(getStartOfDay(startOfWeek), getEndOfDay());
  };

  const filterThisMonth = () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    applyQuickFilter(getStartOfDay(startOfMonth), getEndOfDay());
  };

  useEffect(() => {
    fetchOrders(startDate.toISOString(), endDate.toISOString());
  }, []);

  return (
    <div className="bg-light rounded-3 p-3 mb-4 border">
      <Row className="align-items-end g-2">
        <Col xs={12} sm={5}>
          <Form.Group>
            <Form.Label className="fw-semibold small mb-1">Desde</Form.Label>
            <Form.Control
              type="datetime-local"
              value={formatLocalDateTime(startDate)}
              onChange={(e) => handleDateTimeChange(e, setStartDate)}
            />
          </Form.Group>
        </Col>
        <Col xs={12} sm={5}>
          <Form.Group>
            <Form.Label className="fw-semibold small mb-1">Hasta</Form.Label>
            <Form.Control
              type="datetime-local"
              value={formatLocalDateTime(endDate)}
              onChange={(e) => handleDateTimeChange(e, setEndDate)}
            />
          </Form.Group>
        </Col>
        <Col xs={12} sm={2}>
          <Button
            variant="primary"
            onClick={handleFetchOrders}
            disabled={loading}
            className="w-100"
          >
            <FaSearch className="me-1" />
            {loading ? "Buscando..." : "Buscar"}
          </Button>
        </Col>
      </Row>

      <Row className="mt-2">
        <Col>
          <span className="small text-muted me-2">Acceso rápido:</span>
          <ButtonGroup size="sm">
            <Button variant="outline-secondary" onClick={filterToday} disabled={loading}>
              <FaCalendarDay className="me-1" />
              Hoy
            </Button>
            <Button variant="outline-secondary" onClick={filterYesterday} disabled={loading}>
              Ayer
            </Button>
            <Button variant="outline-secondary" onClick={filterThisWeek} disabled={loading}>
              <FaCalendarWeek className="me-1" />
              Esta semana
            </Button>
            <Button variant="outline-secondary" onClick={filterThisMonth} disabled={loading}>
              Este mes
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </div>
  );
};

export { FormFilterOrder };
