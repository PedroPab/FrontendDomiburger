import PlaceAutocomplete from "../PlaceAutocomplete"
const ENV = import.meta.env

const InputAdress = ({ input, direccion, setDireccion }) => {
  const placeChanged = (data) => {
    console.log(data);

    const cordenadas = {
      lat: data.geometry.location.lat(),
      lng: data.geometry.location.lng()
    }
    console.log(`direccion`, direccion);
    // setDireccion({
    //   // ...direccion,
    //   address_complete: data.formatted_address,
    //   coordinates: cordenadas
    // })
    return
  }
  return (
    <>
      <div className="App">
        <PlaceAutocomplete
          KEY={ENV.VITE_KEYMAPS}
          InputAdress={input}
          placeChanged={placeChanged}
        />
      </div>
    </>
  )
}

export default InputAdress