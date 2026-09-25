--
-- PostgreSQL database dump
--

\restrict X66vvDIuInDsJgzGqPVbSM8qQ7uWnYe9GRJiCee7aXuvVXUkMkphP7e9ArURmYe

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
cmu0cgybv001i0374m2hjm1xw	cmu0ca5uf001e0374b3jcc03g	Polea con agarre prono de pie	\N	2	15	1	2026-09-13 21:47:06.571	72	\N	\N	\N	\N
cmu0d4euk000r030klwvo45el	cmu0d4euk000p030kxaecozrs	Polea con agarre prono de pie	\N	2	15	1	2026-09-13 22:05:21.068	72	\N	\N	\N	\N
cmu0d91s0000z030ks7e7cwbf	cmu0d6n9d000t030k08l9183k	Femorales	\N	3	8	2	2026-09-13 22:08:57.408	52	\N	\N	\N	\N
cmu0d7kz9000x030k63xe9mud	cmu0d6n9d000t030k08l9183k	Extensiones	\N	3	8	1	2026-09-13 22:07:48.981	72	\N	\N	\N	\N
cmu0d6td8000v030kjfc0mdv9	cmu0d6n9d000t030k08l9183k	Prensa	\N	3	8	0	2026-09-13 22:07:13.196	72	\N	\N	\N	\N
cmu0dajuv0011030kkyzkx94m	cmu0d6n9d000t030k08l9183k	Aductores	\N	3	8	3	2026-09-13 22:10:07.495	77	\N	\N	\N	\N
cmu0dbeyq0013030kzfeqocfv	cmu0d6n9d000t030k08l9183k	Pantorillas	\N	3	8	4	2026-09-13 22:10:47.81	200	\N	\N	\N	\N
cmu0dcas20015030k3rlpx7vm	cmu0d6n9d000t030k08l9183k	Hip Trust	\N	3	8	5	2026-09-13 22:11:29.043	100	\N	\N	\N	\N
cmu0bgirt000a0374gxd5wwvs	cmu0bg0oy00080374v6sfe5q4	Press Inclinado	\N	3	8	0	2026-09-13 21:18:46.793	32	\N	\N	\N	\N
cmu0bl4bn000c0374idd94bv0	cmu0bg0oy00080374v6sfe5q4	Pecho en máquina	\N	3	8	1	2026-09-13 21:22:21.347	20	\N	\N	\N	\N
cmu0blvze000e03748nh3hgg7	cmu0bg0oy00080374v6sfe5q4	Aperturas en máquina	\N	3	8	2	2026-09-13 21:22:57.194	60	\N	\N	\N	\N
cmu0bn8f3000i0374a3k2gwqm	cmu0bmonh000g0374j1t9t1e2	Extensión en polea	\N	2	8	0	2026-09-13 21:23:59.967	23	\N	\N	\N	\N
cmu0bqt22000k0374ucqfl3gl	cmu0bmonh000g0374j1t9t1e2	Press Francés	\N	2	8	1	2026-09-13 21:26:46.682	25	\N	\N	\N	\N
cmu0bs8de000q037415ethewg	cmu0brcvw000m0374uaug4fpt	Press Militar	\N	2	8	0	2026-09-13 21:27:53.187	20	\N	\N	\N	\N
cmu0bt7x2000s0374gd2m007d	cmu0brcvw000m0374uaug4fpt	Elevaciones Laterales	\N	2	8	1	2026-09-13 21:28:39.254	23	\N	\N	\N	\N
cmu0bvhb4000w03746d05mctj	cmu0bunyn000u0374m0sc2jbs	Jalón al Pecho	\N	3	8	0	2026-09-13 21:30:24.736	64	\N	\N	\N	\N
cmu0bwn5s000y0374ukxz3q00	cmu0bunyn000u0374m0sc2jbs	Remo con agarre cerrado	\N	3	8	1	2026-09-13 21:31:18.976	69	\N	\N	\N	\N
cmu0c00t000120374i8lyo018	cmu0bunyn000u0374m0sc2jbs	Hombro posterior	\N	2	8	3	2026-09-13 21:33:56.628	50	\N	\N	\N	\N
cmu3alhs1000g03d4u4yck8bn	cmu0bunyn000u0374m0sc2jbs	Remo con agarre abierto	\N	2	8	3	2026-09-15 23:17:57.698	64	\N	\N	\N	\N
cmu0c3mpm00160374lenu7vvf	cmu0c239z00140374fdyyoz1w	Curl en máquina	\N	2	8	0	2026-09-13 21:36:44.986	35	\N	\N	\N	\N
cmu0c5a9v001a0374bwgum03h	cmu0c239z00140374fdyyoz1w	Curl Militar	\N	2	8	1	2026-09-13 21:38:02.179	20	\N	\N	\N	\N
cmu0c8xvf001c0374i3l1tc1a	cmu0c239z00140374fdyyoz1w	Curl en banco inclinado	\N	2	8	2	2026-09-13 21:40:52.731	16	\N	\N	\N	\N
cmu0cdkqj001g0374483i8oq6	cmu0ca5uf001e0374b3jcc03g	Barra z con agarre prono de pie	\N	2	8	0	2026-09-13 21:44:28.987	25	\N	\N	\N	\N
cmu0d47hc0002030k5407gymm	cmu0d47hc0001030kgegjom4k	Press Inclinado	\N	3	8	0	2026-09-13 22:05:11.521	32	\N	\N	\N	\N
cmu0d47hd0003030kbrddfksx	cmu0d47hc0001030kgegjom4k	Pecho en máquina	\N	3	8	1	2026-09-13 22:05:11.521	20	\N	\N	\N	\N
cmu0d47hd0004030k5ict6dya	cmu0d47hc0001030kgegjom4k	Aperturas en máquina	\N	3	8	2	2026-09-13 22:05:11.521	60	\N	\N	\N	\N
cmu0d47hg0007030ky65bhd7r	cmu0d47hg0006030kfq3ugy01	Extensión en polea	\N	2	8	0	2026-09-13 22:05:11.524	23	\N	\N	\N	\N
cmu0d47hg0008030ksyrtdlbs	cmu0d47hg0006030kfq3ugy01	Press Francés	\N	2	8	1	2026-09-13 22:05:11.524	25	\N	\N	\N	\N
cmu0d47hi000b030kj991y3ve	cmu0d47hi000a030k2eghu9d6	Press Militar	\N	2	8	0	2026-09-13 22:05:11.526	20	\N	\N	\N	\N
cmu0d47hi000c030kcek0mm62	cmu0d47hi000a030k2eghu9d6	Elevaciones Laterales	\N	2	8	1	2026-09-13 22:05:11.526	23	\N	\N	\N	\N
cmu0d4eue000f030k9pm2libv	cmu0d4eud000e030ksefnl1bi	Jalón al Pecho	\N	3	8	0	2026-09-13 22:05:21.062	64	\N	\N	\N	\N
cmu0d4eue000g030ksq6nu668	cmu0d4eud000e030ksefnl1bi	Remo con agarre cerrado	\N	3	8	1	2026-09-13 22:05:21.062	69	\N	\N	\N	\N
cmu0d4eue000i030k6md4e5mk	cmu0d4eud000e030ksefnl1bi	Remo con agarre abierto	\N	3	8	2	2026-09-13 22:05:21.062	64	\N	\N	\N	\N
cmu0d4eue000h030ktvj9f3ff	cmu0d4eud000e030ksefnl1bi	Hombro posterior	\N	2	8	3	2026-09-13 22:05:21.062	50	\N	\N	\N	\N
cmu0d4euh000l030kstbzwthb	cmu0d4euh000k030k1nl8pw9t	Curl en máquina	\N	2	8	0	2026-09-13 22:05:21.066	35	\N	\N	\N	\N
cmu0d4euh000m030k1cjfe8mq	cmu0d4euh000k030k1nl8pw9t	Curl Militar	\N	2	8	1	2026-09-13 22:05:21.066	20	\N	\N	\N	\N
cmu0d4euh000n030k4vz5gnc4	cmu0d4euh000k030k1nl8pw9t	Curl en banco inclinado	\N	2	8	2	2026-09-13 22:05:21.066	16	\N	\N	\N	\N
cmu0d4euk000q030ki9tzfe5u	cmu0d4euk000p030kxaecozrs	Barra z con agarre prono de pie	\N	2	8	0	2026-09-13 22:05:21.068	25	\N	\N	\N	\N
\.


--
-- Data for Name: ExerciseImageTemplate; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ExerciseImageTemplate" (id, "exerciseName", "imageUrl", license, "licenseTitle", "licenseAuthor", "licenseAuthorUrl", "sourceUrl", "createdAt") FROM stdin;
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

\unrestrict X66vvDIuInDsJgzGqPVbSM8qQ7uWnYe9GRJiCee7aXuvVXUkMkphP7e9ArURmYe

