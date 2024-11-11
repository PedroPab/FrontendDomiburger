const ENV = import.meta.env

class UrlManager {
  static isLocalhost(url) {
    return url.includes('localhost') || url.includes('127.0.0.1');
  }

  static getCurrentHost() {
    return window.location.host;
  }
  static createCompatibleUrl(urlApiBackend, path) {
    const protocol = urlApiBackend.startsWith('https') ? 'https' : 'http';
    const port = new URL(urlApiBackend).port;
    const path_sin_port = path.replace(/:\d+/, '');
    return urlApiBackend.replace(/(http|https):\/\/[^]+/, `${protocol}://${path_sin_port}${port ? `:${port}` : ''}`);
  }

  static modifyUrl(url) {
    const currentHost = this.getCurrentHost();
    const isLocalPath = this.isLocalhost(currentHost);

    if (this.isLocalhost(url)) {
      return isLocalPath ? url : this.createCompatibleUrl(url, currentHost);
    }

    return url;
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
}

export const getUrlBackend = () => UrlManager.getBackendUrl();
export const getUrlCodigos = () => UrlManager.getCodesUrl();
export const getUrlSocket = () => UrlManager.getSocketUrl();
