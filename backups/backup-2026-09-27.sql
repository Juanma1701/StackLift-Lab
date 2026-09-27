--
-- PostgreSQL database dump
--

\restrict Qcsw1IMeBWGhiXxTRfuzNi9TMybJqg21j3YYqArcbUYf2hG7BAPlRdbinuqJZnM

-- Dumped from database version 18.6 (Debian 18.6-1.pgdg13+2)
-- Dumped by pg_dump version 18.6 (Ubuntu 18.6-1.pgdg24.04+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- Name: DailyCheckIn; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."DailyCheckIn" (
    id text NOT NULL,
    "userId" text NOT NULL,
    date text NOT NULL,
    difficulty integer NOT NULL,
    notes text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."DailyCheckIn" OWNER TO postgres;

--
-- Name: Exercise; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Exercise" (
    id text NOT NULL,
    "muscleGroupId" text NOT NULL,
    name text NOT NULL,
    "imageUrl" text,
    "targetSets" integer DEFAULT 3 NOT NULL,
    "targetReps" integer DEFAULT 10 NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "targetWeight" double precision,
    "imageLicenseAuthor" text,
    "imageLicenseUrl" text,
    "imageSource" text,
    "imageSourceUrl" text
);


ALTER TABLE public."Exercise" OWNER TO postgres;

--
-- Name: ExerciseImageTemplate; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ExerciseImageTemplate" (
    id text NOT NULL,
    "exerciseName" text NOT NULL,
    "imageUrl" text NOT NULL,
    license text NOT NULL,
    "licenseTitle" text,
    "licenseAuthor" text,
    "licenseAuthorUrl" text,
    "sourceUrl" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."ExerciseImageTemplate" OWNER TO postgres;

--
-- Name: MuscleGroup; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MuscleGroup" (
    id text NOT NULL,
    "routineDayId" text NOT NULL,
    name text NOT NULL,
    "order" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."MuscleGroup" OWNER TO postgres;

--
-- Name: PasswordResetToken; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PasswordResetToken" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "tokenHash" text NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "usedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."PasswordResetToken" OWNER TO postgres;

--
-- Name: Routine; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Routine" (
    id text NOT NULL,
    "userId" text NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Routine" OWNER TO postgres;

--
-- Name: RoutineDay; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RoutineDay" (
    id text NOT NULL,
    "routineId" text NOT NULL,
    "dayOfWeek" integer NOT NULL
);


ALTER TABLE public."RoutineDay" OWNER TO postgres;

--
-- Name: SetLog; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SetLog" (
    id text NOT NULL,
    "workoutLogId" text NOT NULL,
    "setNumber" integer NOT NULL,
    weight double precision NOT NULL,
    reps integer NOT NULL
);


