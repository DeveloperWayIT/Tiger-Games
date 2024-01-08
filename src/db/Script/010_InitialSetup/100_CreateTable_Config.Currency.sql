--DROP TABLE IF EXISTS "Config"."Currency";

CREATE TABLE "Config"."Currency"
(
    "CurrencyId" serial NOT NULL,
    "Currency" CHARACTER VARYING (1000) NOT NULL UNIQUE,	
    "CurrencyCode" CHARACTER VARYING (10) NOT NULL UNIQUE,
    "ActiveFlg" boolean NOT NULL default false,
    CONSTRAINT pk_Currency PRIMARY KEY ("CurrencyId")
);


insert into "Config"."Currency" ("CurrencyId", "Currency", "CurrencyCode", "ActiveFlg") values (1,'Euro','EUR',true);
insert into "Config"."Currency" ("CurrencyId", "Currency", "CurrencyCode", "ActiveFlg") values (2,'Dollar','USD',true);