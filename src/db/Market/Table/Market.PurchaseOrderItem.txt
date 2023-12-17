CREATE TABLE "Market"."PurchaseOrderItem"
(
    "PurchaseOrderItemId" bigserial NOT NULL,
    "PurchaseOrderId" bigint NOT NULL,
    "ProductSizeId" bigint NOT NULL,
	"Quantity" integer NOT NULL DEFAULT 0,
	"ProductPrice" numeric(10,2) NOT NULL DEFAULT 0,
	"Discount" numeric(10,2) NOT NULL DEFAULT 0,
	"ItemPrice" numeric(10,2) NOT NULL DEFAULT 0,
    "ActiveFlg" boolean NOT NULL default false,
    CONSTRAINT pk_PurchaseOrderItem PRIMARY KEY ("PurchaseOrderItemId"),
	CONSTRAINT PurchaseOrderItem_PurchaseOrderId_PurchaseOrder_fk FOREIGN KEY ("PurchaseOrderId") REFERENCES "Market"."PurchaseOrder" ("PurchaseOrderId"),
	CONSTRAINT PurchaseOrderItem_ProductSizeId_ProductSize_fk FOREIGN KEY ("ProductSizeId") REFERENCES "Business"."ProductSize" ("ProductSizeId")
);


