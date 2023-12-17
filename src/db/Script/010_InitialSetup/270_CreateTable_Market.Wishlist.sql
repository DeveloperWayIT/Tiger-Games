CREATE TABLE "Market"."Wishlist"
(
    "WishlistId" bigserial NOT NULL,
    "Wishlist" varchar(1000) NOT NULL,
    "UserId" integer NOT NULL DEFAULT 0,
    "ActiveFlg" boolean NOT NULL default false,
    CONSTRAINT pk_Wishlist PRIMARY KEY ("WishlistId"),
	CONSTRAINT Wishlist_uq UNIQUE ("Wishlist"),
	CONSTRAINT Wishlist_userid_user_fk FOREIGN KEY ("UserId") REFERENCES "Config"."User" ("UserId")
);


