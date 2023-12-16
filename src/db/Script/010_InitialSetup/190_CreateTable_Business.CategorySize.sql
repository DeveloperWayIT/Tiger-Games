--DROP TABLE IF EXISTS "Business"."CategorySize";

CREATE TABLE "Business"."CategorySize"
(
    "CategorySizeId" serial NOT NULL,
    "CategorySize" CHARACTER VARYING (1000) NOT NULL UNIQUE,
    "Dimensions" CHARACTER VARYING (1000),
    "FragileFlg" boolean NOT NULL default false,
    "BatteryFlg" boolean NOT NULL default false,
    "ActiveFlg" boolean NOT NULL default false,
    CONSTRAINT pk_CategorySize PRIMARY KEY ("CategorySizeId")
);


insert into "Business"."CategorySize" ("CategorySizeId", "CategorySize", "Dimensions", "FragileFlg", "BatteryFlg", "ActiveFlg") 
values (0,'Undefined','0x0x0',false,false,false);