ALTER TABLE public."SetLog" OWNER TO postgres;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "avatarUrl" text,
    "shareToken" text
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: WorkoutLog; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."WorkoutLog" (
    id text NOT NULL,
    "exerciseId" text NOT NULL,
    notes text,
    "performedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."WorkoutLog" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Data for Name: DailyCheckIn; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."DailyCheckIn" (id, "userId", date, difficulty, notes, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Exercise; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Exercise" (id, "muscleGroupId", name, "imageUrl", "targetSets", "targetReps", "order", "createdAt", "targetWeight", "imageLicenseAuthor", "imageLicenseUrl", "imageSource", "imageSourceUrl") FROM stdin;
cmu0dajuv0011030kkyzkx94m	cmu0d6n9d000t030k08l9183k	Aductores	https://wger.de/media/exercise-images/12/4a42cc6f-648d-40cc-a72a-c49dd47e1667.webp	3	8	3	2026-09-13 22:10:07.495	77	\N	\N	template	https://wger.de/en/exercise/12/view/
cmu0d47hc0002030k5407gymm	cmu0d47hc0001030kgegjom4k	Press Inclinado	https://wger.de/media/exercise-images/41/Incline-bench-press-1.png	3	8	0	2026-09-13 22:05:11.521	32	Everkinetic	\N	template	https://wger.de/en/exercise/538/view/
cmu0d47hd0004030k5ict6dya	cmu0d47hc0001030kgegjom4k	Aperturas en máquina	https://wger.de/media/exercise-images/926/ae9deb5d-a1e9-4c30-b1e3-c128ba5d4969.png	3	8	2	2026-09-13 22:05:11.521	60	\N	\N	template	https://wger.de/en/exercise/926/view/
cmu0bqt22000k0374ucqfl3gl	cmu0bmonh000g0374j1t9t1e2	Press Francés	https://wger.de/media/exercise-images/84/Lying-close-grip-triceps-press-to-chin-1.png	2	8	1	2026-09-13 21:26:46.682	25	Everkinetic	\N	template	https://wger.de/en/exercise/246/view/
cmu0bs8de000q037415ethewg	cmu0brcvw000m0374uaug4fpt	Press Militar	https://wger.de/media/exercise-images/418/fa2a2207-43cb-4dc0-bc2a-039e32544790.png	2	8	0	2026-09-13 21:27:53.187	20	Franpol	\N	template	https://wger.de/en/exercise/418/view/
cmu0bt7x2000s0374gd2m007d	cmu0brcvw000m0374uaug4fpt	Elevaciones Laterales	https://wger.de/media/exercise-images/1378/7c1fcf34-fb7e-45e7-a0c1-51f296235315.jpg	2	8	1	2026-09-13 21:28:39.254	23	carlos3c	https://www.flickr.com/photos/ptpioneer/48317524901/	template	https://wger.de/en/exercise/1378/view/
cmu0d4euk000r030klwvo45el	cmu0d4euk000p030kxaecozrs	Polea con agarre prono de pie	\N	2	15	1	2026-09-13 22:05:21.068	72	\N	\N	\N	\N
cmu0d4eue000f030k9pm2libv	cmu0d4eud000e030ksefnl1bi	Jalón al Pecho	https://wger.de/media/exercise-images/1127/4942b7c0-6bda-4983-88e5-86547c3d445e.png	3	8	0	2026-09-13 22:05:21.062	64	Franpol	\N	template	https://wger.de/en/exercise/1127/view/
cmu0d6td8000v030kjfc0mdv9	cmu0d6n9d000t030k08l9183k	Prensa	https://wger.de/media/exercise-images/371/d2136f96-3a43-4d4c-9944-1919c4ca1ce1.webp	3	8	0	2026-09-13 22:07:13.196	72	\N	\N	template	https://wger.de/en/exercise/371/view/
cmu0bwn5s000y0374ukxz3q00	cmu0bunyn000u0374m0sc2jbs	Remo con agarre cerrado	https://wger.de/media/exercise-images/1117/2555c4c3-a84d-47db-b83b-cbf721f12e45.png	3	8	1	2026-09-13 21:31:18.976	69	Franpol	\N	template	https://wger.de/en/exercise/1117/view/
cmu3alhs1000g03d4u4yck8bn	cmu0bunyn000u0374m0sc2jbs	Remo con agarre abierto	https://wger.de/media/exercise-images/1119/9b138ad2-5b80-42a8-bfff-93a960444ffe.png	2	8	3	2026-09-15 23:17:57.698	64	Franpol	\N	template	https://wger.de/en/exercise/1119/view/
cmu0dbeyq0013030kzfeqocfv	cmu0d6n9d000t030k08l9183k	Pantorillas	\N	3	8	4	2026-09-13 22:10:47.81	200	\N	\N	\N	\N
cmu0dcas20015030k3rlpx7vm	cmu0d6n9d000t030k08l9183k	Hip Trust	\N	3	8	5	2026-09-13 22:11:29.043	100	\N	\N	\N	\N
cmu0c8xvf001c0374i3l1tc1a	cmu0c239z00140374fdyyoz1w	Curl en banco inclinado	https://wger.de/media/exercise-images/1448/2184e68c-32b5-413f-a7c1-4a2d1bb98c35.png	2	8	2	2026-09-13 21:40:52.731	16	\N	\N	template	https://wger.de/en/exercise/1448/view/
cmu0cdkqj001g0374483i8oq6	cmu0ca5uf001e0374b3jcc03g	Barra z con agarre prono de pie	https://wger.de/media/exercise-images/94/6dee2f60-aea2-4f2d-9bf6-aef50c4f9483.png	2	8	0	2026-09-13 21:44:28.987	25	Franpol	\N	template	https://wger.de/en/exercise/94/view/
cmu0bn8f3000i0374a3k2gwqm	cmu0bmonh000g0374j1t9t1e2	Extensión en polea	https://wger.de/media/exercise-images/805/7a437824-e2cc-46e1-804a-674f0ea31d25.png	2	8	0	2026-09-13 21:23:59.967	23	\N	\N	template	https://wger.de/en/exercise/805/view/
cmu0d7kz9000x030k63xe9mud	cmu0d6n9d000t030k08l9183k	Extensiones	https://wger.de/media/exercise-images/369/78c915d1-e46d-4d30-8124-65d68664c3ef.png	3	8	1	2026-09-13 22:07:48.981	72	Franpol	\N	template	https://wger.de/en/exercise/369/view/
cmu0d47hg0008030ksyrtdlbs	cmu0d47hg0006030kfq3ugy01	Press Francés	https://wger.de/media/exercise-images/84/Lying-close-grip-triceps-press-to-chin-1.png	2	8	1	2026-09-13 22:05:11.524	25	Everkinetic	\N	template	https://wger.de/en/exercise/246/view/
cmu0c5a9v001a0374bwgum03h	cmu0c239z00140374fdyyoz1w	Curl Militar	\N	2	8	1	2026-09-13 21:38:02.179	20	\N	\N	\N	\N
cmu0d4euh000n030k4vz5gnc4	cmu0d4euh000k030k1nl8pw9t	Curl en banco inclinado	https://wger.de/media/exercise-images/1448/2184e68c-32b5-413f-a7c1-4a2d1bb98c35.png	2	8	2	2026-09-13 22:05:21.066	16	\N	\N	template	https://wger.de/en/exercise/1448/view/
cmu0d4euk000q030ki9tzfe5u	cmu0d4euk000p030kxaecozrs	Barra z con agarre prono de pie	https://wger.de/media/exercise-images/94/6dee2f60-aea2-4f2d-9bf6-aef50c4f9483.png	2	8	0	2026-09-13 22:05:21.068	25	Franpol	\N	template	https://wger.de/en/exercise/94/view/
cmu0c3mpm00160374lenu7vvf	cmu0c239z00140374fdyyoz1w	Curl en máquina	\N	2	8	0	2026-09-13 21:36:44.986	35	\N	\N	\N	\N
cmu0bl4bn000c0374idd94bv0	cmu0bg0oy00080374v6sfe5q4	Pecho en máquina	https://wger.de/media/exercise-images/129/b263c968-e067-4750-916a-d8758a7df23e.webp	3	8	1	2026-09-13 21:22:21.347	20	roneydya	https://fitnessvolt.com/wp-content/uploads/2020/01/machine-chest-press-exercise.jpg.webp	template	https://wger.de/en/exercise/129/view/
cmu0d4eue000i030k6md4e5mk	cmu0d4eud000e030ksefnl1bi	Remo con agarre abierto	https://wger.de/media/exercise-images/1119/9b138ad2-5b80-42a8-bfff-93a960444ffe.png	3	8	2	2026-09-13 22:05:21.062	64	Franpol	\N	template	https://wger.de/en/exercise/1119/view/
cmu0d4eue000g030ksq6nu668	cmu0d4eud000e030ksefnl1bi	Remo con agarre cerrado	https://wger.de/media/exercise-images/1117/2555c4c3-a84d-47db-b83b-cbf721f12e45.png	3	8	1	2026-09-13 22:05:21.062	69	Franpol	\N	template	https://wger.de/en/exercise/1117/view/
cmu0d4eue000h030ktvj9f3ff	cmu0d4eud000e030ksefnl1bi	Hombro posterior	https://wger.de/media/exercise-images/822/74affc0d-03b6-4f33-b5f4-a822a2615f68.png	2	8	3	2026-09-13 22:05:21.062	50	cshep442	\N	template	https://wger.de/en/exercise/822/view/
cmuhte3mb001vpa1mkay3nw1x	cmuhte3mb001rpa1mhsuczchg	aperturas en máquina	https://wger.de/media/exercise-images/926/ae9deb5d-a1e9-4c30-b1e3-c128ba5d4969.png	3	10	3	2026-09-26 03:12:51.912	\N	\N	\N	template	https://wger.de/en/exercise/926/view/
cmuhte3mb001xpa1mlbm7qz7s	cmuhte3mb001wpa1mt27c4yr4	jalón al pecho	https://wger.de/media/exercise-images/1127/4942b7c0-6bda-4983-88e5-86547c3d445e.png	3	10	0	2026-09-26 03:12:51.912	\N	Franpol	\N	template	https://wger.de/en/exercise/1127/view/
cmuhte3mb001zpa1mq42z1ihe	cmuhte3mb001wpa1mt27c4yr4	remo con agarre cerrado	https://wger.de/media/exercise-images/1117/2555c4c3-a84d-47db-b83b-cbf721f12e45.png	3	10	2	2026-09-26 03:12:51.912	\N	Franpol	\N	template	https://wger.de/en/exercise/1117/view/
cmu0d4euh000l030kstbzwthb	cmu0d4euh000k030k1nl8pw9t	Curl en máquina	\N	2	8	0	2026-09-13 22:05:21.066	35	\N	\N	\N	\N
cmu0d4euh000m030k1cjfe8mq	cmu0d4euh000k030k1nl8pw9t	Curl Militar	\N	2	8	1	2026-09-13 22:05:21.066	20	\N	\N	\N	\N
cmuhte3mc0034pa1m5ony1ado	cmuhte3mc0033pa1mthncs995	press banca	https://wger.de/media/exercise-images/192/Bench-press-1.png	3	10	0	2026-09-26 03:12:51.912	\N	Everkinetic	\N	template	https://wger.de/en/exercise/73/view/
cmuhte3mc0031pa1ml8405o19	cmuhte3mc002xpa1mlvs1mde2	abducción en máquina	https://wger.de/media/exercise-images/1748/923a3ff7-c269-49bd-9f03-697151a40f06.jpg	3	10	3	2026-09-26 03:12:51.912	\N	\N	\N	template	https://wger.de/en/exercise/1748/view/
cmuhte3mb0022pa1mutynqeol	cmuhte3mb0021pa1m7haz0wvu	press militar	https://wger.de/media/exercise-images/418/fa2a2207-43cb-4dc0-bc2a-039e32544790.png	3	10	0	2026-09-26 03:12:51.912	\N	Franpol	\N	template	https://wger.de/en/exercise/418/view/
cmuhte3mb0023pa1miixn6ekk	cmuhte3mb0021pa1m7haz0wvu	elevaciones laterales	https://wger.de/media/exercise-images/1378/7c1fcf34-fb7e-45e7-a0c1-51f296235315.jpg	3	10	1	2026-09-26 03:12:51.912	\N	carlos3c	https://www.flickr.com/photos/ptpioneer/48317524901/	template	https://wger.de/en/exercise/1378/view/
cmuhte3mb0024pa1ml5xs0pb4	cmuhte3mb0021pa1m7haz0wvu	hombro posterior	https://wger.de/media/exercise-images/822/74affc0d-03b6-4f33-b5f4-a822a2615f68.png	3	10	2	2026-09-26 03:12:51.912	\N	cshep442	\N	template	https://wger.de/en/exercise/822/view/
cmuhte3mb0027pa1mv7n9wjn5	cmuhte3mb0026pa1mdbth0r9g	sentadilla	https://wger.de/media/exercise-images/1801/60043328-1cfb-4289-9865-aaf64d5aaa28.jpg	3	10	0	2026-09-26 03:12:51.912	\N	Workout Guru	\N	template	https://wger.de/en/exercise/1801/view/
cmuhte3mb0028pa1m1k7qfc3r	cmuhte3mb0026pa1mdbth0r9g	prensa	https://wger.de/media/exercise-images/371/d2136f96-3a43-4d4c-9944-1919c4ca1ce1.webp	3	10	1	2026-09-26 03:12:51.912	\N	\N	\N	template	https://wger.de/en/exercise/371/view/
cmuhte3mb0029pa1mewwa1o4u	cmuhte3mb0026pa1mdbth0r9g	extensiones	https://wger.de/media/exercise-images/369/78c915d1-e46d-4d30-8124-65d68664c3ef.png	3	10	2	2026-09-26 03:12:51.912	\N	Franpol	\N	template	https://wger.de/en/exercise/369/view/
cmuhte3mb002apa1ml1a8yh4r	cmuhte3mb0026pa1mdbth0r9g	zancadas	https://wger.de/media/exercise-images/1830/3b6c547c-ab3d-4472-93cf-561710279eab.jpg	3	10	3	2026-09-26 03:12:51.912	\N	hans	\N	template	https://wger.de/en/exercise/1830/view/
cmuhte3mb002dpa1mt9aw77yk	cmuhte3mb002cpa1mckc7g4ig	press militar	https://wger.de/media/exercise-images/418/fa2a2207-43cb-4dc0-bc2a-039e32544790.png	3	10	0	2026-09-26 03:12:51.912	\N	Franpol	\N	template	https://wger.de/en/exercise/418/view/
cmuhte3mb002epa1moifn5uql	cmuhte3mb002cpa1mckc7g4ig	elevaciones laterales	https://wger.de/media/exercise-images/1378/7c1fcf34-fb7e-45e7-a0c1-51f296235315.jpg	3	10	1	2026-09-26 03:12:51.912	\N	carlos3c	https://www.flickr.com/photos/ptpioneer/48317524901/	template	https://wger.de/en/exercise/1378/view/
cmuhte3mb002fpa1m4jeo9so4	cmuhte3mb002cpa1mckc7g4ig	hombro posterior	https://wger.de/media/exercise-images/822/74affc0d-03b6-4f33-b5f4-a822a2615f68.png	3	10	2	2026-09-26 03:12:51.912	\N	cshep442	\N	template	https://wger.de/en/exercise/822/view/
cmuhte3mb002hpa1mti1ayiol	cmuhte3mb002gpa1m2db9knp3	curl en banco inclinado	https://wger.de/media/exercise-images/1448/2184e68c-32b5-413f-a7c1-4a2d1bb98c35.png	3	10	0	2026-09-26 03:12:51.912	\N	\N	\N	template	https://wger.de/en/exercise/1448/view/
cmuhte3mb002ipa1m5kog2drz	cmuhte3mb002gpa1m2db9knp3	curl martillo	https://wger.de/media/exercise-images/1567/0a8c155c-a48e-47e8-9df3-e39f025c6cad.png	3	10	1	2026-09-26 03:12:51.912	\N	Mariano_O	https://www.simplyfitness.com/es/pages/hammer-curl	template	https://wger.de/en/exercise/1567/view/
cmuhte3mb002jpa1mlf1m2i51	cmuhte3mb002gpa1m2db9knp3	curl en máquina	https://wger.de/media/exercise-images/1109/00b0a0bf-c14a-4f13-bb14-62c09030a1aa.png	3	10	2	2026-09-26 03:12:51.912	\N	Franpol	\N	template	https://wger.de/en/exercise/1109/view/
cmuhte3mb002kpa1m0yotedss	cmuhte3mb002gpa1m2db9knp3	polea con agarre prono de pie	https://wger.de/media/exercise-images/912/e10a034f-6370-4dd6-b1c2-416b27844529.png	3	10	3	2026-09-26 03:12:51.912	\N	\N	\N	template	https://wger.de/en/exercise/912/view/
cmuhte3mb002mpa1mdniurjn2	cmuhte3mb002lpa1m84r4mrbq	extensión en polea	https://wger.de/media/exercise-images/805/7a437824-e2cc-46e1-804a-674f0ea31d25.png	3	10	0	2026-09-26 03:12:51.912	\N	\N	\N	template	https://wger.de/en/exercise/805/view/
cmuhte3mb002npa1m90h28nxa	cmuhte3mb002lpa1m84r4mrbq	press francés	https://wger.de/media/exercise-images/84/Lying-close-grip-triceps-press-to-chin-1.png	3	10	1	2026-09-26 03:12:51.912	\N	Everkinetic	\N	template	https://wger.de/en/exercise/246/view/
cmuhte3mb002opa1mjyfdjcwh	cmuhte3mb002lpa1m84r4mrbq	fondos en banco	https://wger.de/media/exercise-images/83/Bench-dips-1.png	3	10	2	2026-09-26 03:12:51.912	\N	Everkinetic	\N	template	https://wger.de/en/exercise/197/view/
cmuhte3mc002qpa1mgp2ps9tq	cmuhte3mc002ppa1mfhymperc	curl de muñeca	https://wger.de/media/exercise-images/51/f1730f56-7aca-4566-8338-3e42b1bee6e1.webp	3	10	0	2026-09-26 03:12:51.912	\N	\N	\N	template	https://wger.de/en/exercise/51/view/
cmuhte3mc002rpa1m91hun6lt	cmuhte3mc002ppa1mfhymperc	barra z con agarre prono de pie	https://wger.de/media/exercise-images/94/6dee2f60-aea2-4f2d-9bf6-aef50c4f9483.png	3	10	1	2026-09-26 03:12:51.912	\N	Franpol	\N	template	https://wger.de/en/exercise/94/view/
cmuhte3mc002upa1m0iw7ifhv	cmuhte3mc002tpa1mve9gqhsd	peso muerto rumano	https://wger.de/media/exercise-images/507/13d526ab-12fc-461e-828a-051dd7c13fb1.png	3	10	0	2026-09-26 03:12:51.912	\N	\N	\N	template	https://wger.de/en/exercise/507/view/
cmuhte3mc002vpa1mmykay5z3	cmuhte3mc002tpa1mve9gqhsd	curl femoral	https://wger.de/media/exercise-images/364/b318dde9-f5f2-489f-940a-cd864affb9e3.png	3	10	1	2026-09-26 03:12:51.912	\N	Franpol	\N	template	https://wger.de/en/exercise/364/view/
cmuhte3mc002wpa1m8z4c66p6	cmuhte3mc002tpa1mve9gqhsd	pantorrillas	https://wger.de/media/exercise-images/622/9a429bd0-afd3-4ad0-8043-e9beec901c81.jpeg	3	10	2	2026-09-26 03:12:51.912	\N	clafal	\N	template	https://wger.de/en/exercise/622/view/
cmuhte3mc002zpa1mphqqescw	cmuhte3mc002xpa1mlvs1mde2	aductores	https://wger.de/media/exercise-images/12/4a42cc6f-648d-40cc-a72a-c49dd47e1667.webp	3	10	1	2026-09-26 03:12:51.912	\N	\N	\N	template	https://wger.de/en/exercise/12/view/
cmuhte3mc0035pa1mwck3y2gd	cmuhte3mc0033pa1mthncs995	press inclinado	https://wger.de/media/exercise-images/41/Incline-bench-press-1.png	3	10	1	2026-09-26 03:12:51.912	\N	Everkinetic	\N	template	https://wger.de/en/exercise/538/view/
cmuhte3mc0037pa1m0srko9id	cmuhte3mc0033pa1mthncs995	aperturas en máquina	https://wger.de/media/exercise-images/926/ae9deb5d-a1e9-4c30-b1e3-c128ba5d4969.png	3	10	3	2026-09-26 03:12:51.912	\N	\N	\N	template	https://wger.de/en/exercise/926/view/
cmuhte3mc003apa1m01s14vah	cmuhte3mc0038pa1m6gsn1gc1	remo con agarre abierto	https://wger.de/media/exercise-images/1119/9b138ad2-5b80-42a8-bfff-93a960444ffe.png	3	10	1	2026-09-26 03:12:51.912	\N	Franpol	\N	template	https://wger.de/en/exercise/1119/view/
cmuhte3mc003cpa1ms2sar6nm	cmuhte3mc0038pa1m6gsn1gc1	peso muerto rumano con barra	https://wger.de/media/exercise-images/507/13d526ab-12fc-461e-828a-051dd7c13fb1.png	3	10	3	2026-09-26 03:12:51.912	\N	\N	\N	template	https://wger.de/en/exercise/507/view/
cmuhojlam001hrp1m5vr65zgn	cmuhojlam001grp1m76f29zwg	jalón al pecho	https://wger.de/media/exercise-images/1127/4942b7c0-6bda-4983-88e5-86547c3d445e.png	3	10	0	2026-09-26 00:57:10.029	\N	Franpol	\N	template	https://wger.de/en/exercise/1127/view/
cmuhte3mc002ypa1mohcyq7o2	cmuhte3mc002xpa1mlvs1mde2	hip thrust	https://wger.de/media/exercise-images/1642/a81ad922-caf5-47f8-99b4-640cb0717436.webp	3	10	0	2026-09-26 03:12:51.912	\N	AlucardEvil40	\N	template	https://wger.de/en/exercise/1642/view/
cmuhte3mc0036pa1m5ufhwnnc	cmuhte3mc0033pa1mthncs995	pecho en máquina	https://wger.de/media/exercise-images/129/b263c968-e067-4750-916a-d8758a7df23e.webp	3	10	2	2026-09-26 03:12:51.912	\N	roneydya	https://fitnessvolt.com/wp-content/uploads/2020/01/machine-chest-press-exercise.jpg.webp	template	https://wger.de/en/exercise/129/view/
cmu0bgirt000a0374gxd5wwvs	cmu0bg0oy00080374v6sfe5q4	Press Inclinado	https://wger.de/media/exercise-images/41/Incline-bench-press-1.png	3	8	0	2026-09-13 21:18:46.793	32	Everkinetic	\N	template	https://wger.de/en/exercise/538/view/
cmu0blvze000e03748nh3hgg7	cmu0bg0oy00080374v6sfe5q4	Aperturas en máquina	https://wger.de/media/exercise-images/926/ae9deb5d-a1e9-4c30-b1e3-c128ba5d4969.png	3	8	2	2026-09-13 21:22:57.194	60	\N	\N	template	https://wger.de/en/exercise/926/view/
cmu0bvhb4000w03746d05mctj	cmu0bunyn000u0374m0sc2jbs	Jalón al Pecho	https://wger.de/media/exercise-images/1127/4942b7c0-6bda-4983-88e5-86547c3d445e.png	3	8	0	2026-09-13 21:30:24.736	64	Franpol	\N	template	https://wger.de/en/exercise/1127/view/
cmuhojlal000krp1myclhc58o	cmuhojlal000hrp1m200n112y	remo con agarre cerrado	https://wger.de/media/exercise-images/1117/2555c4c3-a84d-47db-b83b-cbf721f12e45.png	3	10	2	2026-09-26 00:57:10.029	\N	Franpol	\N	template	https://wger.de/en/exercise/1117/view/
cmu0cgybv001i0374m2hjm1xw	cmu0ca5uf001e0374b3jcc03g	Polea con agarre prono de pie	\N	2	15	1	2026-09-13 21:47:06.571	72	\N	\N	\N	\N
cmuhsokrj0004qm1mcvwvs56q	cmuhsokrj0003qm1mm7jvbsf7	press banca	\N	3	10	0	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmu0c00t000120374i8lyo018	cmu0bunyn000u0374m0sc2jbs	Hombro posterior	https://wger.de/media/exercise-images/822/74affc0d-03b6-4f33-b5f4-a822a2615f68.png	2	8	3	2026-09-13 21:33:56.628	50	cshep442	\N	template	https://wger.de/en/exercise/822/view/
cmuhsokrj0005qm1m3ndlpwmu	cmuhsokrj0003qm1mm7jvbsf7	press inclinado	\N	3	10	1	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhojlal0004rp1m79badflc	cmuhojlal0003rp1mr72lfizw	press banca	\N	3	10	0	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmuhojlal0005rp1mq4ilv9i1	cmuhojlal0003rp1mr72lfizw	press inclinado	\N	3	10	1	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmuhojlal0006rp1my2kbgunx	cmuhojlal0003rp1mr72lfizw	pecho en máquina	\N	3	10	2	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmuhojlal0007rp1m503xvvjb	cmuhojlal0003rp1mr72lfizw	aperturas en máquina	\N	3	10	3	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmuhojlal0009rp1mj63ot6lu	cmuhojlal0008rp1mjdk78kre	extensión en polea	\N	3	10	0	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmuhojlal000arp1mnnr6fmzh	cmuhojlal0008rp1mjdk78kre	press francés	\N	3	10	1	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmuhojlal000brp1mvl9402tv	cmuhojlal0008rp1mjdk78kre	fondos en banco	\N	3	10	2	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmuhojlal000drp1mmtw44n51	cmuhojlal000crp1m8z6k0mfd	press militar	\N	3	10	0	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmuhojlal000erp1miwlejdrq	cmuhojlal000crp1m8z6k0mfd	elevaciones laterales	\N	3	10	1	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmuhojlal000frp1m0yldxx9r	cmuhojlal000crp1m8z6k0mfd	hombro posterior	\N	3	10	2	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmuhojlal000irp1mn40qgl5m	cmuhojlal000hrp1m200n112y	jalón al pecho	\N	3	10	0	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmu0d91s0000z030ks7e7cwbf	cmu0d6n9d000t030k08l9183k	Femorales	https://wger.de/media/exercise-images/364/b318dde9-f5f2-489f-940a-cd864affb9e3.png	3	8	2	2026-09-13 22:08:57.408	52	Franpol	\N	template	https://wger.de/en/exercise/364/view/
cmu0d47hd0003030kbrddfksx	cmu0d47hc0001030kgegjom4k	Pecho en máquina	https://wger.de/media/exercise-images/129/b263c968-e067-4750-916a-d8758a7df23e.webp	3	8	1	2026-09-13 22:05:11.521	20	roneydya	https://fitnessvolt.com/wp-content/uploads/2020/01/machine-chest-press-exercise.jpg.webp	template	https://wger.de/en/exercise/129/view/
cmuhojlal000lrp1mqrsk9umb	cmuhojlal000hrp1m200n112y	peso muerto	\N	3	10	3	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmuhojlal000nrp1msphlkuly	cmuhojlal000mrp1m966mrbn0	curl en banco inclinado	\N	3	10	0	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmuhojlal000orp1mshm37tow	cmuhojlal000mrp1m966mrbn0	curl martillo	\N	3	10	1	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmuhojlal000prp1mn9zxmhc9	cmuhojlal000mrp1m966mrbn0	curl en máquina	\N	3	10	2	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmuhojlal000qrp1m9m6taljn	cmuhojlal000mrp1m966mrbn0	polea con agarre prono de pie	\N	3	10	3	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmuhojlal000srp1mlngtkp90	cmuhojlal000rrp1mf7msw1mg	curl de muñeca	\N	3	10	0	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmuhojlal000trp1miy2hf1sh	cmuhojlal000rrp1mf7msw1mg	barra z con agarre prono de pie	\N	3	10	1	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmuhojlal000wrp1m2k3t4h7y	cmuhojlal000vrp1mf6had0lg	sentadilla	\N	3	10	0	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmuhojlal000xrp1mb79stm75	cmuhojlal000vrp1mf6had0lg	prensa	\N	3	10	1	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmuhojlal000yrp1mq67cr8ip	cmuhojlal000vrp1mf6had0lg	extensiones	\N	3	10	2	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmuhojlal000zrp1m6fgttusy	cmuhojlal000vrp1mf6had0lg	femorales	\N	3	10	3	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmuhojlal0010rp1moxfhjjai	cmuhojlal000vrp1mf6had0lg	pantorrillas	\N	3	10	4	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmuhojlam0013rp1mv3ugjhlf	cmuhojlam0012rp1mdx8zigy4	press banca	\N	3	10	0	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmuhojlam0014rp1mxmgj5p9b	cmuhojlam0012rp1mdx8zigy4	press inclinado	\N	3	10	1	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmuhojlam0015rp1mvwws7dzk	cmuhojlam0012rp1mdx8zigy4	pecho en máquina	\N	3	10	2	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmuhojlam0016rp1mylohach4	cmuhojlam0012rp1mdx8zigy4	aperturas en máquina	\N	3	10	3	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmuhojlam0018rp1mhdami1g7	cmuhojlam0017rp1mrq6ka877	extensión en polea	\N	3	10	0	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmuhojlam0019rp1mtk54ny6f	cmuhojlam0017rp1mrq6ka877	press francés	\N	3	10	1	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmuhojlam001arp1mt9ppu2un	cmuhojlam0017rp1mrq6ka877	fondos en banco	\N	3	10	2	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmuhojlam001crp1mnjatvkth	cmuhojlam001brp1ma9gzctsr	press militar	\N	3	10	0	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmuhojlam001drp1mib5ig7at	cmuhojlam001brp1ma9gzctsr	elevaciones laterales	\N	3	10	1	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmuhojlam001erp1mu5tuf0yj	cmuhojlam001brp1ma9gzctsr	hombro posterior	\N	3	10	2	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmuhojlam001irp1mbvsq2yod	cmuhojlam001grp1m76f29zwg	remo con agarre abierto	\N	3	10	1	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmuhojlam001jrp1m9oyl7rh9	cmuhojlam001grp1m76f29zwg	remo con agarre cerrado	\N	3	10	2	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmuhojlam001krp1mv76xrk73	cmuhojlam001grp1m76f29zwg	peso muerto	\N	3	10	3	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmuhojlam001mrp1m1qm0qxyo	cmuhojlam001lrp1mfsof0ah5	curl en banco inclinado	\N	3	10	0	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmuhojlam001nrp1mtzc7hlym	cmuhojlam001lrp1mfsof0ah5	curl martillo	\N	3	10	1	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmuhojlam001orp1mwnkmcdhg	cmuhojlam001lrp1mfsof0ah5	curl en máquina	\N	3	10	2	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmu0d47hg0007030ky65bhd7r	cmu0d47hg0006030kfq3ugy01	Extensión en polea	https://wger.de/media/exercise-images/805/7a437824-e2cc-46e1-804a-674f0ea31d25.png	2	8	0	2026-09-13 22:05:11.524	23	\N	\N	template	https://wger.de/en/exercise/805/view/
cmu0d47hi000b030kj991y3ve	cmu0d47hi000a030k2eghu9d6	Press Militar	https://wger.de/media/exercise-images/418/fa2a2207-43cb-4dc0-bc2a-039e32544790.png	2	8	0	2026-09-13 22:05:11.526	20	Franpol	\N	template	https://wger.de/en/exercise/418/view/
cmu0d47hi000c030kcek0mm62	cmu0d47hi000a030k2eghu9d6	Elevaciones Laterales	https://wger.de/media/exercise-images/1378/7c1fcf34-fb7e-45e7-a0c1-51f296235315.jpg	2	8	1	2026-09-13 22:05:11.526	23	carlos3c	https://www.flickr.com/photos/ptpioneer/48317524901/	template	https://wger.de/en/exercise/1378/view/
cmuhsokrj0006qm1m3iszxrkz	cmuhsokrj0003qm1mm7jvbsf7	pecho en máquina	\N	3	10	2	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhsokrj0007qm1m0unm5uxx	cmuhsokrj0003qm1mm7jvbsf7	aperturas en máquina	\N	3	10	3	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhsokrj0009qm1mh2t74fwj	cmuhsokrj0008qm1mrer7ln72	jalón al pecho	\N	3	10	0	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhsokrj000aqm1mztl9k1m9	cmuhsokrj0008qm1mrer7ln72	remo con agarre abierto	\N	3	10	1	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhsokrk000bqm1m78thfkni	cmuhsokrj0008qm1mrer7ln72	remo con agarre cerrado	\N	3	10	2	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhsokrk000cqm1me01fxl1n	cmuhsokrj0008qm1mrer7ln72	peso muerto rumano con barra	\N	3	10	3	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhojlam001prp1mxeni4zzi	cmuhojlam001lrp1mfsof0ah5	polea con agarre prono de pie	\N	3	10	3	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmuhojlam001rrp1mk6kqz1xn	cmuhojlam001qrp1mztyysy76	curl de muñeca	\N	3	10	0	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmuhojlam001srp1mrze6u9mj	cmuhojlam001qrp1mztyysy76	barra z con agarre prono de pie	\N	3	10	1	2026-09-26 00:57:10.029	\N	\N	\N	\N	\N
cmuhsokrk000eqm1mgxlepa8y	cmuhsokrk000dqm1m0cg1u5sg	press militar	\N	3	10	0	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhsokrk000fqm1mn4if5tx0	cmuhsokrk000dqm1m0cg1u5sg	elevaciones laterales	\N	3	10	1	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhsokrk000gqm1moer4vrdp	cmuhsokrk000dqm1m0cg1u5sg	hombro posterior	\N	3	10	2	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhsokrk000jqm1m8aa8nnqr	cmuhsokrk000iqm1mbdpleppa	sentadilla	\N	3	10	0	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhsokrk000kqm1ml2n8u531	cmuhsokrk000iqm1mbdpleppa	prensa	\N	3	10	1	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhsokrk000lqm1mxdsvjbo1	cmuhsokrk000iqm1mbdpleppa	extensiones	\N	3	10	2	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhsokrk000mqm1mqkuwvtda	cmuhsokrk000iqm1mbdpleppa	zancadas	\N	3	10	3	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhsokrk000pqm1mp6qc1pk7	cmuhsokrk000oqm1mh4whajyi	press militar	\N	3	10	0	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhsokrk000qqm1mg5vytc57	cmuhsokrk000oqm1mh4whajyi	elevaciones laterales	\N	3	10	1	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhsokrk000rqm1mmf5g5qut	cmuhsokrk000oqm1mh4whajyi	hombro posterior	\N	3	10	2	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhsokrk000tqm1mq0sqik28	cmuhsokrk000sqm1mzlfnitbi	curl en banco inclinado	\N	3	10	0	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhsokrk000uqm1mah80snz1	cmuhsokrk000sqm1mzlfnitbi	curl martillo	\N	3	10	1	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhsokrk000vqm1mij1j2gaz	cmuhsokrk000sqm1mzlfnitbi	curl en máquina	\N	3	10	2	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhsokrk000wqm1mjld6t2ut	cmuhsokrk000sqm1mzlfnitbi	polea con agarre prono de pie	\N	3	10	3	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhsokrk000yqm1mjokrbcew	cmuhsokrk000xqm1m9yevw1s9	extensión en polea	\N	3	10	0	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhsokrk000zqm1m5sxxyaaj	cmuhsokrk000xqm1m9yevw1s9	press francés	\N	3	10	1	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhsokrk0010qm1m9ufwlog8	cmuhsokrk000xqm1m9yevw1s9	fondos en banco	\N	3	10	2	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhsokrk0012qm1m373rwuwb	cmuhsokrk0011qm1mef25ny59	curl de muñeca	\N	3	10	0	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhsokrk0013qm1mqm74dfyb	cmuhsokrk0011qm1mef25ny59	barra z con agarre prono de pie	\N	3	10	1	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhsokrk0016qm1mlwcjwny4	cmuhsokrk0015qm1mape2bn0a	peso muerto rumano	\N	3	10	0	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhsokrk0017qm1mnz6olmb3	cmuhsokrk0015qm1mape2bn0a	curl femoral	\N	3	10	1	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhsokrk0018qm1m5420xwjl	cmuhsokrk0015qm1mape2bn0a	hiperextensiones	\N	3	10	2	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhsokrk0019qm1mv8f4vcfg	cmuhsokrk0015qm1mape2bn0a	pantorrillas	\N	3	10	3	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhsokrk001bqm1mpz401j0i	cmuhsokrk001aqm1mrqapooeh	hip thrust	\N	3	10	0	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhsokrk001cqm1moe50x21f	cmuhsokrk001aqm1mrqapooeh	aductores	\N	3	10	1	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhsokrk001dqm1mdfe4ds7d	cmuhsokrk001aqm1mrqapooeh	patada de glúteo en polea	\N	3	10	2	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhsokrk001gqm1moss9xghk	cmuhsokrk001fqm1mmvc6mfu2	press banca	\N	3	10	0	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhsokrk001hqm1mgwgvkowr	cmuhsokrk001fqm1mmvc6mfu2	press inclinado	\N	3	10	1	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhsokrk001iqm1m2hk4hphn	cmuhsokrk001fqm1mmvc6mfu2	pecho en máquina	\N	3	10	2	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhsokrk001jqm1m7hx01md2	cmuhsokrk001fqm1mmvc6mfu2	aperturas en máquina	\N	3	10	3	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhsokrk001lqm1mq89hdmob	cmuhsokrk001kqm1mr4l8l14b	jalón al pecho	\N	3	10	0	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhsokrk001mqm1mj7z4rpyn	cmuhsokrk001kqm1mr4l8l14b	remo con agarre abierto	\N	3	10	1	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhsokrk001nqm1m9y4mbw6x	cmuhsokrk001kqm1mr4l8l14b	remo con agarre cerrado	\N	3	10	2	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhsokrk001oqm1mqx1696wz	cmuhsokrk001kqm1mr4l8l14b	peso muerto rumano con barra	\N	3	10	3	2026-09-26 02:53:01.088	\N	\N	\N	\N	\N
cmuhte3mb001spa1m8z0g51r4	cmuhte3mb001rpa1mhsuczchg	press banca	https://wger.de/media/exercise-images/192/Bench-press-1.png	3	10	0	2026-09-26 03:12:51.912	\N	Everkinetic	\N	template	https://wger.de/en/exercise/73/view/
cmuhte3mb001upa1mzquaeaps	cmuhte3mb001rpa1mhsuczchg	pecho en máquina	https://wger.de/media/exercise-images/129/b263c968-e067-4750-916a-d8758a7df23e.webp	3	10	2	2026-09-26 03:12:51.912	\N	roneydya	https://fitnessvolt.com/wp-content/uploads/2020/01/machine-chest-press-exercise.jpg.webp	template	https://wger.de/en/exercise/129/view/
cmuhte3mc0039pa1ms03zjjhw	cmuhte3mc0038pa1m6gsn1gc1	jalón al pecho	https://wger.de/media/exercise-images/1127/4942b7c0-6bda-4983-88e5-86547c3d445e.png	3	10	0	2026-09-26 03:12:51.912	\N	Franpol	\N	template	https://wger.de/en/exercise/1127/view/
cmuhte3mc003bpa1mcz6hc987	cmuhte3mc0038pa1m6gsn1gc1	remo con agarre cerrado	https://wger.de/media/exercise-images/1117/2555c4c3-a84d-47db-b83b-cbf721f12e45.png	3	10	2	2026-09-26 03:12:51.912	\N	Franpol	\N	template	https://wger.de/en/exercise/1117/view/
cmuhte3mb001tpa1m3ekpr34y	cmuhte3mb001rpa1mhsuczchg	press inclinado	https://wger.de/media/exercise-images/41/Incline-bench-press-1.png	3	10	1	2026-09-26 03:12:51.912	\N	Everkinetic	\N	template	https://wger.de/en/exercise/538/view/
cmuhte3mb001ypa1ms0idj0id	cmuhte3mb001wpa1mt27c4yr4	remo con agarre abierto	https://wger.de/media/exercise-images/1119/9b138ad2-5b80-42a8-bfff-93a960444ffe.png	3	10	1	2026-09-26 03:12:51.912	\N	Franpol	\N	template	https://wger.de/en/exercise/1119/view/
cmuhojzeu005arp1mq91skzeh	cmuhojzeu0059rp1m16unhwfh	press banca	\N	3	10	0	2026-09-26 00:57:28.326	\N	\N	\N	\N	\N
cmuhojzeu005brp1mkkcbs34e	cmuhojzeu0059rp1m16unhwfh	press inclinado	\N	3	10	1	2026-09-26 00:57:28.326	\N	\N	\N	\N	\N
cmuhojzeu005crp1maae79qtj	cmuhojzeu0059rp1m16unhwfh	pecho en máquina	\N	3	10	2	2026-09-26 00:57:28.326	\N	\N	\N	\N	\N
cmuhojzeu005drp1m44h463qb	cmuhojzeu0059rp1m16unhwfh	aperturas en máquina	\N	3	10	3	2026-09-26 00:57:28.326	\N	\N	\N	\N	\N
cmuhojzeu005frp1mdoiuqxrd	cmuhojzeu005erp1m9i84rlgr	jalón al pecho	\N	3	10	0	2026-09-26 00:57:28.326	\N	\N	\N	\N	\N
cmuhojzeu005grp1mq6qtb01z	cmuhojzeu005erp1m9i84rlgr	remo con agarre abierto	\N	3	10	1	2026-09-26 00:57:28.326	\N	\N	\N	\N	\N
cmuhojzeu005hrp1mpsgnjxim	cmuhojzeu005erp1m9i84rlgr	remo con agarre cerrado	\N	3	10	2	2026-09-26 00:57:28.326	\N	\N	\N	\N	\N
cmuhojzeu005irp1mn3ojrgyc	cmuhojzeu005erp1m9i84rlgr	peso muerto	\N	3	10	3	2026-09-26 00:57:28.326	\N	\N	\N	\N	\N
cmuhojzeu005krp1mtacx0stu	cmuhojzeu005jrp1mn891i4b1	sentadilla	\N	3	10	0	2026-09-26 00:57:28.326	\N	\N	\N	\N	\N
cmuhojzeu005lrp1mh39r0gqd	cmuhojzeu005jrp1mn891i4b1	prensa	\N	3	10	1	2026-09-26 00:57:28.326	\N	\N	\N	\N	\N
cmuhojzeu005mrp1mxxu2uvee	cmuhojzeu005jrp1mn891i4b1	extensiones	\N	3	10	2	2026-09-26 00:57:28.326	\N	\N	\N	\N	\N
cmuhojzeu005nrp1mkt9eno2n	cmuhojzeu005jrp1mn891i4b1	femorales	\N	3	10	3	2026-09-26 00:57:28.326	\N	\N	\N	\N	\N
cmuhojzeu005orp1mp4dxhl1f	cmuhojzeu005jrp1mn891i4b1	pantorrillas	\N	3	10	4	2026-09-26 00:57:28.326	\N	\N	\N	\N	\N
cmuhojzeu005srp1moay47yz5	cmuhojzeu005rrp1m4xcinqv5	press militar	\N	3	10	0	2026-09-26 00:57:28.326	\N	\N	\N	\N	\N
cmuhojzeu005trp1mei4adojy	cmuhojzeu005rrp1m4xcinqv5	elevaciones laterales	\N	3	10	1	2026-09-26 00:57:28.326	\N	\N	\N	\N	\N
cmuhojzeu005urp1mij8oymxb	cmuhojzeu005rrp1m4xcinqv5	hombro posterior	\N	3	10	2	2026-09-26 00:57:28.326	\N	\N	\N	\N	\N
cmuhojzeu005wrp1msk0ki9cv	cmuhojzeu005vrp1maohpoi0z	curl con mancuernas	\N	3	10	0	2026-09-26 00:57:28.326	\N	\N	\N	\N	\N
cmuhojzeu005xrp1m6a0gedot	cmuhojzeu005vrp1maohpoi0z	extensión de tríceps con mancuerna	\N	3	10	1	2026-09-26 00:57:28.326	\N	\N	\N	\N	\N
cmuhojzeu005zrp1mukxyoiqx	cmuhojzeu005yrp1megzfs4d1	sentadilla	\N	3	10	0	2026-09-26 00:57:28.326	\N	\N	\N	\N	\N
cmuhojzeu0060rp1mm07pq3k1	cmuhojzeu005yrp1megzfs4d1	prensa	\N	3	10	1	2026-09-26 00:57:28.326	\N	\N	\N	\N	\N
cmuhojzeu0061rp1me8j70171	cmuhojzeu005yrp1megzfs4d1	extensiones	\N	3	10	2	2026-09-26 00:57:28.326	\N	\N	\N	\N	\N
cmuhojzeu0062rp1m7vrl44zw	cmuhojzeu005yrp1megzfs4d1	femorales	\N	3	10	3	2026-09-26 00:57:28.326	\N	\N	\N	\N	\N
cmuhojzeu0063rp1md5msop1g	cmuhojzeu005yrp1megzfs4d1	pantorrillas	\N	3	10	4	2026-09-26 00:57:28.326	\N	\N	\N	\N	\N
cmuhojzeu0067rp1maz6y52y8	cmuhojzeu0066rp1mfgn0jx5q	press banca	\N	3	10	0	2026-09-26 00:57:28.326	\N	\N	\N	\N	\N
cmuhojzeu0068rp1mk6hsfwj9	cmuhojzeu0066rp1mfgn0jx5q	press inclinado	\N	3	10	1	2026-09-26 00:57:28.326	\N	\N	\N	\N	\N
cmuhojzeu0069rp1mvilgmvww	cmuhojzeu0066rp1mfgn0jx5q	pecho en máquina	\N	3	10	2	2026-09-26 00:57:28.326	\N	\N	\N	\N	\N
cmuhojzeu006arp1m19hvd51g	cmuhojzeu0066rp1mfgn0jx5q	aperturas en máquina	\N	3	10	3	2026-09-26 00:57:28.326	\N	\N	\N	\N	\N
cmuhojzeu006crp1mkf16e1ao	cmuhojzeu006brp1myu31kz1b	jalón al pecho	\N	3	10	0	2026-09-26 00:57:28.326	\N	\N	\N	\N	\N
cmuhojzeu006drp1mowtv1azl	cmuhojzeu006brp1myu31kz1b	remo con agarre abierto	\N	3	10	1	2026-09-26 00:57:28.326	\N	\N	\N	\N	\N
cmuhojzeu006erp1m4exe91pv	cmuhojzeu006brp1myu31kz1b	remo con agarre cerrado	\N	3	10	2	2026-09-26 00:57:28.326	\N	\N	\N	\N	\N
cmuhojzeu006frp1mgnum97tx	cmuhojzeu006brp1myu31kz1b	peso muerto	\N	3	10	3	2026-09-26 00:57:28.326	\N	\N	\N	\N	\N
cmuhojzeu006hrp1m3au74xkf	cmuhojzeu006grp1mj3pum6d0	sentadilla	\N	3	10	0	2026-09-26 00:57:28.326	\N	\N	\N	\N	\N
cmuhojzeu006irp1md7ktqlsk	cmuhojzeu006grp1mj3pum6d0	prensa	\N	3	10	1	2026-09-26 00:57:28.326	\N	\N	\N	\N	\N
cmuhojzeu006jrp1mnbfmkcs4	cmuhojzeu006grp1mj3pum6d0	extensiones	\N	3	10	2	2026-09-26 00:57:28.326	\N	\N	\N	\N	\N
cmuhojzeu006krp1mhl5bbqtp	cmuhojzeu006grp1mj3pum6d0	femorales	\N	3	10	3	2026-09-26 00:57:28.326	\N	\N	\N	\N	\N
cmuhojzeu006lrp1mpztwf5np	cmuhojzeu006grp1mj3pum6d0	pantorrillas	\N	3	10	4	2026-09-26 00:57:28.326	\N	\N	\N	\N	\N
cmuhte3mb0020pa1mh5mi5zor	cmuhte3mb001wpa1mt27c4yr4	peso muerto rumano con barra	https://wger.de/media/exercise-images/507/13d526ab-12fc-461e-828a-051dd7c13fb1.png	3	10	3	2026-09-26 03:12:51.912	\N	\N	\N	template	https://wger.de/en/exercise/507/view/
cmuhte3mc0030pa1mt6hepc6h	cmuhte3mc002xpa1mlvs1mde2	extensión de glúteos en polea	https://wger.de/media/exercise-images/1131/3bcf3024-2dcc-4995-9694-55aa2c2e4a9a.png	3	10	2	2026-09-26 03:12:51.912	\N	Franpol	\N	template	https://wger.de/en/exercise/1131/view/
cmuhojlal000jrp1mbe8wrwq5	cmuhojlal000hrp1m200n112y	remo con agarre abierto	https://wger.de/media/exercise-images/1119/9b138ad2-5b80-42a8-bfff-93a960444ffe.png	3	10	1	2026-09-26 00:57:10.029	\N	Franpol	\N	template	https://wger.de/en/exercise/1119/view/
\.


--
-- Data for Name: ExerciseImageTemplate; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ExerciseImageTemplate" (id, "exerciseName", "imageUrl", license, "licenseTitle", "licenseAuthor", "licenseAuthorUrl", "sourceUrl", "createdAt") FROM stdin;
cmuhsgda0000503jk3b3j12i6	press militar	https://wger.de/media/exercise-images/418/fa2a2207-43cb-4dc0-bc2a-039e32544790.png	CC-BY-SA 4	\N	Franpol	\N	https://wger.de/en/exercise/418/view/	2026-09-26 02:46:38.136
cmuhsgeo6000603jkd2mqchgu	elevaciones laterales	https://wger.de/media/exercise-images/1378/7c1fcf34-fb7e-45e7-a0c1-51f296235315.jpg	CC-BY-SA 4	Girl doing one arm shoulder raise	carlos3c	https://www.flickr.com/photos/ptpioneer/48317524901/	https://wger.de/en/exercise/1378/view/	2026-09-26 02:46:39.942
cmuhsgfhw000703jkhxc5vb50	hombro posterior	https://wger.de/media/exercise-images/822/74affc0d-03b6-4f33-b5f4-a822a2615f68.png	CC-BY-SA 4	\N	cshep442	\N	https://wger.de/en/exercise/822/view/	2026-09-26 02:46:41.013
cmuhsgghu000803jkoq8o8vjz	jalón al pecho	https://wger.de/media/exercise-images/1127/4942b7c0-6bda-4983-88e5-86547c3d445e.png	CC-BY-SA 4	\N	Franpol	\N	https://wger.de/en/exercise/1127/view/	2026-09-26 02:46:42.307
cmuhsg8u8000003jkbp3f1u4e	press inclinado	https://wger.de/media/exercise-images/41/Incline-bench-press-1.png	CC-BY-SA 3	\N	Everkinetic	\N	https://wger.de/en/exercise/538/view/	2026-09-26 02:46:32.384
cmuhsg9sr000103jkb6bbddc7	pecho en máquina	https://wger.de/media/exercise-images/129/b263c968-e067-4750-916a-d8758a7df23e.webp	CC-BY-SA 4	machine chess press	roneydya	https://fitnessvolt.com/wp-content/uploads/2020/01/machine-chest-press-exercise.jpg.webp	https://wger.de/en/exercise/129/view/	2026-09-26 02:46:33.627
cmuhsgamb000203jk4o0gsctv	aperturas en máquina	https://wger.de/media/exercise-images/926/ae9deb5d-a1e9-4c30-b1e3-c128ba5d4969.png	CC-BY-SA 4	\N	\N	\N	https://wger.de/en/exercise/926/view/	2026-09-26 02:46:34.691
cmuhsgbg5000303jkba55nh2b	extensión en polea	https://wger.de/media/exercise-images/805/7a437824-e2cc-46e1-804a-674f0ea31d25.png	CC-BY-SA 4	\N	\N	\N	https://wger.de/en/exercise/805/view/	2026-09-26 02:46:35.765
cmuhsgcge000403jk5p0a03v3	press francés	https://wger.de/media/exercise-images/84/Lying-close-grip-triceps-press-to-chin-1.png	CC-BY-SA 3	\N	Everkinetic	\N	https://wger.de/en/exercise/246/view/	2026-09-26 02:46:37.07
cmuhsghim000903jkwp8ydbr6	remo con agarre cerrado	https://wger.de/media/exercise-images/1117/2555c4c3-a84d-47db-b83b-cbf721f12e45.png	CC-BY-SA 4	\N	Franpol	\N	https://wger.de/en/exercise/1117/view/	2026-09-26 02:46:43.631
cmuhsgiwl000a03jk920vsdva	polea con agarre prono de pie	https://wger.de/media/exercise-images/912/e10a034f-6370-4dd6-b1c2-416b27844529.png	CC-BY-SA 4	\N	\N	\N	https://wger.de/en/exercise/912/view/	2026-09-26 02:46:45.429
cmuhsgk1w000b03jkms6f0lwr	curl de muñeca	https://wger.de/media/exercise-images/51/f1730f56-7aca-4566-8338-3e42b1bee6e1.webp	CC-BY-SA 4	\N	\N	\N	https://wger.de/en/exercise/51/view/	2026-09-26 02:46:46.748
cmuhsgkvg000c03jkw1d58hmx	curl con mancuernas	https://wger.de/media/exercise-images/1226/a6154dbd-67a0-4a36-8748-0f5af3865e83.jpg	CC-BY-SA 4	Dumbbell bicep curl to press	Lynn_McIntyre	\N	https://wger.de/en/exercise/1226/view/	2026-09-26 02:46:47.981
cmuhsglw9000d03jk6sqjsvtf	sentadilla	https://wger.de/media/exercise-images/1801/60043328-1cfb-4289-9865-aaf64d5aaa28.jpg	CC-BY-SA 4	Barbell Squat	Workout Guru	\N	https://wger.de/en/exercise/1801/view/	2026-09-26 02:46:49.305
cmuhsgmq3000e03jk8jn6mg1k	prensa	https://wger.de/media/exercise-images/371/d2136f96-3a43-4d4c-9944-1919c4ca1ce1.webp	CC-BY-SA 4	\N	\N	\N	https://wger.de/en/exercise/371/view/	2026-09-26 02:46:50.379
cmuhsgnjp000f03jkqtfr7070	extensiones	https://wger.de/media/exercise-images/369/78c915d1-e46d-4d30-8124-65d68664c3ef.png	CC-BY-SA 4	\N	Franpol	\N	https://wger.de/en/exercise/369/view/	2026-09-26 02:46:51.446
cmuhsgodp000g03jkdga1e8oa	femorales	https://wger.de/media/exercise-images/364/b318dde9-f5f2-489f-940a-cd864affb9e3.png	CC-BY-SA 4	\N	Franpol	\N	https://wger.de/en/exercise/364/view/	2026-09-26 02:46:52.525
cmuhsgp76000h03jkbx92fp3t	pantorrillas	https://wger.de/media/exercise-images/622/9a429bd0-afd3-4ad0-8043-e9beec901c81.jpeg	CC-BY-SA 4	\N	clafal	\N	https://wger.de/en/exercise/622/view/	2026-09-26 02:46:53.586
cmuhsgqrr000i03jk792isiw0	zancadas	https://wger.de/media/exercise-images/1830/3b6c547c-ab3d-4472-93cf-561710279eab.jpg	CC-BY-SA 4	\N	hans	\N	https://wger.de/en/exercise/1830/view/	2026-09-26 02:46:55.624
cmuhsgrln000j03jk1ubp1sq3	peso muerto rumano	https://wger.de/media/exercise-images/507/13d526ab-12fc-461e-828a-051dd7c13fb1.png	CC-BY-SA 4	\N	\N	\N	https://wger.de/en/exercise/507/view/	2026-09-26 02:46:56.699
cmuhsgsf7000k03jkgatwnbf6	curl femoral	https://wger.de/media/exercise-images/364/b318dde9-f5f2-489f-940a-cd864affb9e3.png	CC-BY-SA 4	\N	Franpol	\N	https://wger.de/en/exercise/364/view/	2026-09-26 02:46:57.764
cmuhsgtmk000l03jk5xzau1sf	hip thrust	https://wger.de/media/exercise-images/1642/a81ad922-caf5-47f8-99b4-640cb0717436.webp	CC-BY-SA 4	\N	AlucardEvil40	\N	https://wger.de/en/exercise/1642/view/	2026-09-26 02:46:59.325
cmuhsgugc000m03jkbssslpr5	aductores	https://wger.de/media/exercise-images/12/4a42cc6f-648d-40cc-a72a-c49dd47e1667.webp	CC-BY-SA 4	\N	\N	\N	https://wger.de/en/exercise/12/view/	2026-09-26 02:47:00.397
cmuhsh0wt000v03jkglmu30cs	peso muerto rumano con barra	https://wger.de/media/exercise-images/507/13d526ab-12fc-461e-828a-051dd7c13fb1.png	CC-BY-SA 4	\N	\N	\N	https://wger.de/en/exercise/507/view/	2026-09-26 02:47:08.765
cmuhsgv53000n03jk9z0zs4kg	press banca	https://wger.de/media/exercise-images/192/Bench-press-1.png	CC-BY-SA 3	\N	Everkinetic	\N	https://wger.de/en/exercise/73/view/	2026-09-26 02:47:01.288
cmuhsgvym000o03jkxdhvq5ju	remo con agarre abierto	https://wger.de/media/exercise-images/1119/9b138ad2-5b80-42a8-bfff-93a960444ffe.png	CC-BY-SA 4	\N	Franpol	\N	https://wger.de/en/exercise/1119/view/	2026-09-26 02:47:02.351
cmuhsgxca000q03jkl574zj67	fondos en banco	https://wger.de/media/exercise-images/83/Bench-dips-1.png	CC-BY-SA 3	\N	Everkinetic	\N	https://wger.de/en/exercise/197/view/	2026-09-26 02:47:04.138
cmuhsgy52000r03jk4zcazwdt	curl en banco inclinado	https://wger.de/media/exercise-images/1448/2184e68c-32b5-413f-a7c1-4a2d1bb98c35.png	CC-BY-SA 4	\N	\N	\N	https://wger.de/en/exercise/1448/view/	2026-09-26 02:47:05.175
cmuhsgyu0000s03jkrr22l9qz	barra z con agarre prono de pie	https://wger.de/media/exercise-images/94/6dee2f60-aea2-4f2d-9bf6-aef50c4f9483.png	CC-BY-SA 4	\N	Franpol	\N	https://wger.de/en/exercise/94/view/	2026-09-26 02:47:06.072
cmuhsgzj4000t03jkftbqw92l	extensión de tríceps con mancuerna	https://wger.de/media/exercise-images/1336/ebf88217-df26-4ef7-94cb-f0c2220c6abe.webp	CC-BY-SA 4	\N	\N	\N	https://wger.de/en/exercise/1336/view/	2026-09-26 02:47:06.977
cmuhsh07z000u03jkta6eot6v	curl en máquina	https://wger.de/media/exercise-images/1109/00b0a0bf-c14a-4f13-bb14-62c09030a1aa.png	CC-BY-SA 4	\N	Franpol	\N	https://wger.de/en/exercise/1109/view/	2026-09-26 02:47:07.871
cmuhsh1lk000w03jk8kaql5qn	abducción en máquina	https://wger.de/media/exercise-images/1748/923a3ff7-c269-49bd-9f03-697151a40f06.jpg	CC-BY-SA 4	Abduccion en maquina	\N	\N	https://wger.de/en/exercise/1748/view/	2026-09-26 02:47:09.656
cmuhsgwne000p03jke8ibzdo9	curl martillo	https://wger.de/media/exercise-images/1567/0a8c155c-a48e-47e8-9df3-e39f025c6cad.png	CC-BY-SA 4	\N	Mariano_O	https://www.simplyfitness.com/es/pages/hammer-curl	https://wger.de/en/exercise/1567/view/	2026-09-26 02:47:03.243
cmuhsh2a7000x03jkokcg0ag3	extensión de glúteos en polea	https://wger.de/media/exercise-images/1131/3bcf3024-2dcc-4995-9694-55aa2c2e4a9a.png	CC-BY-SA 4	\N	Franpol	\N	https://wger.de/en/exercise/1131/view/	2026-09-26 02:47:10.543
cmuhtshte000003kw3bxj25uu	remo en T	https://wger.de/media/exercise-images/106/T-bar-row-1.png	CC-BY-SA 3	\N	Everkinetic	\N	https://wger.de/en/exercise/513/view/	2026-09-26 03:24:03.507
\.


--
-- Data for Name: MuscleGroup; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MuscleGroup" (id, "routineDayId", name, "order") FROM stdin;
cmu0bg0oy00080374v6sfe5q4	cmu0bfum800020374bcge0lcn	Pecho	0
cmu0bmonh000g0374j1t9t1e2	cmu0bfum800020374bcge0lcn	Tríceps	1
cmu0brcvw000m0374uaug4fpt	cmu0bfum800020374bcge0lcn	Hombro	2
cmu0bunyn000u0374m0sc2jbs	cmu0bfum800030374jzza7cap	Espalda	0
cmu0c239z00140374fdyyoz1w	cmu0bfum800030374jzza7cap	Bíceps	1
cmu0ca5uf001e0374b3jcc03g	cmu0bfum800030374jzza7cap	Antebrazos	2
cmu0d47hc0001030kgegjom4k	cmu0bfum8000503747n1082le	Pecho	0
cmu0d47hg0006030kfq3ugy01	cmu0bfum8000503747n1082le	Tríceps	1
cmu0d47hi000a030k2eghu9d6	cmu0bfum8000503747n1082le	Hombro	2
cmu0d4eud000e030ksefnl1bi	cmu0bfum800060374ahdnbyww	Espalda	0
cmu0d4euh000k030k1nl8pw9t	cmu0bfum800060374ahdnbyww	Bíceps	1
cmu0d4euk000p030kxaecozrs	cmu0bfum800060374ahdnbyww	Antebrazos	2
cmu0d6n9d000t030k08l9183k	cmu0bfum8000403740qzfbmvi	Pierna	0
cmuhojlal0003rp1mr72lfizw	cmuhojlal0002rp1mvpcwdia7	Pecho	0
cmuhojlal0008rp1mjdk78kre	cmuhojlal0002rp1mvpcwdia7	Tríceps	1
cmuhojlal000crp1m8z6k0mfd	cmuhojlal0002rp1mvpcwdia7	Hombro	2
cmuhojlal000hrp1m200n112y	cmuhojlal000grp1mupvbze0p	Espalda	0
cmuhojlal000mrp1m966mrbn0	cmuhojlal000grp1mupvbze0p	Bíceps	1
cmuhojlal000rrp1mf7msw1mg	cmuhojlal000grp1mupvbze0p	Antebrazos	2
cmuhojlal000vrp1mf6had0lg	cmuhojlal000urp1m55afhwfq	Pierna	0
cmuhojlam0012rp1mdx8zigy4	cmuhojlam0011rp1mhw3c6i3g	Pecho	0
cmuhojlam0017rp1mrq6ka877	cmuhojlam0011rp1mhw3c6i3g	Tríceps	1
cmuhojlam001brp1ma9gzctsr	cmuhojlam0011rp1mhw3c6i3g	Hombro	2
cmuhojlam001grp1m76f29zwg	cmuhojlam001frp1mrnu9ght5	Espalda	0
cmuhojlam001lrp1mfsof0ah5	cmuhojlam001frp1mrnu9ght5	Bíceps	1
cmuhojlam001qrp1mztyysy76	cmuhojlam001frp1mrnu9ght5	Antebrazos	2
cmuhojzeu0059rp1m16unhwfh	cmuhojzeu0058rp1mji6z31u5	Pecho	0
cmuhojzeu005erp1m9i84rlgr	cmuhojzeu0058rp1mji6z31u5	Espalda	1
cmuhojzeu005jrp1mn891i4b1	cmuhojzeu0058rp1mji6z31u5	Pierna	2
cmuhojzeu005rrp1m4xcinqv5	cmuhojzeu005qrp1mu96x4fe5	Hombro	0
cmuhojzeu005vrp1maohpoi0z	cmuhojzeu005qrp1mu96x4fe5	Brazos	1
cmuhojzeu005yrp1megzfs4d1	cmuhojzeu005qrp1mu96x4fe5	Pierna	2
cmuhojzeu0066rp1mfgn0jx5q	cmuhojzeu0065rp1mk7dbzoe0	Pecho	0
cmuhojzeu006brp1myu31kz1b	cmuhojzeu0065rp1mk7dbzoe0	Espalda	1
cmuhojzeu006grp1mj3pum6d0	cmuhojzeu0065rp1mk7dbzoe0	Pierna	2
cmuhte3mb001rpa1mhsuczchg	cmuhte3mb001qpa1mnb4zqcrx	Pecho	0
cmuhte3mb001wpa1mt27c4yr4	cmuhte3mb001qpa1mnb4zqcrx	Espalda	1
cmuhte3mb0021pa1m7haz0wvu	cmuhte3mb001qpa1mnb4zqcrx	Hombro	2
cmuhte3mb0026pa1mdbth0r9g	cmuhte3mb0025pa1m06zui3b5	Cuádriceps	0
cmuhte3mb002cpa1mckc7g4ig	cmuhte3mb002bpa1mo819p4gy	Hombro	0
cmuhte3mb002gpa1m2db9knp3	cmuhte3mb002bpa1mo819p4gy	Bíceps	1
cmuhte3mb002lpa1m84r4mrbq	cmuhte3mb002bpa1mo819p4gy	Tríceps	2
cmuhte3mc002ppa1mfhymperc	cmuhte3mb002bpa1mo819p4gy	Antebrazos	3
cmuhte3mc002tpa1mve9gqhsd	cmuhte3mc002spa1mqhscfbv5	Femorales	0
cmuhte3mc002xpa1mlvs1mde2	cmuhte3mc002spa1mqhscfbv5	Glúteo	1
cmuhte3mc0033pa1mthncs995	cmuhte3mc0032pa1msq772it0	Pecho	0
cmuhte3mc0038pa1m6gsn1gc1	cmuhte3mc0032pa1msq772it0	Espalda	1
cmuhsokrj0003qm1mm7jvbsf7	cmuhsokrj0002qm1muvy6crmd	Pecho	0
cmuhsokrj0008qm1mrer7ln72	cmuhsokrj0002qm1muvy6crmd	Espalda	1
cmuhsokrk000dqm1m0cg1u5sg	cmuhsokrj0002qm1muvy6crmd	Hombro	2
cmuhsokrk000iqm1mbdpleppa	cmuhsokrk000hqm1m7h1y42o8	Cuádriceps	0
cmuhsokrk000oqm1mh4whajyi	cmuhsokrk000nqm1m2dek38sd	Hombro	0
cmuhsokrk000sqm1mzlfnitbi	cmuhsokrk000nqm1m2dek38sd	Bíceps	1
cmuhsokrk000xqm1m9yevw1s9	cmuhsokrk000nqm1m2dek38sd	Tríceps	2
cmuhsokrk0011qm1mef25ny59	cmuhsokrk000nqm1m2dek38sd	Antebrazos	3
cmuhsokrk0015qm1mape2bn0a	cmuhsokrk0014qm1mdkdxts8j	Femorales	0
cmuhsokrk001aqm1mrqapooeh	cmuhsokrk0014qm1mdkdxts8j	Glúteo	1
cmuhsokrk001fqm1mmvc6mfu2	cmuhsokrk001eqm1mvgjsrch9	Pecho	0
cmuhsokrk001kqm1mr4l8l14b	cmuhsokrk001eqm1mvgjsrch9	Espalda	1
\.


--
-- Data for Name: PasswordResetToken; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PasswordResetToken" (id, "userId", "tokenHash", "expiresAt", "usedAt", "createdAt") FROM stdin;
cmu4qne2l000v03icqdi42fcm	cmu07tjgc000003popryj1zft	$2b$10$SKk6Y/kJHAzih3Txp6kLku4QOa97tLwDAQnLfnKY62k6MLWWia.fK	2026-09-17 00:05:06.236	2026-09-16 23:35:44.356	2026-09-16 23:35:06.238
\.


--
-- Data for Name: Routine; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Routine" (id, "userId", name, "createdAt", "updatedAt") FROM stdin;
cmu0bfum800010374wpnfxbkr	cmu07tjgc000003popryj1zft	PPL	2026-09-13 21:18:15.486	2026-09-13 21:18:15.486
cmuhojlal0001rp1msxrzyrdg	cmuhii8q40001ph1mx4q7ksjc	TEST1	2026-09-26 00:57:10.029	2026-09-26 00:57:10.029
cmuhojzeu0057rp1m9yf5brmr	cmuhii8q40001ph1mx4q7ksjc	TEST3	2026-09-26 00:57:28.326	2026-09-26 00:57:28.326
cmuhsokrj0001qm1moqya3dd7	cmuhii8q40001ph1mx4q7ksjc	TEST2	2026-09-26 02:53:01.088	2026-09-26 02:53:01.088
cmuhte3mb001ppa1mzwxahhaw	cmuhii8q40001ph1mx4q7ksjc	Rutina1	2026-09-26 03:12:51.912	2026-09-26 03:12:51.912
\.


--
-- Data for Name: RoutineDay; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RoutineDay" (id, "routineId", "dayOfWeek") FROM stdin;
cmu0bfum800020374bcge0lcn	cmu0bfum800010374wpnfxbkr	1
cmu0bfum800030374jzza7cap	cmu0bfum800010374wpnfxbkr	2
cmu0bfum8000403740qzfbmvi	cmu0bfum800010374wpnfxbkr	3
cmu0bfum8000503747n1082le	cmu0bfum800010374wpnfxbkr	4
cmu0bfum800060374ahdnbyww	cmu0bfum800010374wpnfxbkr	5
cmuhojlal0002rp1mvpcwdia7	cmuhojlal0001rp1msxrzyrdg	1
cmuhojlal000grp1mupvbze0p	cmuhojlal0001rp1msxrzyrdg	2
cmuhojlal000urp1m55afhwfq	cmuhojlal0001rp1msxrzyrdg	3
cmuhojlam0011rp1mhw3c6i3g	cmuhojlal0001rp1msxrzyrdg	4
cmuhojlam001frp1mrnu9ght5	cmuhojlal0001rp1msxrzyrdg	5
cmuhojzeu0058rp1mji6z31u5	cmuhojzeu0057rp1m9yf5brmr	1
cmuhojzeu005prp1mwhy38qw7	cmuhojzeu0057rp1m9yf5brmr	2
cmuhojzeu005qrp1mu96x4fe5	cmuhojzeu0057rp1m9yf5brmr	3
cmuhojzeu0064rp1myefv0816	cmuhojzeu0057rp1m9yf5brmr	4
cmuhojzeu0065rp1mk7dbzoe0	cmuhojzeu0057rp1m9yf5brmr	5
cmuhsokrj0002qm1muvy6crmd	cmuhsokrj0001qm1moqya3dd7	1
cmuhsokrk000hqm1m7h1y42o8	cmuhsokrj0001qm1moqya3dd7	2
cmuhsokrk000nqm1m2dek38sd	cmuhsokrj0001qm1moqya3dd7	3
cmuhsokrk0014qm1mdkdxts8j	cmuhsokrj0001qm1moqya3dd7	4
cmuhsokrk001eqm1mvgjsrch9	cmuhsokrj0001qm1moqya3dd7	5
cmuhte3mb001qpa1mnb4zqcrx	cmuhte3mb001ppa1mzwxahhaw	1
cmuhte3mb0025pa1m06zui3b5	cmuhte3mb001ppa1mzwxahhaw	2
cmuhte3mb002bpa1mo819p4gy	cmuhte3mb001ppa1mzwxahhaw	3
cmuhte3mc002spa1mqhscfbv5	cmuhte3mb001ppa1mzwxahhaw	4
cmuhte3mc0032pa1msq772it0	cmuhte3mb001ppa1mzwxahhaw	5
\.


--
-- Data for Name: SetLog; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SetLog" (id, "workoutLogId", "setNumber", weight, reps) FROM stdin;
cmu1u0sqy000203h4cu902y7m	cmu1u0sqy000103h46ha7yo85	1	20	8
cmu1u0sqy000303h442a8uo5m	cmu1u0sqy000103h46ha7yo85	2	20	7
cmu1u0sqy000403h4y9h0ui0k	cmu1u0sqy000103h46ha7yo85	3	20	5
cmu1u1jhx000703h4h02anp2n	cmu1u1jhx000603h4y572495g	1	12.5	7
cmu1u1jhx000803h40a9mmi2l	cmu1u1jhx000603h4y572495g	2	12.5	6
cmu1u1jhx000903h44l0a5lo4	cmu1u1jhx000603h4y572495g	3	12.5	4
cmu1u2e02000c03h4at20onyj	cmu1u2e02000b03h4ixfg9pkm	1	40	7
cmu1u2e02000d03h4kjk26z9z	cmu1u2e02000b03h4ixfg9pkm	2	40	6
cmu1u2e02000e03h42214rp6v	cmu1u2e02000b03h4ixfg9pkm	3	40	6
cmu1u2v0g000h03h4hfrmwvqq	cmu1u2v0f000g03h4ooukom8s	1	18	8
cmu1u2v0g000i03h4gvutz74r	cmu1u2v0f000g03h4ooukom8s	2	18	5
cmu1u39j5000l03h4erlapaow	cmu1u39j5000k03h4qijvne6s	1	15	8
cmu1u39j5000m03h4cnsarnru	cmu1u39j5000k03h4qijvne6s	2	15	8
cmu1u3oa8000p03h4557wt97z	cmu1u3oa8000o03h4bgd1ba9i	1	12	7
cmu1u3oa8000q03h4ihc2i75j	cmu1u3oa8000o03h4bgd1ba9i	2	12	6
cmu1u44j3000t03h4zi3b2ien	cmu1u44j3000s03h4j27dwf7u	1	14	8
cmu1u44j3000u03h4bgw2j3pg	cmu1u44j3000s03h4j27dwf7u	2	14	8
cmu3afh8b000203d4e0pmtpzc	cmu3afh8b000103d4xu2r6qqa	1	50	8
cmu3afh8b000303d4u15lf5yw	cmu3afh8b000103d4xu2r6qqa	2	50	7
cmu3afh8b000403d4z3kpe4f8	cmu3afh8b000103d4xu2r6qqa	3	50	6
cmu3ag6m3000703d4f6ebxs54	cmu3ag6m3000603d4je9htwps	1	50	8
cmu3ag6m3000803d4yh0l1bmc	cmu3ag6m3000603d4je9htwps	2	50	8
cmu3ag6m3000903d4i4j9h2jl	cmu3ag6m3000603d4je9htwps	3	50	6
cmu3an3vm000j03d4qugvkel8	cmu3an3vm000i03d449d807m2	1	45	6
cmu3an3vm000k03d4qdlbu6e3	cmu3an3vm000i03d449d807m2	2	45	6
cmu3anije000n03d48f4yzi6r	cmu3anijd000m03d4r4gg9dii	1	30	8
cmu3anije000o03d45smswqhp	cmu3anijd000m03d4r4gg9dii	2	30	8
cmu3api3y000r03d4g90bxea2	cmu3api3y000q03d432blmijf	1	20	6
cmu3api3y000s03d47dtdl9uk	cmu3api3y000q03d432blmijf	2	20	5
cmu3aq9t0000v03d48n4tq4ar	cmu3aq9t0000u03d4655oz77q	1	10	7
cmu3aq9t0000w03d492tgh47x	cmu3aq9t0000u03d4655oz77q	2	10	5
cmu3aqwta000z03d4ju6q9xzk	cmu3aqwta000y03d4k16h635d	1	6	6
cmu3aqwta001003d4p764u3tq	cmu3aqwta000y03d4k16h635d	2	6	6
cmu3arpp3001303d49foaacsj	cmu3arpp3001203d4pull96kl	1	10	8
cmu3arpp3001403d4203vt2h8	cmu3arpp3001203d4pull96kl	2	10	8
cmu3asl8z001703d4ytqpkd0p	cmu3asl8z001603d4qe6jtxff	1	45	15
cmu3asl8z001803d45qstidsm	cmu3asl8z001603d4qe6jtxff	2	45	15
cmu4qjpj1000203icqtwrvcx5	cmu4qjpj1000103icxofdokye	1	52	8
cmu4qjpj1000303ica4pfib7o	cmu4qjpj1000103icxofdokye	2	52	8
cmu4qjpj1000403icithet70d	cmu4qjpj1000103icxofdokye	3	52	8
cmu4qkkiy000703icqnt8as9q	cmu4qkkiy000603iccgqhuon8	1	54	8
cmu4qkkiy000803icetm6q0uc	cmu4qkkiy000603iccgqhuon8	2	54	8
cmu4qkkiy000903icnv3rxjby	cmu4qkkiy000603iccgqhuon8	3	54	8
cmu4ql9xd000c03iclrd1l8h9	cmu4ql9xd000b03icn0wbg7i2	1	38	7
cmu4ql9xd000d03ics3sqw8gp	cmu4ql9xd000b03icn0wbg7i2	2	38	6
cmu4ql9xd000e03ic6vnubt6g	cmu4ql9xd000b03icn0wbg7i2	3	38	6
cmu4qliu0000h03icazbgbzb5	cmu4qliu0000g03ickpy911by	1	52	8
cmu4qliu0000i03icfyogm0ub	cmu4qliu0000g03ickpy911by	2	52	8
cmu4qliu0000j03icnmy6bs2g	cmu4qliu0000g03ickpy911by	3	52	7
cmu4qlq56000m03ic9yivr5pu	cmu4qlq56000l03icg83i3uja	1	100	8
cmu4qlq56000n03ict7fa8o78	cmu4qlq56000l03icg83i3uja	2	100	8
cmu4qlq56000o03icvdc4fnpn	cmu4qlq56000l03icg83i3uja	3	100	8
cmu4qm3iz000r03iczb7kmk6m	cmu4qm3iz000q03icwryev5ie	1	30	6
cmu4qm3iz000s03icj1nqhqc8	cmu4qm3iz000q03icwryev5ie	2	30	6
cmu4qm3iz000t03ic5yrowp5x	cmu4qm3iz000q03icwryev5ie	3	30	6
cmu6ab1y6000203n0myyqjofl	cmu6ab1y6000103n0s8e38jvc	1	20	8
cmu6ab1y6000303n0m0tbdvrt	cmu6ab1y6000103n0s8e38jvc	2	20	6
cmu6ab1y6000403n0c2wbsmcj	cmu6ab1y6000103n0s8e38jvc	3	20	4
cmu6abbmj000703n0f7jns5si	cmu6abbmj000603n0d7q0u9l7	1	10	6
cmu6abbmj000803n0hh412n7a	cmu6abbmj000603n0d7q0u9l7	2	10	6
cmu6abbmj000903n0cg5twbfm	cmu6abbmj000603n0d7q0u9l7	3	10	6
cmu6abkrn000c03n0vetl4wtq	cmu6abkrn000b03n0b4ly30pf	1	45	6
cmu6abkrn000d03n0mz12bno5	cmu6abkrn000b03n0b4ly30pf	2	45	6
cmu6abkrn000e03n0fruj24cs	cmu6abkrn000b03n0b4ly30pf	3	45	6
cmu6aci4s000h03n0xecsji56	cmu6aci4s000g03n03aos9twj	1	18	6
cmu6aci4s000i03n0551ejhw8	cmu6aci4s000g03n03aos9twj	2	14	10
cmu6acs5n000l03n0jpz571wg	cmu6acs5n000k03n0ckbq0fjm	1	15	12
cmu6acs5n000m03n0sy5kudh5	cmu6acs5n000k03n0ckbq0fjm	2	15	8
cmu6aczcc000p03n0pxvtq8ni	cmu6aczcc000o03n0bqw2x5r0	1	12	9
cmu6aczcc000q03n0rl0iti2b	cmu6aczcc000o03n0bqw2x5r0	2	12	8
cmu6ad31w000t03n00azqm88t	cmu6ad31w000s03n05zll8vvq	1	14	8
cmu6ad31w000u03n0hldgf0pl	cmu6ad31w000s03n05zll8vvq	2	14	8
cmu7kcq9x000203646yk1tg84	cmu7kcq9x00010364k4bqfl1d	1	50	7
cmu7kcq9x000303649m9wzw48	cmu7kcq9x00010364k4bqfl1d	2	50	7
cmu7kcq9x000403641vcji67b	cmu7kcq9x00010364k4bqfl1d	3	50	6
cmu7kd2qt00070364bxmaezrr	cmu7kd2qt00060364dh68u6rt	1	50	6
cmu7kd2qt000803647agu5avn	cmu7kd2qt00060364dh68u6rt	2	50	6
cmu7kd2qt00090364cc20d9nz	cmu7kd2qt00060364dh68u6rt	3	50	6
cmu7kenra000c0364mlxlokw6	cmu7kenra000b0364xh7ve57g	1	45	6
cmu7kenra000d0364hdckfl1f	cmu7kenra000b0364xh7ve57g	2	45	6
cmu7kezq6000g03640rzr4zgc	cmu7kezq6000f0364bca3tq1w	1	30	7
cmu7kezq6000h0364bsohbxvg	cmu7kezq6000f0364bca3tq1w	2	30	7
cmu7kfw7y000k0364b72qax57	cmu7kfw7y000j0364comwnd8l	1	20	6
cmu7kfw7y000l0364gzr5neaz	cmu7kfw7y000j0364comwnd8l	2	20	6
cmu7kg4u6000o0364b36agggg	cmu7kg4u6000n0364dydzywkh	1	10	7
cmu7kg4u6000p0364b80icham	cmu7kg4u6000n0364dydzywkh	2	10	6
cmu7kgauu000s0364ibz0inhr	cmu7kgauu000r0364glf8a05r	1	6	6
cmu7kgauv000t0364hmgcjpo4	cmu7kgauu000r0364glf8a05r	2	6	6
cmu7kgssh000w0364tgi4af0v	cmu7kgssh000v0364sjp2typy	1	10	8
cmu7kgssh000x0364r14uawip	cmu7kgssh000v0364sjp2typy	2	10	8
cmu7kgz1z001003644cf46gwr	cmu7kgz1z000z036430n73zlf	1	45	15
cmu7kgz2000110364zyespgop	cmu7kgz1z000z036430n73zlf	2	45	15
cmubwtzgz000203m4yxive6bt	cmubwtzgz000103m47c8awaef	1	20	10
cmubwtzh0000303m4cr04hiox	cmubwtzgz000103m47c8awaef	2	20	7
cmubwtzh0000403m4rbb6h6kw	cmubwtzgz000103m47c8awaef	3	20	6
cmubwuij3000703m4sunimy33	cmubwuij3000603m4bdxjoj1a	1	10	10
cmubwuij3000803m46hj1oylc	cmubwuij3000603m4bdxjoj1a	2	10	8
cmubwuij3000903m4dvin149p	cmubwuij3000603m4bdxjoj1a	3	10	6
cmubwuzwf000c03m4y1b0d1bo	cmubwuzwf000b03m4sbn2bd7c	1	45	8
cmubwuzwf000d03m4dd3njwqs	cmubwuzwf000b03m4sbn2bd7c	2	45	8
cmubwuzwf000e03m4kc8erxa0	cmubwuzwf000b03m4sbn2bd7c	3	45	8
cmubwvhip000h03m443ro37vo	cmubwvhip000g03m4b4xd1lva	1	18	6
cmubwvhip000i03m47jc2vok6	cmubwvhip000g03m4b4xd1lva	2	14	10
cmubwvzwr000l03m4zmajmk4l	cmubwvzwr000k03m4ym18wwox	1	15	15
cmubwvzwr000m03m4v8u915rm	cmubwvzwr000k03m4ym18wwox	2	15	12
cmubwwgdd000p03m4fthfvmyl	cmubwwgdd000o03m4v7vx3ljd	1	12	10
cmubwwgdd000q03m47e30qfzq	cmubwwgdd000o03m4v7vx3ljd	2	12	10
cmubwwlpb000t03m4weelmokv	cmubwwlpb000s03m4j7av1zxe	1	14	10
cmubwwlpb000u03m40hznrpiq	cmubwwlpb000s03m4j7av1zxe	2	14	8
cmud8b86y000203hcswtk924x	cmud8b86y000103hcwaxpj27y	1	50	8
cmud8b86z000303hcesp6mh7u	cmud8b86y000103hcwaxpj27y	2	45	7
cmud8bjyz000603hclqenn5cd	cmud8bjyz000503hc71u0eond	1	50	10
cmud8bjyz000703hcx7o184j5	cmud8bjyz000503hc71u0eond	2	50	10
cmud8bsv2000a03hc8lznfix2	cmud8bsv2000903hcfbmi0ux3	1	45	8
cmud8bsv2000b03hcammx77i4	cmud8bsv2000903hcfbmi0ux3	2	45	8
cmud8bwrl000e03hcro7074fa	cmud8bwrl000d03hcfqn61tl4	1	35	8
cmud8bwrl000f03hcrqrj6mbz	cmud8bwrl000d03hcfqn61tl4	2	35	8
cmud8ceo5000i03hcej73025w	cmud8ceo5000h03hckm2svety	1	25	8
cmud8ceo5000j03hcgwem2dw3	cmud8ceo5000h03hckm2svety	2	20	6
cmud8cof2000m03hc41u13syn	cmud8cof1000l03hc8bsjv1lu	1	10	7
cmud8cof2000n03hcsfexhg32	cmud8cof1000l03hc8bsjv1lu	2	10	6
cmud8cs0d000q03hcvonm38x2	cmud8cs0d000p03hch57nhy2u	1	6	6
cmud8cs0d000r03hc5t6lzayk	cmud8cs0d000p03hch57nhy2u	2	6	6
cmud8d658000u03hccv7sbf1t	cmud8d658000t03hcah6rnlj1	1	10	12
cmud8d658000v03hcaelhjsjb	cmud8d658000t03hcah6rnlj1	2	10	12
cmud8e4zj000y03hc12c5ymjv	cmud8e4zj000x03hcm1xtak7l	1	45	20
cmud8e4zj000z03hcg0qli50z	cmud8e4zj000x03hcm1xtak7l	2	50	20
cmuepoemx000203kcflyd3z08	cmuepoemx000103kcqd8tsdwj	1	52	8
cmuepoemy000303kctlhbuv8y	cmuepoemx000103kcqd8tsdwj	2	52	8
cmuepoemy000403kc03kle8qf	cmuepoemx000103kcqd8tsdwj	3	52	8
cmuepoimb000703kccutrfktp	cmuepoimb000603kcuubv3uss	1	54	8
cmuepoimb000803kc2s7l5u98	cmuepoimb000603kcuubv3uss	2	54	8
cmuepoimb000903kco0zedel6	cmuepoimb000603kcuubv3uss	3	54	8
cmuepol09000c03kcwzphh8y2	cmuepol09000b03kc2v6nh6ev	1	38	7
cmuepol09000d03kcchoomdj5	cmuepol09000b03kc2v6nh6ev	2	38	6
cmuepol09000e03kctl5h4v3z	cmuepol09000b03kc2v6nh6ev	3	38	6
cmuepomc9000h03kcjlppq9xw	cmuepomc9000g03kcw5urv9xl	1	52	8
cmuepomc9000i03kc0d0fpum1	cmuepomc9000g03kcw5urv9xl	2	52	8
cmuepomc9000j03kc984whofn	cmuepomc9000g03kcw5urv9xl	3	52	7
cmuepoo2f000m03kciku1vnc0	cmuepoo2e000l03kcsao4p8l2	1	100	8
cmuepoo2f000n03kcgqqe31xl	cmuepoo2e000l03kcsao4p8l2	2	100	8
cmuepoo2f000o03kcz4h8mzvz	cmuepoo2e000l03kcsao4p8l2	3	100	8
cmuepopft000r03kcrfsjjpv2	cmuepopft000q03kclouxn4gr	1	30	6
cmuepopft000s03kc4f4vw82f	cmuepopft000q03kclouxn4gr	2	30	6
cmuepopft000t03kcjiqlm40c	cmuepopft000q03kclouxn4gr	3	30	6
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, name, email, password, "createdAt", "avatarUrl", "shareToken") FROM stdin;
cmu07tjgc000003popryj1zft	Juan Manuel C	juanma2006900@gmail.com	$2b$10$B1tdl6hA76za4FtHemsrXO20AGjqDORjCIdodJtcrXFMNxUmXGUWC	2026-09-13 19:36:55.74	\N	3de1bc2da18f7761fa05047246c0f026
cmuhi9yy20000ph1m7qd5ar6s	Juan	juan1745455@gmail.com	$2b$10$m1oMH0wmZHhIqM6w6ze4XekmGhomHcRJ21lFhJ3AgVrygHkOYTR2u	2026-09-25 22:01:43.467	\N	\N
cmuhii8q40001ph1mx4q7ksjc	pruebas	gymtrackerofficial10@gmail.com	$2b$10$CJNgnGz66LhwKW73z27riOH20XjCB3hy/q2E70KW6Ej4g2rXK5LwS	2026-09-25 22:08:09.388	\N	\N
\.


