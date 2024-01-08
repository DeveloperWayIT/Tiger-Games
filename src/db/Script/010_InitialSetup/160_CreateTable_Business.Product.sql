--DROP TABLE IF EXISTS "Business"."Product";

CREATE TABLE "Business"."Product"
(
    "ProductId" bigserial NOT NULL,
    "ProductCode" varchar(100) NOT NULL,
    "Product" varchar(1000) NOT NULL,
    "Details" varchar(8000) NULL,
	"Price" numeric(10,2) NULL,
	"Discount" numeric(10,2) NULL,
    "CurrencyId" integer NOT NULL DEFAULT 0,
    "CategoryId" integer NOT NULL DEFAULT 0,
    "ImageId" bigint NULL,
    "ManualId" bigint NULL,
    "ActiveFlg" boolean NOT NULL default false,
    CONSTRAINT pk_Product PRIMARY KEY ("ProductId"),
	CONSTRAINT Product_uq1 UNIQUE ("ProductCode"),
	CONSTRAINT Product_uq2 UNIQUE ("Product"),
	CONSTRAINT Product_CurrencyId_Currency_fk FOREIGN KEY ("CurrencyId") REFERENCES "Config"."Currency" ("CurrencyId"),
	CONSTRAINT Product_CategoryId_Category_fk FOREIGN KEY ("CategoryId") REFERENCES "Business"."Category" ("CategoryId"),
	CONSTRAINT Product_ImageId_File_fk FOREIGN KEY ("ImageId") REFERENCES "Business"."File" ("FileId"),
	CONSTRAINT Product_ManualId_File_fk FOREIGN KEY ("ManualId") REFERENCES "Business"."File" ("FileId")
);


