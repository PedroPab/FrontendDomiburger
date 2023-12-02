export const copyTextToClipboard = async (textToCopy) => {
  try {
    await navigator.clipboard.writeText(textToCopy);
    console.log('Texto copiado al portapapeles');
  } catch (err) {
    console.error('Error al copiar texto: ', err);
  }
};