import React from 'react';
import { Table } from 'react-bootstrap';
import './Calendar.css';

const Calendar = ({ components, startDate }) => {
  const start = new Date(startDate);
  const month = start.getMonth();
  const year = start.getFullYear();

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(month, year);
  const firstDay = getFirstDayOfMonth(month, year);

  const renderDays = () => {
    const rows = [];
    let cells = [];

    // Agregar celdas vacías para los días antes del inicio del mes
    for (let i = 0; i < firstDay; i++) {
      cells.push(<td key={`empty-${i}`}></td>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const componentIndex = day - 1 + firstDay; // Ajustar índice para celdas vacías
      const DayComponent = components[componentIndex]; // Obtener el componente para el día

      cells.push(
        <td key={day}>
          <div>{day}</div>
          {DayComponent ? <DayComponent /> : null}
        </td>
      );

      if ((cells.length) % 7 === 0 || day === daysInMonth) {
        rows.push(<tr key={day}>{cells}</tr>);
        cells = [];
      }
    }

    return rows;
  };

  return (
    <div className="container-fluid">
      <Table bordered className="calendar-table">
        <thead>
          <tr>
            <th>Dom</th>
            <th>Lun</th>
            <th>Mar</th>
            <th>Mié</th>
            <th>Jue</th>
            <th>Vie</th>
            <th>Sáb</th>
          </tr>
        </thead>
        <tbody>
          {renderDays()}
        </tbody>
      </Table>
    </div>
  );
};

export default Calendar;
