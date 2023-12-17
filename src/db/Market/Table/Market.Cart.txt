CREATE TABLE "Market"."Cart"
(
    "CartId" bigserial NOT NULL,
    "UserId" integer NOT NULL DEFAULT 0,
    "SessionId" bigint NOT NULL DEFAULT 0,
	"ProductSizeId" bigint NOT NULL DEFAULT 0,
	"Quantity" integer NOT NULL DEFAULT 0,
    "ActiveFlg" boolean NOT NULL default false,
    CONSTRAINT pk_Cart PRIMARY KEY ("CartId"),
	CONSTRAINT Cart_uq UNIQUE ("CartId","UserId"),
	CONSTRAINT Cart_userid_user_fk FOREIGN KEY ("UserId") REFERENCES "Config"."User" ("UserId"),
	CONSTRAINT Cart_SessionId_Session_fk FOREIGN KEY ("SessionId") REFERENCES "Market"."Session" ("SessionId"),
	CONSTRAINT Cart_ProductSizeId_ProductSize_fk FOREIGN KEY ("ProductSizeId") REFERENCES "Business"."ProductSize" ("ProductSizeId")
);


