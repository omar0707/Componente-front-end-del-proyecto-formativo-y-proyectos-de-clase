/**
 * Semilla de Datos Iniciales para CanStyling (Front-End React)
 * Refleja el esquema relacional con Anti-IDOR, multi-telefonos y soporte multimedia.
 */

export const INITIAL_SERVICES = [
  { idServicio: 1, nombreServicio: "Baño Básico e Higiene", precioBase: 35000, duracion: 45, descripcion: "Shampoo hipoalergénico, secado, uñas y oídos" },
  { idServicio: 2, nombreServicio: "Corte Comercial y Estilizado", precioBase: 55000, duracion: 75, descripcion: "Baño completo + corte de pelo con tijera según raza" },
  { idServicio: 3, nombreServicio: "Spa Canino y Deslanado", precioBase: 70000, duracion: 90, descripcion: "Hidratación profunda, ozonoterapia y retiro de subpelo" },
  { idServicio: 4, nombreServicio: "Profilaxis Dental Preventiva", precioBase: 25000, duracion: 30, descripcion: "Limpieza con spray enzimático y cepillado dental" }
];

export const INITIAL_CLIENTS = [
  {
    idCliente: 1,
    tipoDocumento: "CC",
    numeroDocumento: "1067890123",
    nombres: "Laura",
    apellidos: "Martínez Pérez",
    correo: "laura.martinez@gmail.com",
    direccion: "Calle 44 # 12-30",
    ciudad: "Montería",
    telefonos: [
      { id: 101, numero: "3001112233", tipo: "WHATSAPP", esPrincipal: true, verificado: true },
      { id: 102, numero: "3145556677", tipo: "MOVIL", esPrincipal: false, verificado: false }
    ],
    mascotas: [
      { idMascota: 1, nombre: "Toby", raza: "Poodle (Caniche)", tamano: "PEQUENO", edad: 3, peso: 5.5, color: "Blanco", alergias: "Piel sensible a perfumes" }
    ]
  },
  {
    idCliente: 2,
    tipoDocumento: "CC",
    numeroDocumento: "1067890456",
    nombres: "Andrés",
    apellidos: "Sánchez Doria",
    correo: "andres.sanchez@hotmail.com",
    direccion: "Cra 6 # 28-15",
    ciudad: "Montería",
    telefonos: [
      { id: 201, numero: "3012223344", tipo: "WHATSAPP", esPrincipal: true, verificado: true }
    ],
    mascotas: [
      { idMascota: 2, nombre: "Max", raza: "Golden Retriever", tamano: "GRANDE", edad: 4, peso: 32.0, color: "Dorado", alergias: "Ninguna conocida" }
    ]
  },
  {
    idCliente: 3,
    tipoDocumento: "CC",
    numeroDocumento: "1067890789",
    nombres: "María Fernanda",
    apellidos: "Restrepo",
    correo: "mafe.restrepo@gmail.com",
    direccion: "Barrio El Recreo Calle 60 # 4-20",
    ciudad: "Montería",
    telefonos: [
      { id: 301, numero: "3023334455", tipo: "WHATSAPP", esPrincipal: true, verificado: true },
      { id: 302, numero: "0347890011", tipo: "FIJO", esPrincipal: false, verificado: false }
    ],
    mascotas: [
      { idMascota: 3, nombre: "Luna", raza: "Schnauzer Miniatura", tamano: "PEQUENO", edad: 2, peso: 6.8, color: "Sal y Pimienta", alergias: "Sensible en patitas" }
    ]
  }
];

export const INITIAL_CITAS = [
  {
    idCita: 1,
    idCliente: 1,
    nombreCliente: "Laura Martínez Pérez",
    telefonoCliente: "3001112233",
    idMascota: 1,
    nombreMascota: "Toby",
    razaMascota: "Poodle (Caniche)",
    idServicio: 2,
    nombreServicio: "Corte Comercial y Estilizado",
    fechaHora: "2026-09-22 09:00",
    estado: "EN_PROCESO", // PENDIENTE, CONFIRMADA, EN_PROCESO, COMPLETADA
    valorTotal: 55000,
    tokenAcceso: "e4b2d18a-78f9-4c12-98ab-34cd56ef7890", // Anti-IDOR
    observacionesRecepcion: "Corte bajito en el lomo y pompones en patitas",
    observacionesEntrega: "",
    peluquero: "Carlos Gómez (Estilista Senior)",
    fotos: {
      antes: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80",
      despues: null
    }
  },
  {
    idCita: 2,
    idCliente: 2,
    nombreCliente: "Andrés Sánchez Doria",
    telefonoCliente: "3012223344",
    idMascota: 2,
    nombreMascota: "Max",
    razaMascota: "Golden Retriever",
    idServicio: 3,
    nombreServicio: "Spa Canino y Deslanado",
    fechaHora: "2026-09-22 11:30",
    estado: "PENDIENTE",
    valorTotal: 70000,
    tokenAcceso: "a1f8c9e2-4b3d-42e1-87ef-12ab34cd5678",
    observacionesRecepcion: "Deslanado profundo por cambio de estación",
    observacionesEntrega: "",
    peluquero: "Carlos Gómez",
    fotos: {
      antes: null,
      despues: null
    }
  },
  {
    idCita: 3,
    idCliente: 3,
    nombreCliente: "María Fernanda Restrepo",
    telefonoCliente: "3023334455",
    idMascota: 3,
    nombreMascota: "Luna",
    razaMascota: "Schnauzer Miniatura",
    idServicio: 1,
    nombreServicio: "Baño Básico e Higiene",
    fechaHora: "2026-09-21 15:00",
    estado: "COMPLETADA",
    valorTotal: 35000,
    tokenAcceso: "c9d8e7f6-5a4b-3c2d-1e0f-9876543210ab",
    observacionesRecepcion: "Baño medicado y corte de uñas con cuidado",
    observacionesEntrega: "Servicio finalizado con éxito, perrita muy tranquila y pelaje sedoso.",
    peluquero: "Carlos Gómez",
    fotos: {
      antes: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=600&q=80",
      despues: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80"
    }
  }
];
