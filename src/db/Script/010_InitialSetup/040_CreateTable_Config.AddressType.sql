--DROP TABLE IF EXISTS "Config"."AddressType";

CREATE TABLE "Config"."AddressType"
(
    "AddressTypeId" serial NOT NULL,
    "AddressType" varchar(1000) NOT NULL,
    "ActiveFlg" boolean NOT NULL default false,
    CONSTRAINT pk_AddressType PRIMARY KEY ("AddressTypeId"),
	CONSTRAINT AddressType_uq UNIQUE ("AddressType")
);


