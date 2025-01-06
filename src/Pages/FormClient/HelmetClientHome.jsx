import { Helmet } from "react-helmet-async";

const HelmetClientHome = () => {
  return (
    <Helmet>
      {/* Título de la página */}
      <title>Domiburger, ¡pídela ya!</title>

      {/* Descripción de la página */}
      <meta name="description" content="Pide tu domi en segundos, Hamburguesa artesanal a domicilio" />

      {/* Palabras clave */}
      <meta name="keywords" content="Domi, Domburguer, Hamburguesa, comida, domicilio" />

      {/* Meta para dispositivos móviles */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Charset */}
      <meta charSet="UTF-8" />

      {/* Open Graph */}
      <meta property="og:title" content="Pide Tu Domi" />
      <meta property="og:description" content="Pide tu domi en segundos, Hamburguesa artesanal a domicilio" />
      <meta property="og:url" content="https://www.domiburguer.com" />
      <meta property="og:image" content="https://www.domiburguer.com/img/amorYAmistad.png" />
      <meta property="og:type" content="website" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="300" />
      <meta property="og:image:height" content="206" />

      {/* Favicon */}
      <link rel="icon" type="image/png" sizes="32x32" href="./../otros/logo_32x32-05.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="./../otros/logo_32x32-05.png" />

      {/* Web Manifest */}
      <link rel="manifest" href="./../otros/site.webmanifest" />
      <meta name="theme-color" content="#ffffff" />

      <html lang="es" />

    </Helmet>
  );
}

export { HelmetClientHome }