--
-- Data for Name: WorkoutLog; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."WorkoutLog" (id, "exerciseId", notes, "performedAt") FROM stdin;
cmu1u0sqy000103h46ha7yo85	cmu0bgirt000a0374gxd5wwvs		2026-09-14 22:46:12.105
cmu1u1jhx000603h4y572495g	cmu0bl4bn000c0374idd94bv0		2026-09-14 22:46:46.773
cmu1u2e02000b03h4ixfg9pkm	cmu0blvze000e03748nh3hgg7	Mejorar técnica intentando juntar los bíceps	2026-09-14 22:47:26.307
cmu1u2v0f000g03h4ooukom8s	cmu0bn8f3000i0374a3k2gwqm		2026-09-14 22:47:48.352
cmu1u39j5000k03h4qijvne6s	cmu0bqt22000k0374ucqfl3gl		2026-09-14 22:48:07.169
cmu1u3oa8000o03h4bgd1ba9i	cmu0bs8de000q037415ethewg		2026-09-14 22:48:26.288
cmu1u44j3000s03h4j27dwf7u	cmu0bt7x2000s0374gd2m007d	Empezar con la izquierda	2026-09-14 22:48:47.343
cmu3afh8b000103d4xu2r6qqa	cmu0bvhb4000w03746d05mctj		2026-09-15 23:13:17.05
cmu3ag6m3000603d4je9htwps	cmu0bwn5s000y0374ukxz3q00		2026-09-15 23:13:49.947
cmu3an3vm000i03d449d807m2	cmu3alhs1000g03d4u4yck8bn		2026-09-15 23:19:12.995
cmu3anijd000m03d4r4gg9dii	cmu0c00t000120374i8lyo018		2026-09-15 23:19:31.994
cmu3api3y000q03d432blmijf	cmu0c3mpm00160374lenu7vvf		2026-09-15 23:21:04.75
cmu3aq9t0000u03d4655oz77q	cmu0c5a9v001a0374bwgum03h		2026-09-15 23:21:40.644
cmu3aqwta000y03d4k16h635d	cmu0c8xvf001c0374i3l1tc1a		2026-09-15 23:22:10.463
cmu3arpp3001203d4pull96kl	cmu0cdkqj001g0374483i8oq6		2026-09-15 23:22:47.896
cmu3asl8z001603d4qe6jtxff	cmu0cgybv001i0374m2hjm1xw		2026-09-15 23:23:28.787
cmu4qjpj1000103icxofdokye	cmu0d6td8000v030kjfc0mdv9		2026-09-16 23:32:14.461
cmu4qkkiy000603iccgqhuon8	cmu0d7kz9000x030k63xe9mud		2026-09-16 23:32:54.634
cmu4ql9xd000b03icn0wbg7i2	cmu0d91s0000z030ks7e7cwbf		2026-09-16 23:33:27.554
cmu4qliu0000g03ickpy911by	cmu0dajuv0011030kkyzkx94m		2026-09-16 23:33:39.097
cmu4qlq56000l03icg83i3uja	cmu0dbeyq0013030kzfeqocfv		2026-09-16 23:33:48.571
cmu4qm3iz000q03icwryev5ie	cmu0dcas20015030k3rlpx7vm		2026-09-16 23:34:05.915
cmu6ab1y6000103n0s8e38jvc	cmu0d47hc0002030k5407gymm		2026-09-18 01:33:09.15
cmu6abbmj000603n0d7q0u9l7	cmu0d47hd0003030kbrddfksx		2026-09-18 01:33:21.691
cmu6abkrn000b03n0b4ly30pf	cmu0d47hd0004030k5ict6dya		2026-09-18 01:33:33.54
cmu6aci4s000g03n03aos9twj	cmu0d47hg0007030ky65bhd7r		2026-09-18 01:34:16.781
cmu6acs5n000k03n0ckbq0fjm	cmu0d47hg0008030ksyrtdlbs		2026-09-18 01:34:29.772
cmu6aczcc000o03n0bqw2x5r0	cmu0d47hi000b030kj991y3ve		2026-09-18 01:34:39.085
cmu6ad31w000s03n05zll8vvq	cmu0d47hi000c030kcek0mm62		2026-09-18 01:34:43.893
cmu7kcq9x00010364k4bqfl1d	cmu0d4eue000f030k9pm2libv		2026-09-18 23:02:09.668
cmu7kd2qt00060364dh68u6rt	cmu0d4eue000g030ksq6nu668		2026-09-18 23:02:25.83
cmu7kenra000b0364xh7ve57g	cmu0d4eue000i030k6md4e5mk		2026-09-18 23:03:39.718
cmu7kezq6000f0364bca3tq1w	cmu0d4eue000h030ktvj9f3ff		2026-09-18 23:03:55.23
cmu7kfw7y000j0364comwnd8l	cmu0d4euh000l030kstbzwthb		2026-09-18 23:04:37.342
cmu7kg4u6000n0364dydzywkh	cmu0d4euh000m030k1cjfe8mq		2026-09-18 23:04:48.51
cmu7kgauu000r0364glf8a05r	cmu0d4euh000n030k4vz5gnc4		2026-09-18 23:04:56.311
cmu7kgssh000v0364sjp2typy	cmu0d4euk000q030ki9tzfe5u		2026-09-18 23:05:19.554
cmu7kgz1z000z036430n73zlf	cmu0d4euk000r030klwvo45el		2026-09-18 23:05:27.672
cmubwtzgz000103m47c8awaef	cmu0bgirt000a0374gxd5wwvs		2026-09-22 00:02:34.833
cmubwuij3000603m4bdxjoj1a	cmu0bl4bn000c0374idd94bv0		2026-09-22 00:02:59.535
cmubwuzwf000b03m4sbn2bd7c	cmu0blvze000e03748nh3hgg7		2026-09-22 00:03:22.047
cmubwvhip000g03m4b4xd1lva	cmu0bn8f3000i0374a3k2gwqm		2026-09-22 00:03:44.882
cmubwvzwr000k03m4ym18wwox	cmu0bqt22000k0374ucqfl3gl		2026-09-22 00:04:08.716
cmubwwgdd000o03m4v7vx3ljd	cmu0bs8de000q037415ethewg		2026-09-22 00:04:30.049
cmubwwlpb000s03m4j7av1zxe	cmu0bt7x2000s0374gd2m007d		2026-09-22 00:04:36.959
cmud8b86y000103hcwaxpj27y	cmu0bvhb4000w03746d05mctj		2026-09-22 22:11:41.241
cmud8bjyz000503hc71u0eond	cmu0bwn5s000y0374ukxz3q00		2026-09-22 22:11:56.507
cmud8bsv2000903hcfbmi0ux3	cmu3alhs1000g03d4u4yck8bn		2026-09-22 22:12:08.031
cmud8bwrl000d03hcfqn61tl4	cmu0c00t000120374i8lyo018		2026-09-22 22:12:13.089
cmud8ceo5000h03hckm2svety	cmu0c3mpm00160374lenu7vvf		2026-09-22 22:12:36.293
cmud8cof1000l03hc8bsjv1lu	cmu0c5a9v001a0374bwgum03h		2026-09-22 22:12:48.926
cmud8cs0d000p03hch57nhy2u	cmu0c8xvf001c0374i3l1tc1a		2026-09-22 22:12:53.581
cmud8d658000t03hcah6rnlj1	cmu0cdkqj001g0374483i8oq6		2026-09-22 22:13:11.901
cmud8e4zj000x03hcm1xtak7l	cmu0cgybv001i0374m2hjm1xw	Dropset de 50kg hacia abajo de a 20 reps. En total 100 reps	2026-09-22 22:13:57.056
cmuepoemx000103kcqd8tsdwj	cmu0d6td8000v030kjfc0mdv9		2026-09-23 23:05:35.767
cmuepoimb000603kcuubv3uss	cmu0d7kz9000x030k63xe9mud		2026-09-23 23:05:40.931
cmuepol09000b03kc2v6nh6ev	cmu0d91s0000z030ks7e7cwbf		2026-09-23 23:05:44.025
cmuepomc9000g03kcw5urv9xl	cmu0dajuv0011030kkyzkx94m		2026-09-23 23:05:45.754
cmuepoo2e000l03kcsao4p8l2	cmu0dbeyq0013030kzfeqocfv		2026-09-23 23:05:47.991
cmuepopft000q03kclouxn4gr	cmu0dcas20015030k3rlpx7vm		2026-09-23 23:05:49.769
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
33dbe684-b212-464a-a4c0-79f96c61296f	a79dd4ad01ac302229c10ae0594ed279757a116ee51ef03141a5a0651be0c24d	2026-09-24 02:48:20.949802+00	20260913193435_init	\N	\N	2026-09-24 02:48:20.926725+00	1
0f8025a2-cdfe-4a0a-97de-67bd29285b3d	a96331face34c33b6ff6f80a30178bb81c380f5e5a70f8c68887b4838753e39a	2026-09-24 02:48:20.98922+00	20260913195330_phase2_routines	\N	\N	2026-09-24 02:48:20.958899+00	1
496fa021-1c44-40f5-a904-9ceb204b835f	4bab67a5637e276898f259a1e3da1c722a007d9d64c5be79188894b74556b52a	2026-09-24 02:48:21.017695+00	20260913200050_phase3_workout_logs	\N	\N	2026-09-24 02:48:20.995403+00	1
7f8ea9b9-9fd3-47b8-810a-66dabf16598f	122cfd98a90416f45c83ba81862222d3bdfe67032995440e8c414b271868f226	2026-09-24 02:48:21.040422+00	20260913201550_phase5_images	\N	\N	2026-09-24 02:48:21.02484+00	1
468fb976-845a-488e-880a-e9a6522fa86e	26a5806aeb711601b66afeac7cafd0c8c772ee93e77b24e0bb27063e731e29ab	2026-09-24 02:48:21.065906+00	20260914020634_add_target_weight	\N	\N	2026-09-24 02:48:21.046168+00	1
b857e3ab-ec90-435d-9ead-c2436766fe8c	f9f637e952c5b08ca45fb08d7ae490b8438b2daca989179c4f301c058f345c1d	2026-09-24 02:48:21.095984+00	20260916230834_add_password_reset_token	\N	\N	2026-09-24 02:48:21.072856+00	1
2203bc6f-48e2-49e9-af3d-e4a2aedda2de	f02f9ae418e5120cde2ea0d3c4a82607d344521c7c20be8d2d11ec29341d7e07	2026-09-24 02:48:21.120243+00	20260918035333_add_share_token	\N	\N	2026-09-24 02:48:21.103409+00	1
5e8bd09d-37c8-4c8d-a86c-4e4b5ba741ba	fa9314b7b8fa95cdf405d7c67cc73ee18a18f52e8d7bc329b78692410e6368dd	2026-09-24 02:48:21.15083+00	20260923230931_add_daily_checkin	\N	\N	2026-09-24 02:48:21.127203+00	1
cd2b7dbf-8597-4743-ba3b-64d809fa3be6	a79dd4ad01ac302229c10ae0594ed279757a116ee51ef03141a5a0651be0c24d	2026-09-13 19:34:35.456502+00	20260913193435_init	\N	\N	2026-09-13 19:34:35.448067+00	1
9918b43b-1f39-4a2a-b489-1c25ddb96735	a96331face34c33b6ff6f80a30178bb81c380f5e5a70f8c68887b4838753e39a	2026-09-13 19:53:30.443857+00	20260913195330_phase2_routines	\N	\N	2026-09-13 19:53:30.371113+00	1
c499a2e8-0b23-4b11-8335-bfd5f594e8de	4bab67a5637e276898f259a1e3da1c722a007d9d64c5be79188894b74556b52a	2026-09-13 20:00:50.574252+00	20260913200050_phase3_workout_logs	\N	\N	2026-09-13 20:00:50.495975+00	1
2943f7ab-cba9-42a5-82c5-57abc003026e	122cfd98a90416f45c83ba81862222d3bdfe67032995440e8c414b271868f226	2026-09-13 20:15:50.137747+00	20260913201550_phase5_images	\N	\N	2026-09-13 20:15:50.115505+00	1
1134f493-d3ad-46f1-b331-83d5b4a84953	26a5806aeb711601b66afeac7cafd0c8c772ee93e77b24e0bb27063e731e29ab	2026-09-14 02:06:34.598444+00	20260914020634_add_target_weight	\N	\N	2026-09-14 02:06:34.577692+00	1
fc559a48-799a-45c8-bfce-9f169dc9db4d	f9f637e952c5b08ca45fb08d7ae490b8438b2daca989179c4f301c058f345c1d	2026-09-16 23:08:34.889982+00	20260916230834_add_password_reset_token	\N	\N	2026-09-16 23:08:34.77104+00	1
217f12f3-627b-422c-a40b-1981738b941c	f02f9ae418e5120cde2ea0d3c4a82607d344521c7c20be8d2d11ec29341d7e07	2026-09-18 03:53:33.685199+00	20260918035333_add_share_token	\N	\N	2026-09-18 03:53:33.586805+00	1
2d2c61e9-cf06-4930-89b9-9ff4122fcf77	fa9314b7b8fa95cdf405d7c67cc73ee18a18f52e8d7bc329b78692410e6368dd	2026-09-23 23:09:32.03147+00	20260923230931_add_daily_checkin	\N	\N	2026-09-23 23:09:31.886502+00	1
8ca06cfc-91ba-4943-9510-af3c21d9d36f	4dee9750ce7d142fc2e020c3f886bac87dbff498240e82bfb2be6d1442db982d	2026-09-25 02:51:51.923231+00	20260925000225_add_exercise_image_templates	\N	\N	2026-09-25 02:51:51.898418+00	1
12b354c8-de89-4df4-a8f5-f36e40a61750	d7e6a0a4ef209cad6e51e3051cf09b7cddd6f00dd61390922e8bbd8a0be15bda	2026-09-26 00:11:59.81517+00	20260926001158_add_index_exercise_name	\N	\N	2026-09-26 00:11:59.058883+00	1
\.


