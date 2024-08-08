import { useContext, useEffect, useState } from 'react'
import { MiContexto } from '../../../Context'
import Layout from "../../../components/Layout";
import { ContextProviderRecepcion } from '../../../Context/RecepcionContex';
import { UtilsApi } from '../../../Utils/utilsApi';
import { NavbarRecepcion } from '../../../components/Navbar/NavbarRecepcion';
import { Calendar } from 'antd';

const EstadisticasVentasDelMes = () => {
  const context = useContext(MiContexto)
  const token = context.tokenLogin.token
  //la info con todos los dias del mes con  las e

  //miramos cuantos dias llevamos del mes
  const daysInMonth = new Date().getDate()
  const arrayDaysSalesHamburguesa = Array.from({ length: daysInMonth }, async (_, i) => {
    const daySelect = new Date(new Date().getFullYear(), new Date().getMonth(), i + 1).toLocaleDateString()
    //el dia en formato isoString pero con la correcion de la zona horaria -5 horas
    const daySelectIso = new Date(new Date().getFullYear(), new Date().getMonth(), i + 1, new Date().getHours() - 5).toISOString()
    //un dia mas
    const daySelectPlus = new Date(new Date().getFullYear(), new Date().getMonth(), i + 2, new Date().getHours() - 5).toISOString()

    const filters = [
      {
        "key": "date",
        "options": ">=",
        "type": "Date",
        "value": daySelectIso
      },
      {
        "key": "date",
        "options": "<=",
        "type": "Date",
        "value": daySelectPlus
      }
    ];
    const encodedFilters = encodeURIComponent(JSON.stringify(filters));
    const sales = await UtilsApi({ url: `pedidos/filters?filters=${encodedFilters}`, token, method: `GET` })

    return { day: daySelect, sales: sales.body }
  })
  console.log("🚀 ~ arrayDaysSalesHamburguesa ~ arrayDaysSalesHamburguesa:", arrayDaysSalesHamburguesa)

  const arrayDaysSalesCombo = Array.from({ length: daysInMonth }, async (_, i) => {
    const daySelect = new Date(new Date().getFullYear(), new Date().getMonth(), i + 1).toLocaleDateString()
    return { day: daySelect, sales: 0 }
  })

  const cellRender = (current, info) => {
    //según el dia que sea devolvemos el valor de las ventas de este dia que tenemos en el array

    //dia del calendario actual en isoString sacado de info
    const day = current['$d'].toLocaleDateString()
    const dayObjBurguer = arrayDaysSalesHamburguesa.find(daySales => daySales.day === day)
    const dayObjCombo = arrayDaysSalesCombo.find(daySales => daySales.day === day)
    const burgerSales = dayObjBurguer?.sales ?? '-'
    const comboSales = dayObjCombo?.sales ?? '-'

    return (
      <div>
        <p>Hamburguesas {burgerSales}</p>
        <p>Combos {comboSales}</p>
      </div>
    )
  }

  return (
    <>
      <Layout>
        <ContextProviderRecepcion>

          <NavbarRecepcion
            modoOscuro={context.modoOscuro}
            alternarModo={context.alternarModo}
          />
          <Calendar cellRender={cellRender} startDate={new Date().toISOString().split('T')[0]} />
        </ContextProviderRecepcion >
      </Layout>
    </>
  )
}

export default EstadisticasVentasDelMes