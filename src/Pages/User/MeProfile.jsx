import { useAuth } from "../../Context/AuthContext"
import { General } from "../../Layout/General"

export const MeProfile = () => {
  const { usuarioActual } = useAuth()
  console.log(usuarioActual)
  return (
    <General>
      <h1>Me Profile</h1>
      {/* mostar los datos del usuario de manera recurciva */}
      <pre>{JSON.stringify(usuarioActual, null, 2)}</pre>

    </General>
  )
}