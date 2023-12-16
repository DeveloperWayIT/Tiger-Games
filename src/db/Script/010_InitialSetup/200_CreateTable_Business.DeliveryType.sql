--DROP TABLE IF EXISTS "Business"."DeliveryType";

CREATE TABLE "Business"."DeliveryType"
(
    "DeliveryTypeId" serial NOT NULL,
    "DeliveryType" CHARACTER VARYING (1000) NOT NULL UNIQUE,
    "CourierId" integer NOT NULL DEFAULT 0,
    "ActiveFlg" boolean NOT NULL default false,
    CONSTRAINT pk_DeliveryType PRIMARY KEY ("DeliveryTypeId"),
    CONSTRAINT DeliveryType_CourierId_Courier_fk FOREIGN KEY ("CourierId") REFERENCES "Business"."Courier" ("CourierId")
);


insert into "Business"."DeliveryType" ("DeliveryTypeId", "DeliveryType", "CourierId", "ActiveFlg") 
values (0,'Undefined',0,false);
