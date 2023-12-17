--DROP TABLE IF EXISTS "Business"."Category";

CREATE TABLE "Business"."Category"
(
    "CategoryId" serial NOT NULL,
    "Category" CHARACTER VARYING (1000) NOT NULL UNIQUE,	
    "ActiveFlg" boolean NOT NULL default false,
    CONSTRAINT pk_Category PRIMARY KEY ("CategoryId")
);


insert into "Business"."Category" ("CategoryId", "Category", "ActiveFlg") values (0,'Undefined',true);
