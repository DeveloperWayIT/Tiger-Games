--DROP TABLE IF EXISTS "Market"."WishlistToProductSize";

CREATE TABLE "Market"."WishlistToProductSize"
(
	"WishlistToProductSizeId" bigserial NOT NULL,
    "WishlistId" bigint NOT NULL DEFAULT 0,
    "ProductSizeId" bigint NOT NULL DEFAULT 0,
    "ActiveFlg" boolean NOT NULL default false,
    CONSTRAINT pk_WishlistToProductSize PRIMARY KEY ("WishlistToProductSizeId"),
	CONSTRAINT WishlistToProductSize_WishlistId_Wishlist_fk FOREIGN KEY ("WishlistId") REFERENCES "Market"."Wishlist" ("WishlistId"),
	CONSTRAINT WishlistToProductSize_ProductSizeId_ProductSize_fk FOREIGN KEY ("ProductSizeId") REFERENCES "Business"."ProductSize" ("ProductSizeId")
);


