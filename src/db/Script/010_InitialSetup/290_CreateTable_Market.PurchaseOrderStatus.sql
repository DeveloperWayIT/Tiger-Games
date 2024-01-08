CREATE TABLE "Market"."PurchaseOrderStatus"
(
    "PurchaseOrderStatusId" integer NOT NULL,
    "PurchaseOrderStatus" varchar(1000) NOT NULL,
    "ActiveFlg" boolean NOT NULL default false,
    CONSTRAINT pk_PurchaseOrderStatus PRIMARY KEY ("PurchaseOrderStatusId"),
	CONSTRAINT PurchaseOrderStatus_uq UNIQUE ("PurchaseOrderStatus")
);


