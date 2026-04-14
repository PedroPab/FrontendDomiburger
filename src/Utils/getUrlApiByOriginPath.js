const ENV = import.meta.env;

class UrlManager {
  static isDevelopment() {
    return ENV.DEV || ENV.VITE_NODE_ENV === "development";
  }

  static isLocalhost(url) {
    if (!url) return false;
    return url.includes("localhost") || url.includes("127.0.0.1");
  }

  static normalizeUrl(url) {
    if (!url) return url;
    return url.endsWith("/") ? url.slice(0, -1) : url;
  }

  static getCurrentHostname() {
    if (typeof window === "undefined") return null;
    return window.location.hostname;
  }

  static createCompatibleUrl(rawUrl) {
    const apiUrl = new URL(rawUrl);
    const currentHostname = this.getCurrentHostname();

    if (!currentHostname) {
      return this.normalizeUrl(rawUrl);
    }

    apiUrl.hostname = currentHostname;
    return this.normalizeUrl(apiUrl.toString());
  }

  static resolveInternalUrl(rawUrl) {
    const normalizedUrl = this.normalizeUrl(rawUrl);

    if (!normalizedUrl) {
      return normalizedUrl;
    }

    if (!this.isDevelopment() || !this.isLocalhost(normalizedUrl)) {
      return normalizedUrl;
    }

    return this.createCompatibleUrl(normalizedUrl);
  }

  static getBackendUrl() {
    return this.resolveInternalUrl(ENV.VITE_HOST_API);
  }

  static getCodesUrl() {
    return this.resolveInternalUrl(ENV.VITE_HOST_CODES);
  }

  static getSocketUrl() {
    return this.resolveInternalUrl(ENV.VITE_HOST_WEB_SOCKET);
  }

  static getAuthUrl() {
    return this.resolveInternalUrl(ENV.VITE_HOST_AUTH);
  }
}

export const getUrlBackend = () => UrlManager.getBackendUrl();
export const getUrlCodigos = () => UrlManager.getCodesUrl();
export const getUrlSocket = () => UrlManager.getSocketUrl();
export const getUrlAuth = () => UrlManager.getAuthUrl();
