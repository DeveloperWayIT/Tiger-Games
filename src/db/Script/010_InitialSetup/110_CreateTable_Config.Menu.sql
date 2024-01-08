--DROP TABLE IF EXISTS "Config"."Menu";

CREATE TABLE "Config"."Menu"
(
    "MenuId" serial NOT NULL,
    "Menu" CHARACTER VARYING (1000) NOT NULL UNIQUE,	
    "ActiveFlg" boolean NOT NULL default false,
    CONSTRAINT pk_Menu PRIMARY KEY ("MenuId")
);


insert into "Config"."Menu" ("MenuId", "Menu", "ActiveFlg") values (0,'Undefined',false);
