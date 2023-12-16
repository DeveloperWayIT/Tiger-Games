--DROP TABLE IF EXISTS "Business"."Courier";

CREATE TABLE "Business"."Courier"
(
    "CourierId" serial NOT NULL,
    "Courier" CHARACTER VARYING (1000) NOT NULL UNIQUE,	
    "ActiveFlg" boolean NOT NULL default false,
    CONSTRAINT pk_Courier PRIMARY KEY ("CourierId")
);


insert into "Business"."Courier" ("CourierId", "Courier", "ActiveFlg") values (0,'Undefined',true);
