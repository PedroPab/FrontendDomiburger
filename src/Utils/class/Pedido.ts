class Pedido {
  name: string;
  phone: string;
  order: {
    id: string;
    colorPrimary: string;
    price: number;
    name: string;
    description: string;
    imagen: string;
    colorSecondary: string;
    type: string;
    // duration?: { text: string, value: number };
    // distance?: { text: string, value: number };
    modifique: {
      id: string;
      colorPrimary: string;
      price: number;
      name: string;
      active: boolean;
      description: string;
      imagen: string;
      colorSecondary: string;
      dataCreate: {
        _seconds: number;
        _nanoseconds: number;
      };
      dataUpdate: {
        _seconds: number;
        _nanoseconds: number;
      };
      secret: boolean;
      type: string;
    }[];
  }[];
  address: {
    address_complete: string;
    verified: boolean;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  fee: string;
  note: string;
  clientId: string;
  priceTotal: {
    COP: string;
    priceTotal: number;
  };
  pagoConfirmado: {
    time: null | string;
    confirmado: boolean;
  };
  origin: {
    type: string;
    url: string;
    name: string;
  };
  date: {
    "_seconds": number,
    "_nanoseconds": number
  }
  estado: string;
  timelapseStatus: {
    date: string;
    estado: string;
    responsable: string;
  }[];
  numeroDeOrdenDelDia: number;
  duracionEstimada: {
    text: string;
    value: number;
  };
  idUserCreate: string;
  id: string;

  constructor() {
    this.name = "Tracy Carter";
    this.phone = "+573053410804";
    this.order = [
      {
        id: "1",
        colorPrimary: "#4e373d",
        price: 19500,
        name: "Combo",
        description: "Hamburguesa artesanal con papas a la francesa con paprika",
        imagen: "https://cdn.fakercloud.com/avatars/imcoding_128.jpg",
        colorSecondary: "#992475",
        type: "Producto",
        modifique: [
          {
            id: "26",
            colorPrimary: "#725bc8",
            price: 0,
            name: "TARJETA NUEVO",
            active: true,
            description: "Tarjeta de bienvenida para cliente nuevo con iman",
            imagen: "https://cdn.fakercloud.com/avatars/imcoding_128.jpg",
            colorSecondary: "#725bc8",
            dataCreate: { _seconds: 1694392751, _nanoseconds: 692000000 },
            dataUpdate: { _seconds: 1694392751, _nanoseconds: 692000000 },
            secret: false,
            type: "Adicion",
          },
        ],
      },
      {
        price: 3500,
        duration: { text: "16 minutos", value: 16 },
        id: "D3500",
        name: "Domicilio3500",
        imagen: "urlmoto",
        type: "domicilio",
        distance: { text: "0.3 km", value: 343 },
      },
    ];
    this.address = {
      address_complete: "calasdflkijgasdolifhjasoidfle 101 b  # 74 b r",
      verified: false,
      coordinates: { lat: 6.2999347, lng: -75.5764272 },
    };
    this.fee = "Transferencia";
    this.note = "es una prueba web-enabled deposit";
    this.clientId = "1ttnXdAaSxEneaiOFVdi";
    this.priceTotal = { COP: "$23000", priceTotal: 23000 };
    this.pagoConfirmado = { time: null, confirmado: false };
    this.origin = {
      type: "web",
      url: "http://localhost:8087/api/pedidos",
      name: "formClient",
    };
    this.date = {
      "_seconds": 1703977165,
      "_nanoseconds": 928000000
    },
      this.estado = "PendienteConfimacion";
    this.timelapseStatus = [
      {
        date: "2023-12-30T22:59:25.928Z",
        estado: "PendienteConfimacion",
        responsable: "ArceliuzAdmin",
      },
    ];
    this.numeroDeOrdenDelDia = 4;
    this.duracionEstimada = { text: "16 minutos", value: 16 };
    this.idUserCreate = "ArceliuzAdmin";
    this.id = "oMaZoBsPtELoIQkZGaY3";
  }
}

export default Pedido