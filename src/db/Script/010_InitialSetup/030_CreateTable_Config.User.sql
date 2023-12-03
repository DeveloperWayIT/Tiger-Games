--DROP TABLE IF EXISTS "Config"."User";

CREATE TABLE "Config"."User"
(
    "UserId" serial NOT NULL,
    "Email" varchar(1000) NOT NULL,
    "Surname" varchar(1000) NULL,
	"Name" varchar(1000) NULL,
    "Password" varchar(1000) NULL, -- will be cripted and used if user doesn't choose authentication by external service
    "RoleId" integer NOT NULL DEFAULT 0,
    "ActiveFlg" boolean NOT NULL default false,
    CONSTRAINT pk_user PRIMARY KEY ("UserId"),
	CONSTRAINT user_uq UNIQUE ("Email"),
	CONSTRAINT user_role_id_role_fk FOREIGN KEY ("RoleId") REFERENCES "Config"."Role" ("RoleId")
);

INSERT INTO "Config"."User"("Email", "Surname", "Name", "Password", "RoleId", "ActiveFlg")
                     VALUES('Anonymus@gmail.com', 'Crypto', 'Anonymus', NULL, 0, true);

