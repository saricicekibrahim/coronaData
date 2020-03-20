create extension postgis;

CREATE TABLE public.confirmed (
	id serial NOT NULL,
	province varchar NULL,
	region varchar NULL,
	"day" timestamp NULL,
	geom geometry NULL,
	value integer NULL,
	CONSTRAINT confirmed_pk PRIMARY KEY (id)
);