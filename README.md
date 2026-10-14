# Evidencia GA7-220501096-AA4-EV03: Componente Front-End del Proyecto Formativo

**Programa de Formacion:** Analisis y Desarrollo de Software (ADSO)  
**Ficha:** 3186645  
**Aprendiz:** Omar Ulpiano Molina Malaver  
**Instructor:** Adonay Sanchez Vertel  
**Centro de Formacion:** Centro Agropecuario y de Biotecnologia El Porvenir (SENA - Regional Cordoba / Monteria)  
**Proyecto:** Sistema de Gestion para Peluqueria Canina - *CanStyling*  
**Fecha:** Septiembre de 2026  

---

## 1. Descripcion de la Evidencia

La presente evidencia corresponde al diseño y construccion del **componente Front-End interactivo y responsivo** para el sistema *CanStyling*, desarrollado con **React**, **DataTables** y diseño estetico adaptado a la identidad corporativa de la peluqueria canina, articulando la arquitectura de componentes y cumpliendo con las Fases 3 y 5 de la planificacion tecnica:

### Modulos Principales Desarrollados:
1. **Panel General (Dashboard)**: Metricas en vivo de turnos del dia, estados de citas, ingresos estimados y catalogo de servicios.
2. **Tabla Interactiva de Turnos (DataTables)**: Busqueda reactiva en tiempo real, filtros por estado (`PENDIENTE`, `EN_PROCESO`, `COMPLETADA`), visualizacion y copiado directo de **Tokens Anti-IDOR**.
3. **Fase 3 - Web App Movil del Peluquero (Operacion y Fotos)**:
   - Interfaz *Mobile-First* adaptada a dispositivos moviles.
   - Captura de fotos mediante camara HTML5 (`<input type="file" accept="image/*" capture="environment">`) para el **"Antes"** (al recibir la mascota) y el **"Despues"** (al finalizar el corte).
   - Boton de cierre de servicio que actualiza el estado a `COMPLETADA` y dispara la generacion del enlace para el dueño.
4. **Fase 5 - Album Digital del Cliente (Anti-IDOR)**:
   - Vista web donde el propietario aprecia la transformacion de su mascota con comparador visual interactivo.
   - Acceso estrictamente protegido por **Token Criptografico UUID impredecible** (`/album?token=...`), bloqueando la enumeracion no autorizada de identificadores.
5. **Autenticacion Modal y Login OTP**:
   - Acceso por contraseña tradicional y autenticacion Passwordless mediante codigo OTP de 6 digitos con simulacion de temporizador y limite de intentos.

---

## 2. Estructura de Componentes React

```
GA7-220501096-AA4-EV03_Componente_Frontend_React/
│
├── package.json                                   # Definicion del paquete y dependencias React/DataTables
├── index.html                                     # Entrada web con soporte para ejecucion nativa en navegadores
├── README.md                                      # Sustentacion tecnica de la evidencia
│
└── src/
    ├── App.jsx                                    # Componente raiz y orquestador del estado global
    ├── styles/
    │   └── index.css                              # Estilos personalizados (Glassmorphism, Badges, Frame Movil)
    ├── data/
    │   └── mockData.js                            # Semilla de datos sincronizada con el modelo MySQL
    └── components/
        ├── Navbar.jsx                             # Barra de navegacion con perfil y selector de vistas
        ├── Dashboard.jsx                          # Panel de metricas y accesos rapidos
        ├── CitasDataTable.jsx                     # Tabla interactiva DataTables de turnos y tokens
        ├── ClientesDataTable.jsx                  # Directorio de clientes, multi-telefono y mascotas
        ├── PeluqueroMobileApp.jsx                 # WebApp movil con camara HTML5 Antes/Despues
        ├── AlbumDigitalCliente.jsx                # Album digital para clientes con Token UUID
        ├── AgendarCitaModal.jsx                   # Modal de agendamiento con calculo automatico
        └── LoginModal.jsx                         # Modal de acceso con contraseña y codigo OTP
```

---

## 3. Estandares de Codificacion y Calidad

* **Componentes Funcionales y Hooks:** Empleo de React 18 con `useState`, `useEffect` y manejo de eventos declarativos.
* **Diseño Responsivo (Mobile-First):** Estilos fluidos basados en Flexbox y CSS Grid que garantizan una experiencia optima en celulares, tablets y computadores de escritorio.
* **Separacion de Responsabilidades:** Componentes atomicos e independientes para la tabla de datos, modales y simulador movil.
* **Manejo de Errores y Estados Vacios:** Feedback visual al usuario ante busquedas sin resultados o tokens inexistentes.

---

## 4. Guia de Ejecucion y Visualizacion

### Metodo Inmediato (Sin requerir instalacion previa de Node.js):
1. Ingrese a la carpeta `GA7-220501096-AA4-EV03_Componente_Frontend_React/`.
2. Abra el archivo `index.html` en cualquier navegador web moderno (Google Chrome, Microsoft Edge, Mozilla Firefox).
3. La aplicacion React se inicializara de forma instantanea gracias a la carga modular de Babel Standalone.

### Flujo de Prueba Recomendado:
1. **Navegacion:** Explore el *Dashboard* y dirijase a la pestaña **Turnos (DataTable)**.
2. **Filtrado:** Use la barra de busqueda o los botones de estado (`Pendientes`, `Completadas`) para ver el filtrado en tiempo real.
3. **WebApp Movil:** Cambie a la vista **WebApp Peluquero**, seleccione un turno, haga clic en *Tomar Foto* para el Antes y Despues, y presione *Finalizar y Notificar Cliente*.
4. **Album Anti-IDOR:** Abra la pestaña **Album Cliente** y pruebe cambiar el token en la barra superior para verificar el bloqueo ante tokens invalidos.
