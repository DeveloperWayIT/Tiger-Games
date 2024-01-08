CREATE TABLE "Market"."PurchaseOrder"
(
    "PurchaseOrderId" bigserial NOT NULL,
    "UserId" integer NOT NULL DEFAULT 0,
	"PurchaseOrderDatetime" timestamp with time zone not null,
	"TotalPrice" numeric(10,2) NOT NULL DEFAULT 0,
	"TotalDiscount" numeric(10,2) NOT NULL DEFAULT 0,
	"DeliveryPrice" numeric(10,2) NOT NULL DEFAULT 0,
	"Total" numeric(10,2) NOT NULL DEFAULT 0,
	"DeliveryTypeId" integer NOT NULL DEFAULT 0,
	"PurchaseOrderStatusId" integer NOT NULL,
    "ActiveFlg" boolean NOT NULL default false,
    CONSTRAINT pk_PurchaseOrder PRIMARY KEY ("PurchaseOrderId"),
	CONSTRAINT PurchaseOrder_userid_user_fk FOREIGN KEY ("UserId") REFERENCES "Config"."User" ("UserId"),
	CONSTRAINT PurchaseOrder_PurchaseOrderStatusId_PurchaseOrderStatus_fk FOREIGN KEY ("PurchaseOrderStatusId") REFERENCES "Market"."PurchaseOrderStatus" ("PurchaseOrderStatusId"),
	CONSTRAINT PurchaseOrder_DeliveryTypeId_DeliveryType_fk FOREIGN KEY ("DeliveryTypeId") REFERENCES "Business"."DeliveryType" ("DeliveryTypeId")
);


