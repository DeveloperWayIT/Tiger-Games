--DROP TABLE IF EXISTS "Business"."File";

CREATE TABLE "Business"."File"
(
    "FileId" bigserial NOT NULL,
    "FileName" CHARACTER VARYING (1000) NOT NULL,
    "FileType" CHARACTER VARYING (100) NOT NULL,
    "Content" bytea,
    "ActiveFlg" boolean NOT NULL default false,
    CONSTRAINT pk_File PRIMARY KEY ("FileId")
);



