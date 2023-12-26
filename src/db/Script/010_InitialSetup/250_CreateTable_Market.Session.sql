--DROP TABLE IF EXISTS "Market"."Session";

CREATE TABLE "Market"."Session"
(
    "SessionId" bigserial NOT NULL,
    "UserId" integer NOT NULL DEFAULT 0,
    "StartDatetime" timestamp with time zone NOT NULL,
    "EndDatetime" timestamp with time zone NULL,
    "Token" varchar(1000) NOT NULL,
    "TokenEndDatetime" timestamp with time ZONE NOT NULL,
    "ActiveFlg" boolean NOT NULL default false,
    CONSTRAINT pk_Session PRIMARY KEY ("SessionId"),
	CONSTRAINT Session_uq UNIQUE ("SessionId","UserId"),
	CONSTRAINT Session_userid_user_fk FOREIGN KEY ("UserId") REFERENCES "Config"."User" ("UserId")
);


INSERT INTO "Market"."Session"
("SessionId", "UserId", "StartDatetime", "EndDatetime", "Token", "TokenEndDatetime", "ActiveFlg")
VALUES(nextval('"Market"."Session_SessionId_seq"'::regclass), 1, '2023-12-26 00:00:00+00', null, 'fdsakljfdsfdafdjkldsfdsfd', '2999-12-31 00:00:00+00', false);