--
-- Name: DailyCheckIn DailyCheckIn_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DailyCheckIn"
    ADD CONSTRAINT "DailyCheckIn_pkey" PRIMARY KEY (id);


--
-- Name: ExerciseImageTemplate ExerciseImageTemplate_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ExerciseImageTemplate"
    ADD CONSTRAINT "ExerciseImageTemplate_pkey" PRIMARY KEY (id);


--
-- Name: Exercise Exercise_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Exercise"
    ADD CONSTRAINT "Exercise_pkey" PRIMARY KEY (id);


--
-- Name: MuscleGroup MuscleGroup_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MuscleGroup"
    ADD CONSTRAINT "MuscleGroup_pkey" PRIMARY KEY (id);


--
-- Name: PasswordResetToken PasswordResetToken_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PasswordResetToken"
    ADD CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY (id);


--
-- Name: RoutineDay RoutineDay_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RoutineDay"
    ADD CONSTRAINT "RoutineDay_pkey" PRIMARY KEY (id);


--
-- Name: Routine Routine_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Routine"
    ADD CONSTRAINT "Routine_pkey" PRIMARY KEY (id);


--
-- Name: SetLog SetLog_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SetLog"
    ADD CONSTRAINT "SetLog_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: WorkoutLog WorkoutLog_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WorkoutLog"
    ADD CONSTRAINT "WorkoutLog_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: DailyCheckIn_userId_date_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "DailyCheckIn_userId_date_key" ON public."DailyCheckIn" USING btree ("userId", date);


