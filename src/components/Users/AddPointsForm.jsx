import { useState } from 'react';
import { Card, Form, Button, Spinner, InputGroup } from 'react-bootstrap';
import { FaStar, FaCoins } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { UsersService } from '../../apis/clientV2/usersService';
import { useAuth } from '../../Context/AuthContext';
import { PointsService } from '../../apis/clientV2/PointsService';

const AddPointsForm = ({ userId, currentPoints, onSuccess }) => {
  const { token } = useAuth();
  const [points, setPoints] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const parsedPoints = Number(points);
    if (!points || isNaN(parsedPoints) || parsedPoints === 0) {
      newErrors.points = 'Ingresa una cantidad de puntos válida (puede ser negativa para descontar).';
    }
    if (!note.trim()) {
      newErrors.note = 'La nota es obligatoria.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const pointsService = new PointsService(token);
      await pointsService.addPoints({
        userId, points: Number(points), description: note.trim(), type: "gift"
      });
      toast.success('Puntos agregados correctamente');
      setPoints('');
      setNote('');
      setErrors({});
      if (onSuccess) onSuccess();
    } catch (err) {
      const msg = err?.message || 'Error al agregar puntos';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Header className="bg-warning bg-opacity-10 border-bottom border-warning border-opacity-25">
        <div className="d-flex align-items-center gap-2">
          <FaStar className="text-warning" />
          <span className="fw-semibold text-warning-emphasis">Gestionar Puntos</span>
        </div>
      </Card.Header>
      <Card.Body>
        <div className="d-flex align-items-center gap-2 mb-4 p-3 rounded-3 bg-light">
          <FaCoins className="text-warning fs-4" />
          <div>
            <div className="text-muted small">Saldo actual</div>
            <div className="fs-5 fw-bold">{currentPoints ?? 0} puntos</div>
          </div>
        </div>

        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold small text-uppercase text-muted">
              Cantidad de puntos
            </Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FaStar className="text-warning" />
              </InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Ej: 50 o -20"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                isInvalid={!!errors.points}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                {errors.points}
              </Form.Control.Feedback>
            </InputGroup>
            <Form.Text className="text-muted">
              Usa un valor negativo para descontar puntos.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold small text-uppercase text-muted">
              Nota
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Motivo de la transacción..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              isInvalid={!!errors.note}
              disabled={loading}
            />
            <Form.Control.Feedback type="invalid">
              {errors.note}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            type="submit"
            variant="warning"
            className="w-100 fw-semibold"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Procesando...
              </>
            ) : (
              <>
                <FaStar className="me-2" />
                Agregar Puntos
              </>
            )}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export { AddPointsForm };
