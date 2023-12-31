--DROP TABLE IF EXISTS "Business"."ProductSize";

CREATE TABLE "Business"."ProductSize"
(
    "ProductSizeId" bigserial NOT NULL,
    "ProductId" bigint NOT NULL DEFAULT 0,
    "ProductSize" varchar(1000) NOT NULL,
	"Price" numeric(10,2) NULL,
	"Discount" numeric(10,2) NULL,
    "Length" numeric(10,2) NULL,
	"Width" numeric(10,2) NULL,
	"Depth" numeric(10,2) NULL,
	"Weight" numeric(10,2) NULL,
	"Volume" numeric(10,2) NULL,
	"FragileFlg" boolean NOT NULL default false,
	"BatteryFlg" boolean NOT NULL default false,
    "CategorySizeId" integer NOT NULL DEFAULT 0,
    "ActiveFlg" boolean NOT NULL default false,
    CONSTRAINT pk_ProductSize PRIMARY KEY ("ProductSizeId"),
	CONSTRAINT ProductSize_uq UNIQUE ("ProductSize"),
	CONSTRAINT ProductSize_ProductId_Product_fk FOREIGN KEY ("ProductId") REFERENCES "Business"."Product" ("ProductId"),
	CONSTRAINT ProductSize_CategorySizeId_CategorySize_fk FOREIGN KEY ("CategorySizeId") REFERENCES "Business"."CategorySize" ("CategorySizeId")
);


