class RoutesClass {
  constructor() {
    this.path
    this.routes
  }
}

class RecepcionRoutes extends RoutesClass {
  constructor() {
    super()
    this.path = `/recepcion`
    this.routes = {
      CONTABILIDAD: `${this.path}/contabilidad`,
      MAP_RECEPCION: `${this.path}/mapRecepcion`,
      FORM_ADMIN: `${this.path}/formAdmin`,
      PEDIDOS: `${this.path}/pedidos`,
      PEDIDOS_DETAIL: `${this.path}/pedidos/:id`,
      PRODUCTOS_ADMIN: `${this.path}/productosAdmin`,
      CREATE_PRODUCT: `${this.path}/createProduct`,
      CLIENTES: `${this.path}/clientes`
    }
  }
}

class EstadisticasRoutes extends RoutesClass {
  constructor() {
    super()
    this.path = `/recepcion/estadisticas`
    this.routes = {
      ESTADISTICAS_DOMICILIARIOS: `${this.path}/domiciliarios`,
      ESTADISTICAS_VENTAS_HOY: `${this.path}/ventas/hoy`,
      ESTADISTICAS_CLIENTES: `${this.path}/clientes`,
    }
  }
}

class CodigoRoutes extends RoutesClass {
  constructor() {
    super()
    this.path = `/recepcion/codigos`
    this.routes = {
      CODIGOS: `${this.path}`,
      CREATE_CODIGO_REFERIDO: `${this.path}/crearCodigoReferido`,
      CREATE_CODIGO_YA_CREADO: `${this.path}/crearCodigoYaCreado`,
      BUSCAR_CODIGOS: `${this.path}/buscar`,
      EDITAR_CODIGO: `${this.path}/editar/:id`
    }
  }
}

class DomiciliarioRoutes extends RoutesClass {
  constructor() {
    super()
    this.path = `/domiciliario`
    this.routes = {
      DOMICILIARIO_HISTORY: `${this.path}/history`
    }
  }
}

class CocinaRoutes extends RoutesClass {
  constructor() {
    super()
    this.path = `/cocina`
    this.routes = {}
  }
}

class UserRoutes extends RoutesClass {
  constructor() {
    super()
    this.path = `/me`
    this.routes = {
      PROFILE: `${this.path}`,
      LOCATIONS: `${this.path}/ubicaciones`,
      CREATE_LOCATION: `${this.path}/ubicaciones/crear`,
      CREATE_ORDER: `${this.path}/pedidos/crear`,
    }
  }
}

class LoginRoutes extends RoutesClass {
  constructor() {
    super()
    this.path = `/login`
    this.routes = {
      LOGIN_AUTH: `${this.path}/auth`,
    }
  }
}

class AdminRoutes extends RoutesClass {
  constructor() {
    super()
    this.path = `/admin`
    this.routes = {
      USER_MANAGEMENT: `${this.path}/usuarios`,
      PRODUCT_MANAGEMENT: `${this.path}/productos`,
      KITCHEN_MANAGEMENT: `${this.path}/cocinas`,
      KITCHEN_CREATE: `${this.path}/cocinas/crear`,
    }
  }
}

const RECEPCION_ROUTES = new RecepcionRoutes()
const ESTADISTICAS_ROUTES = new EstadisticasRoutes()
const CODIGO_ROUTES = new CodigoRoutes()
const DOMICILIARIO_ROUTES = new DomiciliarioRoutes()
const COCINA_ROUTES = new CocinaRoutes()
const USER_ROUTES = new UserRoutes()
const LOGIN_ROUTES = new LoginRoutes()
const ADMIN_ROUTES = new AdminRoutes()

export {
  RECEPCION_ROUTES,
  ESTADISTICAS_ROUTES,
  CODIGO_ROUTES,
  DOMICILIARIO_ROUTES,
  COCINA_ROUTES,
  USER_ROUTES,
  LOGIN_ROUTES,
  ADMIN_ROUTES,
}
