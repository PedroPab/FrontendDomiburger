// src/components/OrderTimeline.jsx
import { Card, Badge } from 'react-bootstrap';
import './OrderTimeline.css';
import { convertToTimestamp } from '../../../Utils/formatTime';
import { statusOrderCol } from '../../../Utils/listStatus';

const STATUS_MAP = statusOrderCol;

/** Devuelve string como "0h 3m 12s" */
function formatDuration(ms) {
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return [
    h > 0 && `${h}h`,
    m > 0 && `${m}m`,
    `${s}s`
  ].filter(Boolean).join(' ');
}

const OrderTimeline = ({ createdAt, timeLapseStatus, status }) => {
  // 1. Timestamp de creación
  const tsCreated = convertToTimestamp(createdAt);

  // 2. Mapeamos los eventos históricos
  const history = timeLapseStatus
    .map(item => ({
      status: item.status,
      updatedAt: convertToTimestamp(item.updatedAt)
    }))
  // Ordenamos por fecha en caso de que no vengan ordenados
    .sort((a, b) => a.updatedAt - b.updatedAt);

  // 3. Evento actual (último)
  const tsNow = Date.now();
  const events = [
    { status: 'Creado', updatedAt: tsCreated },
    ...history,
    { status, updatedAt: tsNow }
  ];

  return (
    <Card className="mb-4">
      <Card.Header><strong>Línea de tiempo del pedido</strong></Card.Header>
      <Card.Body>
        <div className="timeline">
          {events.map((item, idx) => {
            const { label, color } = STATUS_MAP[item.status] || { label: item.status, color: '#880' };
            const fechaCurrent = new Date(item.updatedAt);
            const horaCurrent = fechaCurrent.toLocaleTimeString('es-CO');

            // Sólo para segmentos posteriores al primero:
            let segmento = null;
            if (idx > 0) {
              const prev = events[idx - 1];
              const diff = formatDuration(item.updatedAt - prev.updatedAt);
              segmento = (
                <p className="mt-1 mb-0">
                  <small className="text-muted">
                    (<strong>{diff}</strong>)
                  </small>
                </p>
              );
            }

            return (
              <div className="timeline-item" key={idx}>
                <div className="dot" style={{ backgroundColor: color }} />
                <div className="content">
                  <div className="d-flex justify-content-between align-items-center">
                    <Badge
                      bg=''
                      style={{
                        backgroundColor: color,
                        color: "#fff",
                        fontSize: "0.85rem",
                        padding: "5px 10px",
                      }}
                    >
                      {label}
                    </Badge>
                    <small>{horaCurrent}</small>
                  </div>
                  {segmento}
                </div>
              </div>
            );
          })}
        </div>
      </Card.Body>
    </Card>
  );
};

export { OrderTimeline };