--
-- Name: ExerciseImageTemplate_exerciseName_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "ExerciseImageTemplate_exerciseName_idx" ON public."ExerciseImageTemplate" USING btree ("exerciseName");


--
-- Name: Exercise_name_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Exercise_name_idx" ON public."Exercise" USING btree (name);


--
-- Name: PasswordResetToken_userId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "PasswordResetToken_userId_idx" ON public."PasswordResetToken" USING btree ("userId");


--
-- Name: RoutineDay_routineId_dayOfWeek_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "RoutineDay_routineId_dayOfWeek_key" ON public."RoutineDay" USING btree ("routineId", "dayOfWeek");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_shareToken_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_shareToken_key" ON public."User" USING btree ("shareToken");


--
-- Name: DailyCheckIn DailyCheckIn_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DailyCheckIn"
    ADD CONSTRAINT "DailyCheckIn_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Exercise Exercise_muscleGroupId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Exercise"
    ADD CONSTRAINT "Exercise_muscleGroupId_fkey" FOREIGN KEY ("muscleGroupId") REFERENCES public."MuscleGroup"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: MuscleGroup MuscleGroup_routineDayId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MuscleGroup"
    ADD CONSTRAINT "MuscleGroup_routineDayId_fkey" FOREIGN KEY ("routineDayId") REFERENCES public."RoutineDay"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PasswordResetToken PasswordResetToken_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PasswordResetToken"
    ADD CONSTRAINT "PasswordResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: RoutineDay RoutineDay_routineId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RoutineDay"
    ADD CONSTRAINT "RoutineDay_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES public."Routine"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Routine Routine_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Routine"
    ADD CONSTRAINT "Routine_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SetLog SetLog_workoutLogId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SetLog"
    ADD CONSTRAINT "SetLog_workoutLogId_fkey" FOREIGN KEY ("workoutLogId") REFERENCES public."WorkoutLog"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: WorkoutLog WorkoutLog_exerciseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WorkoutLog"
    ADD CONSTRAINT "WorkoutLog_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES public."Exercise"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict Qcsw1IMeBWGhiXxTRfuzNi9TMybJqg21j3YYqArcbUYf2hG7BAPlRdbinuqJZnM

