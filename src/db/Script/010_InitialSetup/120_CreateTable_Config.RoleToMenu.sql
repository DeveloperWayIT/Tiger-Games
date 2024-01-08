--DROP TABLE IF EXISTS "Config"."RoleToMenu";

CREATE TABLE "Config"."RoleToMenu"
(
	"RoleToMenuId" serial NOT NULL,
    "RoleId" integer NOT NULL DEFAULT 0,
    "MenuId" integer NOT NULL DEFAULT 0,
    "ReadFlg" boolean NOT NULL default false,
    "UpdateFlg" boolean NOT NULL default false,
    "DeleteFlg" boolean NOT NULL default false,
    "ActiveFlg" boolean NOT NULL default false,
    CONSTRAINT pk_RoleToMenu PRIMARY KEY ("RoleToMenuId"),
	CONSTRAINT RoleToMenu_RoleId_Role_fk FOREIGN KEY ("RoleId") REFERENCES "Config"."Role" ("RoleId"),
	CONSTRAINT RoleToMenu_MenuId_Menu_fk FOREIGN KEY ("MenuId") REFERENCES "Config"."Menu" ("MenuId")
);


