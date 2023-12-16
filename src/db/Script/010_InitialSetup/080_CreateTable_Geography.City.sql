--DROP TABLE IF EXISTS "Geography"."City";

CREATE TABLE "Geography"."City"
(
    "CityId" serial NOT NULL,
    "City" varchar(1000) NOT NULL,
    "ProvinceId" integer NOT NULL DEFAULT 0,
    "ActiveFlg" boolean NOT NULL default false,
    CONSTRAINT pk_City PRIMARY KEY ("CityId"),
	CONSTRAINT City_uq UNIQUE ("City"),
	CONSTRAINT City_ProvinceId_Province_fk FOREIGN KEY ("ProvinceId") REFERENCES "Geography"."Province" ("ProvinceId")
);



