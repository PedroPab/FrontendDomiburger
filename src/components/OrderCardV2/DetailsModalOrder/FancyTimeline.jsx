// src/components/FancyTimeline.jsx
import React from 'react';
import { Card } from 'react-bootstrap';
import './FancyTimeline.css';
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

export const FancyTimeline = ({ createdAt, timeLapseStatus, status }) => {
	const tsCreated = convertToTimestamp(createdAt);
	const history = timeLapseStatus
		.map(i => ({ status: i.status, updatedAt: convertToTimestamp(i.updatedAt) }))
		.sort((a, b) => a.updatedAt - b.updatedAt);
	const tsNow = Date.now();
	const events = [
		{ status: 'Creado', updatedAt: tsCreated },
		...history,
		{ status, updatedAt: tsNow }
	];

	return (
		<Card className="mb-4 fancy-tl-container">
			<Card.Header><strong>Timeline Estilo Cinta</strong></Card.Header>
			<Card.Body>
				<div className="fancy-tl">
					{events.map((e, i) => {
						const { label, color } = STATUS_MAP[e.status] || { label: e.status, color: '#888' };
						const time = new Date(e.updatedAt).toLocaleTimeString('es-CO');
						let duration = '';
						if (i > 0) duration = formatDuration(e.updatedAt - events[i - 1].updatedAt);
						return (
							<div className={`fancy-item pos-${i % 2}`} key={i}>
								<div className="fancy-card" style={{ borderColor: color }}>
									<div className="fancy-label" style={{ backgroundColor: color }}>
										{label}
									</div>
									<div className="fancy-body">
										<p className="mb-1"><strong>{time}</strong></p>
										{i > 0 && <p className="mb-0 small text-muted">Duró {duration}</p>}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</Card.Body>
		</Card>
	);
};
