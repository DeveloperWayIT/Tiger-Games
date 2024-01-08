--DROP TABLE IF EXISTS "Business"."Site";

CREATE TABLE "Business"."Site"
(
    "SiteId" serial NOT NULL,
    "Site" varchar(1000) NOT NULL,
    "CityId" integer NOT NULL DEFAULT 0,
    "Lane" varchar(100) NOT NULL,
    "Rack" varchar(100) NOT NULL,
    "Drawer" varchar(100) NOT NULL,
    "ActiveFlg" boolean NOT NULL default false,
    CONSTRAINT pk_Site PRIMARY KEY ("SiteId"),
	CONSTRAINT Site_uq UNIQUE ("Site"),
	CONSTRAINT Site_cityid_city_fk FOREIGN KEY ("CityId") REFERENCES "Geography"."City" ("CityId")
);


