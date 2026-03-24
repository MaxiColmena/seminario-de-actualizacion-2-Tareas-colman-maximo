# Seminario de Actualización 2 - Tareas Colman Máximo

## Descripción del Proyecto

Este proyecto es una aplicación web simple para el registro de alumnos. Permite a los usuarios agregar, ver y eliminar datos de estudiantes (nombre, edad y nota) de manera temporal en memoria. La aplicación utiliza un servidor backend en Node.js con Express y un frontend básico en HTML.

La aplicación identifica a los usuarios mediante cookies para mantener sesiones independientes, almacenando los datos en memoria por usuario.

## Contexto de la Tarea

En este ejercicio, se simula el funcionamiento básico de una infraestructura de red real: un servidor que publica sitios web y otro que resuelve nombres de dominio. Ambos servicios se levantan completamente a mano, sin instaladores ni asistentes.

### Roles
- **Máquina A**: Levanta Apache o Nginx con tres sitios virtuales configurados manualmente.
- **Máquina B**: Levanta CoreDNS o Unbound, resolviendo los tres dominios hacia la IP de la Máquina A.

Un tercer equipo o el docente actúa como cliente, configurando su DNS para apuntar a la Máquina B.

### Objetivo General
Que cualquier máquina de la red con el DNS configurado hacia la Máquina B pueda cargar los tres sitios web desde la Máquina A usando nombres de dominio, sin modificar el archivo hosts.

### Lo que debe funcionar al final
Desde el cliente externo, con DNS apuntando a la Máquina B:
- `http://www.ipfformosa.com` → Carga el sitio desde Máquina A
- `http://www.fiestaipf2026.com` → Carga el sitio desde Máquina A
- `http://www.climaformosa.com` → Carga el sitio desde Máquina A

Este proyecto actual representa una implementación básica de un sitio web (la Máquina A), pero el foco principal del seminario es la configuración de servidores web y DNS.

## Cómo Clonar el Repositorio

Para clonar este repositorio, ejecuta el siguiente comando en tu terminal:

```bash
git clone https://github.com/MaxiColmena/seminario-de-actualizacion-2-Tareas-colman-maximo.git
```

Luego, navega al directorio del proyecto:

```bash
cd seminario-de-actualizacion-2-Tareas-colman-maximo
```

## Cómo Ejecutar el Proyecto

### Prerrequisitos
- Node.js instalado (versión 14 o superior).
- npm (viene con Node.js).

### Instalación de Dependencias
Instala las dependencias del proyecto:

```bash
npm install
```

Esto instalará Express y otras dependencias necesarias.

### Ejecutar el Servidor
Para iniciar el servidor, ejecuta:

```bash
npm run dev
```

O directamente:

```bash
node ServidorWeb/server.js
```

El servidor se ejecutará en el puerto 3000. Puedes acceder a la aplicación en:
- **Local**: `http://localhost:3000`
- **En red**: `http://<TU-IP>:3000` (escucha en todas las interfaces).

### Funcionalidad de la Aplicación
- **Página principal**: Un formulario HTML simple para registrar alumnos.
- **API REST**:
  - `GET /api/alumnos`: Devuelve la lista de alumnos del usuario actual.
  - `POST /api/alumnos`: Agrega un nuevo alumno (requiere JSON con `nombre`, `edad`, `nota`).
  - `DELETE /api/alumnos`: Elimina todos los alumnos del usuario actual.
- **Sesiones**: Los datos se almacenan en memoria por sesión de usuario, identificada por cookies.

### Detener el Servidor
Presiona `Ctrl + C` en la terminal donde se ejecuta el servidor.

## Estructura del Proyecto
```
seminario-de-actualizacion-2-Tareas-colman-maximo/
├── package.json          # Configuración de dependencias y scripts
├── ServidorWeb/
│   ├── index.html        # Interfaz de usuario (frontend)
│   └── server.js         # Servidor backend (Express)
└── README.md             # Este archivo
```

## Tecnologías Utilizadas
- **Backend**: Node.js, Express.js
- **Frontend**: HTML, JavaScript (vanilla)
- **Almacenamiento**: En memoria (temporal, por sesión)

## Notas Adicionales
- Los datos no persisten entre reinicios del servidor (almacenamiento en memoria).
- La aplicación está diseñada para fines educativos y de demostración.
- Para el seminario completo, consulta las instrucciones para configurar Apache/Nginx y CoreDNS/Unbound en las máquinas A y B.

Si tienes preguntas o problemas, abre un issue en el repositorio de GitHub.