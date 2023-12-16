--DROP TABLE IF EXISTS "Business"."Warehouse";

CREATE TABLE "Business"."Warehouse"
(
    "WarehouseId" bigserial NOT NULL,
    "ProductSizeId" bigint NOT NULL DEFAULT 0,
    "SiteId" integer NOT NULL DEFAULT 0,
    "Quantity" integer NOT NULL DEFAULT 0,
    "ActiveFlg" boolean NOT NULL default false,
    CONSTRAINT pk_Warehouse PRIMARY KEY ("WarehouseId"),
    CONSTRAINT Warehouse_uq UNIQUE ("ProductSizeId","SiteId"),
	CONSTRAINT Warehouse_ProductSizeId_ProductSize_fk FOREIGN KEY ("ProductSizeId") REFERENCES "Business"."ProductSize" ("ProductSizeId"),
	CONSTRAINT Warehouse_SiteId_Site_fk FOREIGN KEY ("SiteId") REFERENCES "Business"."Site" ("SiteId")
);


