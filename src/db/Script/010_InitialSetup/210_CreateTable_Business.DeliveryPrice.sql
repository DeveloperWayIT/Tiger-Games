--DROP TABLE IF EXISTS "Business"."DeliveryPrice";

CREATE TABLE "Business"."DeliveryPrice"
(
    "DeliveryPriceId" serial NOT NULL,
    "DeliveryPrice" CHARACTER VARYING (1000) NOT NULL UNIQUE,
    "Price" numeric(10,2) NOT NULL DEFAULT 0,
    "CurrencyId" integer NOT NULL DEFAULT 0,
    "CategorySizeId" integer NOT NULL DEFAULT 0,
    "DeliveryTypeId" integer NOT NULL DEFAULT 0,
    "ActiveFlg" boolean NOT NULL default false,
    CONSTRAINT pk_DeliveryPrice PRIMARY KEY ("DeliveryPriceId"),
    CONSTRAINT DeliveryPrice_CurrencyId_Currency_fk FOREIGN KEY ("CurrencyId") REFERENCES "Config"."Currency" ("CurrencyId"),
    CONSTRAINT DeliveryPrice_CategorySizeId_CategorySize_fk FOREIGN KEY ("CategorySizeId") REFERENCES "Business"."CategorySize" ("CategorySizeId"),
    CONSTRAINT DeliveryPrice_DeliveryTypeId_DeliveryType_fk FOREIGN KEY ("DeliveryTypeId") REFERENCES "Business"."DeliveryType" ("DeliveryTypeId")
);


insert into "Business"."DeliveryPrice" ("DeliveryPriceId", "DeliveryPrice", "Price", "CurrencyId", "CategorySizeId", "DeliveryTypeId", "ActiveFlg") 
values (0,'Undefined',0,1,0,0,false);
