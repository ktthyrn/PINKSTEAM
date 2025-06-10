--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9 (Ubuntu 16.9-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.9 (Ubuntu 16.9-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: game_labels; Type: TABLE; Schema: public; Owner: pinkadmin
--

CREATE TABLE public.game_labels (
    game_id integer NOT NULL,
    label_id integer NOT NULL
);


ALTER TABLE public.game_labels OWNER TO pinkadmin;

--
-- Name: game_owners; Type: TABLE; Schema: public; Owner: pinkadmin
--

CREATE TABLE public.game_owners (
    game_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.game_owners OWNER TO pinkadmin;

--
-- Name: game_platforms; Type: TABLE; Schema: public; Owner: pinkadmin
--

CREATE TABLE public.game_platforms (
    game_id integer NOT NULL,
    platform_id integer NOT NULL
);


ALTER TABLE public.game_platforms OWNER TO pinkadmin;

--
-- Name: game_play_modes; Type: TABLE; Schema: public; Owner: pinkadmin
--

CREATE TABLE public.game_play_modes (
    game_id integer NOT NULL,
    mode_id integer NOT NULL
);


ALTER TABLE public.game_play_modes OWNER TO pinkadmin;

--
-- Name: games; Type: TABLE; Schema: public; Owner: pinkadmin
--

CREATE TABLE public.games (
    game_id integer NOT NULL,
    name character varying(255) NOT NULL,
    type character varying(100),
    rating numeric(3,1),
    price numeric(10,2),
    popularity numeric(3,1),
    release_year integer,
    thumbnail_image character varying(255),
    developer character varying(255),
    description text,
    release_date date
);


ALTER TABLE public.games OWNER TO pinkadmin;

--
-- Name: games_game_id_seq; Type: SEQUENCE; Schema: public; Owner: pinkadmin
--

CREATE SEQUENCE public.games_game_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.games_game_id_seq OWNER TO pinkadmin;

--
-- Name: games_game_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pinkadmin
--

ALTER SEQUENCE public.games_game_id_seq OWNED BY public.games.game_id;


--
-- Name: labels; Type: TABLE; Schema: public; Owner: pinkadmin
--

CREATE TABLE public.labels (
    label_id integer NOT NULL,
    label_name character varying(255) NOT NULL
);


ALTER TABLE public.labels OWNER TO pinkadmin;

--
-- Name: labels_label_id_seq; Type: SEQUENCE; Schema: public; Owner: pinkadmin
--

CREATE SEQUENCE public.labels_label_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.labels_label_id_seq OWNER TO pinkadmin;

--
-- Name: labels_label_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pinkadmin
--

ALTER SEQUENCE public.labels_label_id_seq OWNED BY public.labels.label_id;


--
-- Name: platforms; Type: TABLE; Schema: public; Owner: pinkadmin
--

CREATE TABLE public.platforms (
    platform_id integer NOT NULL,
    platform_name character varying(255) NOT NULL
);


ALTER TABLE public.platforms OWNER TO pinkadmin;

--
-- Name: platforms_platform_id_seq; Type: SEQUENCE; Schema: public; Owner: pinkadmin
--

CREATE SEQUENCE public.platforms_platform_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.platforms_platform_id_seq OWNER TO pinkadmin;

--
-- Name: platforms_platform_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pinkadmin
--

ALTER SEQUENCE public.platforms_platform_id_seq OWNED BY public.platforms.platform_id;


--
-- Name: play_modes; Type: TABLE; Schema: public; Owner: pinkadmin
--

CREATE TABLE public.play_modes (
    mode_id integer NOT NULL,
    mode_name character varying(255) NOT NULL
);


ALTER TABLE public.play_modes OWNER TO pinkadmin;

--
-- Name: play_modes_mode_id_seq; Type: SEQUENCE; Schema: public; Owner: pinkadmin
--

CREATE SEQUENCE public.play_modes_mode_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.play_modes_mode_id_seq OWNER TO pinkadmin;

--
-- Name: play_modes_mode_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pinkadmin
--

ALTER SEQUENCE public.play_modes_mode_id_seq OWNED BY public.play_modes.mode_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: pinkadmin
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    registration_date date DEFAULT CURRENT_DATE,
    password_hash character varying(255)
);


ALTER TABLE public.users OWNER TO pinkadmin;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: pinkadmin
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO pinkadmin;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pinkadmin
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: games game_id; Type: DEFAULT; Schema: public; Owner: pinkadmin
--

ALTER TABLE ONLY public.games ALTER COLUMN game_id SET DEFAULT nextval('public.games_game_id_seq'::regclass);


--
-- Name: labels label_id; Type: DEFAULT; Schema: public; Owner: pinkadmin
--

ALTER TABLE ONLY public.labels ALTER COLUMN label_id SET DEFAULT nextval('public.labels_label_id_seq'::regclass);


--
-- Name: platforms platform_id; Type: DEFAULT; Schema: public; Owner: pinkadmin
--

ALTER TABLE ONLY public.platforms ALTER COLUMN platform_id SET DEFAULT nextval('public.platforms_platform_id_seq'::regclass);


--
-- Name: play_modes mode_id; Type: DEFAULT; Schema: public; Owner: pinkadmin
--

ALTER TABLE ONLY public.play_modes ALTER COLUMN mode_id SET DEFAULT nextval('public.play_modes_mode_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: pinkadmin
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: game_labels; Type: TABLE DATA; Schema: public; Owner: pinkadmin
--

COPY public.game_labels (game_id, label_id) FROM stdin;
1	5
1	6
2	4
2	2
3	9
3	15
4	24
4	6
5	1
5	7
5	12
6	29
6	30
7	24
7	11
7	13
7	16
8	17
8	18
9	19
9	20
9	22
9	23
10	21
11	26
11	24
12	28
12	7
13	5
14	6
14	9
15	4
15	2
15	3
\.


--
-- Data for Name: game_owners; Type: TABLE DATA; Schema: public; Owner: pinkadmin
--

COPY public.game_owners (game_id, user_id) FROM stdin;
1	1
2	2
3	1
4	2
5	2
6	1
7	1
8	2
8	1
9	2
10	2
11	2
12	2
12	1
13	1
14	1
15	1
1	5
3	5
3	6
15	6
3	7
1	9
\.


--
-- Data for Name: game_platforms; Type: TABLE DATA; Schema: public; Owner: pinkadmin
--

COPY public.game_platforms (game_id, platform_id) FROM stdin;
1	1
2	1
3	1
4	1
5	1
6	1
7	1
8	1
9	1
10	1
11	1
12	1
13	1
14	1
15	1
1	5
2	3
4	8
7	5
12	3
\.


--
-- Data for Name: game_play_modes; Type: TABLE DATA; Schema: public; Owner: pinkadmin
--

COPY public.game_play_modes (game_id, mode_id) FROM stdin;
1	1
2	1
3	1
4	2
4	1
5	2
6	1
7	1
8	1
9	1
10	1
11	1
11	3
12	2
13	2
14	1
15	1
15	2
\.


--
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: pinkadmin
--

COPY public.games (game_id, name, type, rating, price, popularity, release_year, thumbnail_image, developer, description, release_date) FROM stdin;
1	The Witcher 3	\N	\N	64.05	2.0	\N	witcher	CD Projekt Red	Juego de prueba	2010-12-31
2	Doom Eternal	\N	\N	43.11	4.5	\N	doom	id Software	Juego de prueba	2011-12-31
3	Cyberpunk 2077	\N	\N	12.16	5.0	\N	cyberpunk	CD Projekt Red	Juego de prueba	2012-12-31
4	Minecraft	\N	\N	33.08	3.2	\N	minecraft	Mojang Studios	Juego de prueba	2013-12-31
5	Overwatch	\N	\N	17.21	2.8	\N	overwatch	Blizzard Entertainment	Juego de prueba	2014-12-31
6	Hades	\N	\N	42.29	2.9	\N	hades	Supergiant Games	Juego de prueba	2015-12-31
7	Celeste	\N	\N	43.09	3.8	\N	celeste	Maddy Makes Games	Juego de prueba	2016-12-31
8	Hollow Knight	\N	\N	39.22	4.7	\N	hollowknight	Team Cherry	Juego de prueba	2017-12-31
9	God of War	\N	\N	18.53	2.2	\N	godofwar	Santa Monica Studio	Juego de prueba	2018-12-31
10	Red Dead Redemption 2	\N	\N	60.47	4.7	\N	reddead2	Rockstar Studios	Juego de prueba	2019-12-31
11	Stardew Valley	\N	\N	53.48	3.9	\N	stardew	ConcernedApe	Juego de prueba	2020-12-31
12	Valorant	\N	\N	60.28	3.9	\N	valorant	Riot Games	Juego de prueba	2021-12-31
13	Apex Legends	\N	\N	43.40	2.6	\N	apex	Respawn Entertainment	Juego de prueba	2022-12-31
14	Elden Ring	\N	\N	63.27	4.5	\N	eldenring	FromSoftware	Juego de prueba	2023-12-31
15	Terraria	\N	\N	57.95	4.4	\N	terraria	Re-Logic	Juego de prueba	2024-12-31
\.


--
-- Data for Name: labels; Type: TABLE DATA; Schema: public; Owner: pinkadmin
--

COPY public.labels (label_id, label_name) FROM stdin;
1	Acci�n
2	Aventura
3	RPG
4	Terror
5	Battle Royale
6	Construcci�n
7	Ciencia Ficci�n
8	Competitivo
9	FPS
10	Granja
11	Fantas�a
12	Farmeo
13	Hist�rica
14	Life Sim
15	Medieval
16	Metroidvania
17	Mitolog�a
18	Oscura
19	Plataformas
20	Psicol�gica
21	Roguelike
22	Rural
23	Sandbox
24	Sci-Fi
25	Shooter
26	Simulaci�n
27	Supervivencia
28	Shooter T�ctico
29	Shooter por equipos
30	Western
\.


--
-- Data for Name: platforms; Type: TABLE DATA; Schema: public; Owner: pinkadmin
--

COPY public.platforms (platform_id, platform_name) FROM stdin;
1	PC
2	Xbox
3	Switch
4	Linux
5	Android
6	IOS
7	Play Station 4
8	Play Station 5
\.


--
-- Data for Name: play_modes; Type: TABLE DATA; Schema: public; Owner: pinkadmin
--

COPY public.play_modes (mode_id, mode_name) FROM stdin;
1	Un jugador
2	Multijugador
3	Cooperativo
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: pinkadmin
--

COPY public.users (user_id, name, email, registration_date, password_hash) FROM stdin;
1	Juan P�rez	juan@correo.com	2025-04-15	\N
2	Ana G�mez	ana@correo.com	2025-04-16	\N
3	asdfasdf	test@123.com	2025-06-09	$2b$10$WNzNAp19U59vgo9mxme/YeVeRnN9l45z/ITqgT3SzaFLwLBAw/aVC
4	andre123	andre@123.com	2025-06-09	$2b$10$YwpZGlxp1aUfsZKcoR3CoOfGJnbqyyKRVCKIjTCs3VbjNRV9c.JJC
5	andre1234	asdf@asdf.asasdf	2025-06-10	$2b$10$0lTazvoLk1BL9r0yWRB3ue4OFFZoObmuSLeo7jYk6Jl4lviHFr25S
6	andre2	asdf@asdfasdfasdf.asdfasdf	2025-06-10	$2b$10$nSxBS/I6vucWgXU.CK92NOHYPJSGekZmPxv1jONkixEbczhd3/zCi
7	jason1	jason@jason.com	2025-06-10	$2b$10$4El1dOXCXAgjc1xUadWMj.ViE2dKKCQvnrZ/5wn67wFfsQKdukAg6
8	jason2	jason2@jason.com	2025-06-10	$2b$10$SYabVhDwVU.wk8yjUIXVquKUeLa7m6ukzNurcWT6I8RD3ufqPiOuG
9	jason3	jason3@jason.com	2025-06-10	$2b$10$A2WqiDreKQ4/2CIe77NoS.tfVqGByONAri135y/qUCQJu6W2LbXzq
\.


--
-- Name: games_game_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pinkadmin
--

SELECT pg_catalog.setval('public.games_game_id_seq', 1, false);


--
-- Name: labels_label_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pinkadmin
--

SELECT pg_catalog.setval('public.labels_label_id_seq', 1, false);


--
-- Name: platforms_platform_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pinkadmin
--

SELECT pg_catalog.setval('public.platforms_platform_id_seq', 1, false);


--
-- Name: play_modes_mode_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pinkadmin
--

SELECT pg_catalog.setval('public.play_modes_mode_id_seq', 1, false);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pinkadmin
--

SELECT pg_catalog.setval('public.users_user_id_seq', 9, true);


--
-- Name: game_labels game_labels_pkey; Type: CONSTRAINT; Schema: public; Owner: pinkadmin
--

ALTER TABLE ONLY public.game_labels
    ADD CONSTRAINT game_labels_pkey PRIMARY KEY (game_id, label_id);


--
-- Name: game_owners game_owners_pkey; Type: CONSTRAINT; Schema: public; Owner: pinkadmin
--

ALTER TABLE ONLY public.game_owners
    ADD CONSTRAINT game_owners_pkey PRIMARY KEY (game_id, user_id);


--
-- Name: game_platforms game_platforms_pkey; Type: CONSTRAINT; Schema: public; Owner: pinkadmin
--

ALTER TABLE ONLY public.game_platforms
    ADD CONSTRAINT game_platforms_pkey PRIMARY KEY (game_id, platform_id);


--
-- Name: game_play_modes game_play_modes_pkey; Type: CONSTRAINT; Schema: public; Owner: pinkadmin
--

ALTER TABLE ONLY public.game_play_modes
    ADD CONSTRAINT game_play_modes_pkey PRIMARY KEY (game_id, mode_id);


--
-- Name: games games_pkey; Type: CONSTRAINT; Schema: public; Owner: pinkadmin
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (game_id);


--
-- Name: labels labels_label_name_key; Type: CONSTRAINT; Schema: public; Owner: pinkadmin
--

ALTER TABLE ONLY public.labels
    ADD CONSTRAINT labels_label_name_key UNIQUE (label_name);


--
-- Name: labels labels_pkey; Type: CONSTRAINT; Schema: public; Owner: pinkadmin
--

ALTER TABLE ONLY public.labels
    ADD CONSTRAINT labels_pkey PRIMARY KEY (label_id);


--
-- Name: platforms platforms_pkey; Type: CONSTRAINT; Schema: public; Owner: pinkadmin
--

ALTER TABLE ONLY public.platforms
    ADD CONSTRAINT platforms_pkey PRIMARY KEY (platform_id);


--
-- Name: platforms platforms_platform_name_key; Type: CONSTRAINT; Schema: public; Owner: pinkadmin
--

ALTER TABLE ONLY public.platforms
    ADD CONSTRAINT platforms_platform_name_key UNIQUE (platform_name);


--
-- Name: play_modes play_modes_mode_name_key; Type: CONSTRAINT; Schema: public; Owner: pinkadmin
--

ALTER TABLE ONLY public.play_modes
    ADD CONSTRAINT play_modes_mode_name_key UNIQUE (mode_name);


--
-- Name: play_modes play_modes_pkey; Type: CONSTRAINT; Schema: public; Owner: pinkadmin
--

ALTER TABLE ONLY public.play_modes
    ADD CONSTRAINT play_modes_pkey PRIMARY KEY (mode_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: pinkadmin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: pinkadmin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: game_labels game_labels_game_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pinkadmin
--

ALTER TABLE ONLY public.game_labels
    ADD CONSTRAINT game_labels_game_id_fkey FOREIGN KEY (game_id) REFERENCES public.games(game_id);


--
-- Name: game_labels game_labels_label_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pinkadmin
--

ALTER TABLE ONLY public.game_labels
    ADD CONSTRAINT game_labels_label_id_fkey FOREIGN KEY (label_id) REFERENCES public.labels(label_id);


--
-- Name: game_owners game_owners_game_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pinkadmin
--

ALTER TABLE ONLY public.game_owners
    ADD CONSTRAINT game_owners_game_id_fkey FOREIGN KEY (game_id) REFERENCES public.games(game_id);


--
-- Name: game_owners game_owners_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pinkadmin
--

ALTER TABLE ONLY public.game_owners
    ADD CONSTRAINT game_owners_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: game_platforms game_platforms_game_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pinkadmin
--

ALTER TABLE ONLY public.game_platforms
    ADD CONSTRAINT game_platforms_game_id_fkey FOREIGN KEY (game_id) REFERENCES public.games(game_id);


--
-- Name: game_platforms game_platforms_platform_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pinkadmin
--

ALTER TABLE ONLY public.game_platforms
    ADD CONSTRAINT game_platforms_platform_id_fkey FOREIGN KEY (platform_id) REFERENCES public.platforms(platform_id);


--
-- Name: game_play_modes game_play_modes_game_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pinkadmin
--

ALTER TABLE ONLY public.game_play_modes
    ADD CONSTRAINT game_play_modes_game_id_fkey FOREIGN KEY (game_id) REFERENCES public.games(game_id);


--
-- Name: game_play_modes game_play_modes_mode_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pinkadmin
--

ALTER TABLE ONLY public.game_play_modes
    ADD CONSTRAINT game_play_modes_mode_id_fkey FOREIGN KEY (mode_id) REFERENCES public.play_modes(mode_id);


--
-- PostgreSQL database dump complete
--

