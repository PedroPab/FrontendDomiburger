



export const agregarAlerta = ({ itemsAlerts, setItesmAlert, newAlert }) => {
  const newItemsAlert = [
    ...itemsAlerts,
    newAlert
  ]
  console.log("🚀 ~ file: alert.jsx:10 ~ agregarAlerta ~ newItemsAlert:", newItemsAlert)

  setItesmAlert(newItemsAlert)
}


export const retirarAlerta = ({ itemsAlerts, setItesmAlert, newAlert }) => {
  const index = itemsAlerts.findIndex(e => e.id == newAlert.id)
  const rta = itemsAlerts.slice(index, 1)
  setItesmAlert(rta)

}