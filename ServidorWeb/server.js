// Servidor backend para la aplicación de registro de alumnos
// Funcionalidades principales:
// 1. Sirve la interfaz de usuario (página HTML)
// 2. Gestiona el almacenamiento temporal de datos de alumnos en memoria
// 3. Identifica usuarios mediante cookies para persistencia por sesión
// 4. Escucha en todas las interfaces de red para accesibilidad externa

// Importación de módulos necesarios
const express = require('express');
const crypto  = require('crypto');   // Para generar identificadores únicos
const path    = require('path');

const app  = express();
const PORT = 3000;

// Almacenamiento en memoria para datos de alumnos
// Estructura: objeto donde cada clave es un userId único
// y el valor es un array de arrays [nombre, edad, nota]
// Ejemplo: { "abc123": [["Juan", 20, 9], ["María", 22, 7]] }
const datos = {};

// Configuración de middlewares de Express
// Permite el procesamiento de JSON en el cuerpo de las solicitudes POST
app.use(express.json());

// Sirve archivos estáticos desde el directorio actual
app.use(express.static(path.join(__dirname)));

// Middleware para identificación de usuarios mediante cookies
// Lee la cookie 'userId' de la solicitud
// Si no existe, genera un nuevo ID único y lo establece como cookie
// Esto permite que cada navegador mantenga su propia sesión de datos
app.use((req, res, next) => {
    // Parsear las cookies del header de la solicitud
    const cookies = {};
    if (req.headers.cookie) {
        req.headers.cookie.split(';').forEach(c => {
            const [clave, valor] = c.trim().split('=');
            cookies[clave] = valor;
        });
    }

    if (cookies.userId) {
        // Usuario ya identificado con ID existente
        req.userId = cookies.userId;
    } else {
        // Primera visita: generar nuevo identificador único
        req.userId = crypto.randomUUID();
        // Establecer cookie en la respuesta del navegador
        res.cookie('userId', req.userId, {
            maxAge: 365 * 24 * 60 * 60 * 1000, // Duración de 1 año
            httpOnly: false,
            path: '/'
        });
    }

    // Inicializar array vacío si el usuario no tiene datos previos
    if (!datos[req.userId]) {
        datos[req.userId] = [];
    }

    next(); // Continuar con el siguiente middleware o ruta
});

// Definición de rutas de la API REST

// GET /api/alumnos - Devuelve todos los alumnos del usuario actual
app.get('/api/alumnos', (req, res) => {
    res.json(datos[req.userId]);
});

// POST /api/alumnos - Agrega un nuevo alumno
// Espera un body JSON con: { "nombre": "string", "edad": number, "nota": number }
app.post('/api/alumnos', (req, res) => {
    const { nombre, edad, nota } = req.body;

    // Validar que todos los campos requeridos estén presentes y sean válidos
    if (!nombre || isNaN(edad) || isNaN(nota)) {
        return res.status(400).json({ error: 'Datos incompletos o inválidos' });
    }

    // Almacenar el nuevo alumno como array [nombre, edad, nota]
    datos[req.userId].push([nombre, Number(edad), Number(nota)]);

    // Responder con el array actualizado de alumnos
    res.json(datos[req.userId]);
});

// DELETE /api/alumnos - Elimina todos los alumnos del usuario actual
app.delete('/api/alumnos', (req, res) => {
    datos[req.userId] = [];
    res.json([]);
});

// Iniciar el servidor
// Escucha en todas las interfaces de red (0.0.0.0) para permitir conexiones externas
app.listen(PORT, '0.0.0.0', () => {
    console.log('=========================================');
    console.log(`  Servidor ejecutándose en el puerto ${PORT}`);
    console.log(`  Acceso local:   http://localhost:${PORT}`);
    console.log('  Acceso en red:  http://<TU-IP>:' + PORT);
    console.log('=========================================');
});
