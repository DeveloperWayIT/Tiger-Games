--DROP TABLE IF EXISTS "Geography"."Province";

CREATE TABLE "Geography"."Province"
(
    "ProvinceId" serial NOT NULL,
    "Province" varchar(1000) NOT NULL,
    "NationId" integer NOT NULL DEFAULT 0,
    "ActiveFlg" boolean NOT NULL default false,
    CONSTRAINT pk_Province PRIMARY KEY ("ProvinceId"),
	CONSTRAINT Province_uq UNIQUE ("Province"),
	CONSTRAINT Province_nationid_nation_fk FOREIGN KEY ("NationId") REFERENCES "Geography"."Nation" ("NationId")
);



