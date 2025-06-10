// backend/src/controllers/authController.js

const { pool } = require('../config/db'); // Importa el pool de conexiones
const bcrypt = require('bcryptjs');      // Para hashear y comparar contraseñas
const jwt = require('jsonwebtoken');     // Para generar y verificar JSON Web Tokens (JWT)

// Controlador para el registro de nuevos usuarios
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    // Validación básica de entrada
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    try {
        // 1. Verificar si el nombre de usuario o el email ya existen en la base de datos
        const [existingUserRows] = await pool.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email]);
        if (existingUserRows.length > 0) {
            return res.status(409).json({ message: 'El nombre de usuario o correo electrónico ya está en uso.' });
        }

        // 2. Hashear la contraseña de forma segura
        // bcrypt genera un "salt" (cadena aleatoria) y lo usa para hashear la contraseña.
        // Esto asegura que contraseñas idénticas tengan hashes diferentes.
        const salt = await bcrypt.genSalt(10); // Genera un salt con 10 rondas de hashing
        const passwordHash = await bcrypt.hash(password, salt); // Hashea la contraseña

        // 3. Insertar el nuevo usuario en la base de datos
        const [result] = await pool.query(
            'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
            [username, email, passwordHash]
        );

        // 4. Generar un JSON Web Token (JWT) para el usuario recién registrado
        // El JWT contiene un payload (carga útil) con información del usuario (aquí, solo el ID).
        // Se firma con una clave secreta (JWT_SECRET) para asegurar su autenticidad.
        const token = jwt.sign(
            { id: result.insertId }, // Payload del token: el ID del usuario insertado
            process.env.JWT_SECRET,  // Clave secreta definida en tu archivo .env
            { expiresIn: '1h' }       // El token expirará en 1 hora
        );

        // 5. Enviar respuesta de éxito al cliente
        res.status(201).json({ message: 'Usuario registrado con éxito.', token });

    } catch (error) {
        // Manejo de errores: Si algo sale mal durante el proceso,
        // registra el error y envía una respuesta de error al cliente.
        console.error('Error en el registro:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

// Controlador para el inicio de sesión de usuarios
exports.login = async (req, res) => {
    const { username, password } = req.body;

    // Validación básica de entrada
    if (!username || !password) {
        return res.status(400).json({ message: 'Nombre de usuario y contraseña son obligatorios.' });
    }

    try {
        // 1. Buscar el usuario en la base de datos por nombre de usuario
        const [userRows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        const user = userRows[0]; // El primer (y único) resultado

        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas.' });
        }

        // 2. Comparar la contraseña proporcionada con la contraseña hasheada en la BD
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas.' });
        }

        // 3. Generar un JSON Web Token (JWT) para el usuario logueado
        const token = jwt.sign(
            { id: user.id },       // Payload del token: el ID del usuario
            process.env.JWT_SECRET,  // Clave secreta
            { expiresIn: '1h' }       // El token expirará en 1 hora
        );

        // 4. Enviar respuesta de éxito al cliente con el token y datos básicos del usuario
        res.status(200).json({
            message: 'Inicio de sesión exitoso.',
            token,
            user: { id: user.id, username: user.username, email: user.email }
        });

    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

// Controlador para cerrar sesión (en un sistema JWT)
exports.logout = (req, res) => {
    // En una autenticación basada en JWT, el "logout" real se maneja en el cliente.
    // El cliente simplemente elimina el token JWT de su almacenamiento (ej. localStorage).
    // El backend no necesita hacer nada a menos que implementes una lista negra de tokens (blacklist),
    // lo cual es más complejo y no es común para la mayoría de las aplicaciones.
    res.status(200).json({ message: 'Sesión cerrada exitosamente (token eliminado del cliente).' });
};