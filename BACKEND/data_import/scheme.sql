-- *** ORDEN DE CREACIÓN DE TABLAS ***
-- There are several mistakes in this script

-- 1. Tabla de Usuarios
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

-- 2. Tabla de Juegos
CREATE TABLE games (
    game_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100), -- Considerar una tabla 'game_types' si hay muchos tipos únicos y quieres normalizar más
    rating NUMERIC(3,1),
    price NUMERIC(10,2),
    popularity INTEGER,
    release_year INTEGER,
    thumbnail VARCHAR(255)
);

-- 3. Tabla de Etiquetas (lo que antes llamabas Géneros/Temáticas en el otro set)
CREATE TABLE labels (
    label_id SERIAL PRIMARY KEY,
    label_name VARCHAR(255) UNIQUE NOT NULL
);

-- 4. Tabla de Plataformas
CREATE TABLE platforms (
    platform_id SERIAL PRIMARY KEY,
    platform_name VARCHAR(255) UNIQUE NOT NULL
);

-- 5. Tabla de Modos de Juego
CREATE TABLE play_modes (
    mode_id SERIAL PRIMARY KEY,
    mode_name VARCHAR(255) UNIQUE NOT NULL
);

-- 6. Tabla de Unión: Juegos y Etiquetas (Muchos a Muchos)
CREATE TABLE game_labels (
    game_id INTEGER REFERENCES games(game_id),
    label_id INTEGER REFERENCES labels(label_id),
    PRIMARY KEY (game_id, label_id)
);

-- 7. Tabla de Unión: Juegos y Plataformas (Muchos a Muchos)
CREATE TABLE game_platforms (
    game_id INTEGER REFERENCES games(game_id),
    platform_id INTEGER REFERENCES platforms(platform_id),
    PRIMARY KEY (game_id, platform_id)
);

-- 8. Tabla de Unión: Juegos y Modos de Juego (Muchos a Muchos)
CREATE TABLE game_play_modes (
    game_id INTEGER REFERENCES games(game_id),
    mode_id INTEGER REFERENCES play_modes(mode_id),
    PRIMARY KEY (game_id, mode_id)
);

-- 9. Tabla de Unión: Juegos y Dueños (asumiendo que los dueños son usuarios)
CREATE TABLE game_owners (
    game_id INTEGER REFERENCES games(game_id),
    user_id INTEGER REFERENCES users(user_id),
    PRIMARY KEY (game_id, user_id)
);

-- (Opcional) Si en algún momento necesitas tabla para "Búsquedas" o "Resultados de Búsqueda"
-- CREATE TABLE searches (
--     search_id SERIAL PRIMARY KEY,
--     user_id INTEGER REFERENCES users(user_id), -- Si las búsquedas son de usuarios específicos
--     query_text TEXT NOT NULL,
--     search_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE search_results (
--     result_id SERIAL PRIMARY KEY,
--     search_id INTEGER REFERENCES searches(search_id),
--     game_id INTEGER REFERENCES games(game_id),
--     -- Otros detalles del resultado, ej. position_in_results
-- );