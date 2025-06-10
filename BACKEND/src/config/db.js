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
    // 'host' es la dirección donde se ejecuta tu servidor PostgreSQL en Aiven.
    // Utiliza variables de entorno (process.env) para mantener la configuración segura
    // y configurable sin cambiar el código directamente.
    // Asegúrate de que tu archivo .env tenga las variables AIVEN_PG_HOST, etc.
    host: process.env.AIVEN_PG_HOST || 'tu_host_aiven.aivencloud.com',
    // 'user' es el nombre de usuario de PostgreSQL en Aiven.
    user: process.env.AIVEN_PG_USER || 'avnadmin',
    // 'password' es la contraseña del usuario de PostgreSQL en Aiven.
    // ¡IMPORTANTE! Asegúrate de que esta variable esté configurada en tu .env.
    password: process.env.AIVEN_PG_PASSWORD || 'tu_contraseña_aiven',
    // 'database' es el nombre de la base de datos a la que tu aplicación se conectará en Aiven.
    database: process.env.AIVEN_PG_DATABASE || 'defaultdb',
    // 'port' es el puerto en el que tu servidor PostgreSQL en Aiven está escuchando.
    port: process.env.AIVEN_PG_PORT || 10814, // El puerto de Aiven suele ser diferente al 5432
    // 'ssl' es crucial para Aiven, ya que la mayoría de los servicios en la nube requieren SSL/TLS.
    ssl: {
        // Rechaza certificados no autorizados, esto es más seguro para producción.
        // Si tienes problemas de conexión, podrías cambiarlo temporalmente a false
        // durante la depuración, pero no lo dejes así en producción.
        rejectUnauthorized: false, 
    },
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
        console.log('Conectado a la base de datos PostgreSQL en Aiven exitosamente!');
        // Libera el cliente de vuelta al pool inmediatamente después de la prueba.
        // Esto es crucial para no agotar las conexiones disponibles.
        client.release();
    } catch (err) {
        // Si hay un error al conectar, muestra el error y termina la aplicación.
        // Una aplicación backend no puede funcionar sin acceso a su base de datos.
        console.error('Error al conectar a la base de datos en Aiven:', err);
        process.exit(1); // Sale de la aplicación con un código de error
    }
}

// Exporta el pool de conexiones y la función de prueba para que puedan ser usados
// en otras partes de tu aplicación (como app.js y tus controladores).
module.exports = { pool, testDbConnection };