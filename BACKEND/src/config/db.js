// backend/src/config/db.js

// Importa la librería pg para PostgreSQL.
// Esto permite usar async/await para operaciones de base de datos,
// lo que hace el código más limpio y fácil de leer.
const { Pool } = require('pg');

// Crea un pool de conexiones a la base de datos PostgreSQL.
// Un pool es un conjunto de conexiones que se mantienen abiertas y listas para ser usadas.
// Esto mejora el rendimiento porque no se necesita abrir y cerrar una conexión
// para cada petición a la base de datos.
const pool = new Pool({
    // 'host' es la dirección donde se ejecuta tu servidor PostgreSQL.
    // Utiliza variables de entorno (process.env) para mantener la configuración segura
    // y configurable sin cambiar el código directamente.
    // Si la variable de entorno no está definida, usa 'localhost' como predeterminado.
    host: process.env.DB_HOST || 'localhost',
    // 'user' es el nombre de usuario de PostgreSQL.
    user: process.env.DB_USER || 'postgres',
    // 'password' es la contraseña del usuario de PostgreSQL.
    // ¡IMPORTANTE! Asegúrate de cambiar 'your_postgres_password' por tu contraseña real.
    // Nunca hardcodes contraseñas en código de producción.
    password: process.env.DB_PASSWORD || 'your_postgres_password',
    // 'database' es el nombre de la base de datos a la que tu aplicación se conectará.
    database: process.env.DB_NAME || 'mi_app_db',
    // 'port' es el puerto en el que tu servidor PostgreSQL está escuchando.
    // El puerto predeterminado de PostgreSQL es 5432.
    port: process.env.DB_PORT || 5432,
    // 'max' es el número máximo de conexiones que el pool puede mantener
    // abiertas al mismo tiempo. Un valor típico es 10 o 20, dependiendo de la carga esperada.
    max: 10,
    // 'idleTimeoutMillis' cierra los clientes inactivos después de 30 segundos.
    idleTimeoutMillis: 30000,
});

// Función asíncrona para probar la conexión a la base de datos.
// Se ejecutará al iniciar tu aplicación para verificar que todo esté configurado correctamente.
async function testDbConnection() {
    try {
        // Intenta obtener una conexión del pool.
        const client = await pool.connect();
        console.log('Conectado a la base de datos PostgreSQL exitosamente!');
        // Libera el cliente de vuelta al pool inmediatamente después de la prueba.
        // Esto es crucial para no agotar las conexiones disponibles.
        client.release();
    } catch (err) {
        // Si hay un error al conectar, muestra el error y termina la aplicación.
        // Una aplicación backend no puede funcionar sin acceso a su base de datos.
        console.error('Error al conectar a la base de datos:', err);
        process.exit(1); // Sale de la aplicación con un código de error
    }
}

// Exporta el pool de conexiones y la función de prueba para que puedan ser usados
// en otras partes de tu aplicación (como app.js y tus controladores).
module.exports = { pool, testDbConnection };