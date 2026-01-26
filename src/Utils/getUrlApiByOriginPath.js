const ENV = import.meta.env

class UrlManager {
  static isLocalhost(url) {
    return url.includes('localhost') || url.includes('127.0.0.1');
  }

  static getCurrentHost() {
    return window.location.origin;

  }
  static createCompatibleUrl(apiUrl, dominioActual) {
    // Crear objetos URL a partir de las URLs proporcionadas
    const urlApi = new URL(apiUrl);
    const portApi = urlApi.port;
    const protocoloApi = urlApi.protocol;
    const pathApi = urlApi.pathname;

    const urlDominio = new URL(dominioActual);
    const hostNameDominioActual = urlDominio.hostname;
    // Combinar el dominio con el puerto y el path de la API
    const nuevaUrl = `${protocoloApi}//${hostNameDominioActual}:${portApi}${pathApi}`;

    // Quitar el '/' del final si lo trae
    return nuevaUrl.endsWith('/') ? nuevaUrl.slice(0, -1) : nuevaUrl;
  }

  static modifyUrl(url) {
    const currentHost = this.getCurrentHost();
    //si estamos en dev, no modificamos la url
    if (ENV.VITE_NODE_ENV === 'production') {
      return url;
    }
    if (!this.isLocalhost(url)) {
      return url;
    }
    return this.createCompatibleUrl(url, currentHost);
  }

  static getBackendUrl() {
    return this.modifyUrl(ENV.VITE_HOST_API);
  }

  static getCodesUrl() {
    return this.modifyUrl(ENV.VITE_HOST_CODES);
  }

  static getSocketUrl() {
    return this.modifyUrl(ENV.VITE_HOST_WEB_SOCKET);
  }
  static getAuthUrl() {
    return this.modifyUrl(ENV.VITE_HOST_AUTH);
  }
}

export const getUrlBackend = () => UrlManager.getBackendUrl();
export const getUrlCodigos = () => UrlManager.getCodesUrl();
export const getUrlSocket = () => UrlManager.getSocketUrl();
export const getUrlAuth = () => UrlManager.getAuthUrl();

