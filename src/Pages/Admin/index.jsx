import LayoutAdmin from '../../Layout/Admin';
import { ADMIN_ROUTES } from '../../Utils/const/namesRutes';

const AdminDashboard = () => {
  const rutes = Object.values(ADMIN_ROUTES.routes)
  return (
    <LayoutAdmin>
      <h1>hola mundo administradores</h1>
      {rutes && rutes.map(rute => <p key={rute}><a href={rute} >{rute}</a></p>)}

    </LayoutAdmin >
  );
}

export { AdminDashboard }