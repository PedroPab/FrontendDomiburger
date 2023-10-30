function cambiarTema(activar) {
  const htmlElement = document.querySelector('html');

  if (activar) {
    htmlElement.setAttribute('data-bs-theme', 'dark');
  } else {
    htmlElement.removeAttribute('data-bs-theme');
  }
}


export { cambiarTema }