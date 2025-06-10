// importData.js

const { Client } = require('pg');
const csv = require('csv-parser');
const fs = require('fs');
require('dotenv').config(); // Carga las variables de entorno desde .env

// --- Configuración de la Base de Datos (PostgreSQL) ---
const dbConfig = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
};

const client = new Client(dbConfig);

// Mapeo de nombres de columnas de CSV a nombres de columnas de la BD (normalizados)
// Esto es CRUCIAL para que los datos del CSV coincidan con las tablas.
const columnMappings = {
    'download (1) - Juegos.csv': {
        csvName: 'Juegos', // Nombre de la hoja/CSV original
        dbTable: 'games',
        map: {
            'game_id': 'game_id',
            'nombre': 'name',
            'desarrollador': 'developer',
            'descripcion': 'description',
            'precio': 'price',
            'fecha_lanzamiento': 'release_date', // Se convertirá a DATE
            'popularidad': 'popularity',
            'mini_imagen': 'thumbnail_image'
        }
    },
    'download (1) - Etiquetas.csv': {
        csvName: 'Etiquetas',
        dbTable: 'labels',
        map: {
            'tag_id': 'label_id',
            'nombre_etiqueta': 'label_name'
        }
    },
    'download (1) - Plataformas.csv': {
        csvName: 'Plataformas',
        dbTable: 'platforms',
        map: {
            'platform_id': 'platform_id',
            'nombre_plataforma': 'platform_name'
        }
    },
    'download (1) - Modos de Juego.csv': {
        csvName: 'Modos de Juego',
        dbTable: 'play_modes',
        map: {
            'mode_id': 'mode_id',
            'nombre': 'mode_name'
        }
    },
    'download (1) - Usuarios.csv': {
        csvName: 'Usuarios',
        dbTable: 'users',
        map: {
            'user_id': 'user_id',
            'nombre': 'name',
            'correo': 'email',
            'fecha_registro': 'registration_date',
            'contraseña': 'password_hash'
        }
    },
    // Tablas de unión (no necesitan mapeo de nombres de columnas si ya coinciden)
    'download (1) - Juegos_Etiquetas.csv': {
        csvName: 'Juegos_Etiquetas',
        dbTable: 'game_labels',
        map: {
            'game_id': 'game_id',
            'tag_id': 'label_id'
        }
    },
    'download (1) - Juegos_Plataformas.csv': {
        csvName: 'Juegos_Plataformas',
        dbTable: 'game_platforms',
        map: {
            'game_id': 'game_id',
            'platform_id': 'platform_id'
        }
    },
    'download (1) - Juegos_Modos.csv': {
        csvName: 'Juegos_Modos',
        dbTable: 'game_play_modes',
        map: {
            'game_id': 'game_id',
            'mode_id': 'mode_id'
        }
    },
    'download (1) - Dueños.csv': { // Asumiendo que esta es la tabla game_owners
        csvName: 'Dueños',
        dbTable: 'game_owners',
        map: {
            'game_id': 'game_id',
            'user_id': 'user_id'
        }
    }
    // Añade más archivos CSV aquí si los necesitas (ej. búsquedas)
};

