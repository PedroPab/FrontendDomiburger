import ListCardPages from '../../components/ListCardPages';
import LayoutRecepcion from '../../Layout/Recepcion';

const Codigos = () => {
  return (
    <>
      <LayoutRecepcion>
        <ListCardPages
          pages={[
            { title: 'Codigo Referido', description: 'Crear codigo referido para un cliente', path: 'crearCodigoReferido' },
            { title: 'Crear codigo ya existente', description: 'Importar o crear un codigo ya existente, para crear de una vez con los referidos y premios desde el principio', path: 'crearCodigoYaCreado' },
            { title: 'Visualizar', description: 'Importar o crear un codigo ya existente, para crear de una vez con los referidos y premios desde el principio', path: 'buscar' },
            // { nombre: 'Clientes', path: 'clientes' },
          ]}
        />
      </LayoutRecepcion >
    </>
  );

}

export default Codigos