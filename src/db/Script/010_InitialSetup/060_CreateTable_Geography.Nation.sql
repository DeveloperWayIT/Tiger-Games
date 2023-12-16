--DROP TABLE IF EXISTS "Geography"."Nation";

CREATE TABLE "Geography"."Nation"
(
    "NationId" serial NOT NULL,
    "Nation" CHARACTER VARYING (1000) NOT NULL UNIQUE,	
    "ActiveFlg" boolean NOT NULL default false,
    CONSTRAINT pk_Nation PRIMARY KEY ("NationId")
);


insert into "Geography"."Nation" ("NationId", "Nation", "ActiveFlg") values (1,'Italy',true);
insert into "Geography"."Nation" ("NationId", "Nation", "ActiveFlg") values (2,'UK',true);