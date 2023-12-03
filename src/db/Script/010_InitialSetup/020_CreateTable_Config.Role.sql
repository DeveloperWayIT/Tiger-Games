--DROP TABLE IF EXISTS "Config"."Role";

CREATE TABLE "Config"."Role"
(
    "RoleId" serial NOT NULL,
    "Role" CHARACTER VARYING (1000) NOT NULL UNIQUE,	
    "ActiveFlg" boolean NOT NULL default false,
    CONSTRAINT pk_role PRIMARY KEY ("RoleId")
);


insert into "Config"."Role" ("RoleId", "Role", "ActiveFlg") values (0,'Undefined',true);
insert into "Config"."Role" ("RoleId", "Role", "ActiveFlg") values (1,'Administrator',true);