async function importCsvToDb(csvFilePath, dbTable, mapping) {
    console.log(`Iniciando importación de '${csvFilePath}' a la tabla '${dbTable}'...`);
    const records = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(csvFilePath)
            .pipe(csv({ separator: ';' }))
            .on('data', (data) => records.push(data))
            .on('end', async () => {
                if (records.length === 0) {
                    console.log(`No se encontraron datos en '${csvFilePath}'. Saltando.`);
                    return resolve();
                }

                try {
                    // Mapear nombres de columnas del CSV a los de la BD y preparar los valores
                    const dbColumns = Object.values(mapping);
                    const placeholders = dbColumns.map((_, i) => `$${i + 1}`).join(', ');
                    const insertQuery = `INSERT INTO ${dbTable} (${dbColumns.join(', ')}) VALUES (${placeholders}) ON CONFLICT DO NOTHING`; // Evitar duplicados

                    for (const record of records) {
                        const values = dbColumns.map(dbCol => {
                            const csvCol = Object.keys(mapping).find(key => mapping[key] === dbCol);
                            let value = record[csvCol];

                            // Conversiones de tipo específicas
                            if (dbTable === 'games' && dbCol === 'release_date' && value) {
                                // Convertir fecha a formato YYYY-MM-DD
                                try {
                                    value = new Date(value).toISOString().split('T')[0];
                                } catch (e) {
                                    value = null;
                                }
                            } else if (dbTable === 'games' && (dbCol === 'price' || dbCol === 'popularity') && value) {
                                value = parseFloat(value);
                                if (isNaN(value)) value = null;
                            } else if (dbTable === 'users' && dbCol === 'registration_date' && value) {
                                try {
                                    value = new Date(value).toISOString().split('T')[0];
                                } catch (e) {
                                    value = null;
                                }
                            }

                            return value;
                        });
                        try {
                            await client.query(insertQuery, values);
                        } catch (err) {
                            // Print conflict info and continue
                            console.error(`Conflicto al insertar en la tabla '${dbTable}':`, err.message);
                            console.error('Registro problemático:', record);
                        }
                    }
                    console.log(`Importación de '${csvFilePath}' completada exitosamente.`);
                    // Print the head of the table after import
                    const headResult = await client.query(`SELECT * FROM ${dbTable} LIMIT 5`);
                    console.log(`Primeras filas de la tabla '${dbTable}':`);
                    console.table(headResult.rows);
                    resolve();
                } catch (error) {
                    console.error(`Error durante la importación de '${csvFilePath}' a '${dbTable}':`, error.message);
                    console.log('Fila que causó el error (primera 50 caracteres):', JSON.stringify(records[0]).substring(0, 50) + '...');
                    reject(error);
                }
            })
            .on('error', (error) => {
                console.error(`Error al leer el archivo CSV '${csvFilePath}':`, error.message);
                reject(error);
            });
    });
}

async function cleanDatabase() {
    // El orden es importante por las claves foráneas (primero tablas de unión, luego padres)
    const tables = [
        'game_owners',
        'game_play_modes',
        'game_platforms',
        'game_labels',
        'games',
        'labels',
        'platforms',
        'play_modes',
        'users'
    ];
    for (const table of tables) {
        try {
            await client.query(`TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE`);
            console.log(`Tabla '${table}' limpiada.`);
        } catch (err) {
            console.error(`Error al limpiar la tabla '${table}':`, err.message);
        }
    }
}

async function runImport() {
    try {
        await client.connect();
        console.log('Conexión a la base de datos PostgreSQL establecida.');

        // Limpiar todas las tablas antes de importar
        await cleanDatabase();

        // ORDEN DE IMPORTACIÓN CRÍTICO para respetar las claves foráneas
        // Primero tablas "padre"
        await importCsvToDb('./download (1) - Usuarios.csv', columnMappings['download (1) - Usuarios.csv'].dbTable, columnMappings['download (1) - Usuarios.csv'].map);
        await importCsvToDb('./download (1) - Juegos.csv', columnMappings['download (1) - Juegos.csv'].dbTable, columnMappings['download (1) - Juegos.csv'].map);
        await importCsvToDb('./download (1) - Etiquetas.csv', columnMappings['download (1) - Etiquetas.csv'].dbTable, columnMappings['download (1) - Etiquetas.csv'].map);
        await importCsvToDb('./download (1) - Plataformas.csv', columnMappings['download (1) - Plataformas.csv'].dbTable, columnMappings['download (1) - Plataformas.csv'].map);
        await importCsvToDb('./download (1) - Modos de Juego.csv', columnMappings['download (1) - Modos de Juego.csv'].dbTable, columnMappings['download (1) - Modos de Juego.csv'].map);

        // Luego tablas de unión (que dependen de las tablas padre)
        await importCsvToDb('./download (1) - Juegos_Etiquetas.csv', columnMappings['download (1) - Juegos_Etiquetas.csv'].dbTable, columnMappings['download (1) - Juegos_Etiquetas.csv'].map);
        await importCsvToDb('./download (1) - Juegos_Plataformas.csv', columnMappings['download (1) - Juegos_Plataformas.csv'].dbTable, columnMappings['download (1) - Juegos_Plataformas.csv'].map);
        await importCsvToDb('./download (1) - Juegos_Modos.csv', columnMappings['download (1) - Juegos_Modos.csv'].dbTable, columnMappings['download (1) - Juegos_Modos.csv'].map);
        await importCsvToDb('./download (1) - Dueños.csv', columnMappings['download (1) - Dueños.csv'].dbTable, columnMappings['download (1) - Dueños.csv'].map);

        console.log('\nTodos los procesos de importación han finalizado.');

    } catch (error) {
        console.error('Error general durante la ejecución del script:', error);
    } finally {
        await client.end();
        console.log('Conexión a la base de datos cerrada.');
    }
}

runImport();