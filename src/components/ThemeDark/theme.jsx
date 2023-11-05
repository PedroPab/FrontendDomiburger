import { useContext } from 'react'

import { MiContexto } from './../../Context'

function CambiarTema() {
  const htmlElement = document.querySelector('html');
  const context = useContext(MiContexto)

  if (context.modoOscuro) {
    htmlElement.setAttribute('data-bs-theme', 'dark');
  } else {
    htmlElement.removeAttribute('data-bs-theme');
  }
  return (
    <>
    </>
  )
}


export { CambiarTema }