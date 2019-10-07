--DATABASE is named ConOps--

  CREATE TABLE "user"
(
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "authorization" VARCHAR (255)
);

CREATE TABLE "Attendee"
(
    "AttendeeID" serial NOT NULL,
    "ConventionID" integer NOT NULL,
    "LastName" varchar(255) NOT NULL,
    "FirstName" varchar(255) NOT NULL,
    "MiddleName" varchar(255) NOT NULL,
    "AddressLineOne" varchar(255),
    "AddressLineTwo" varchar(255),
    "City" varchar(255) NOT NULL,
    "StateProvince" varchar(255) NOT NULL,
    "PostalCode" varchar(255) NOT NULL,
    "CountryID" varchar(255) NOT NULL,
    "EmailAddress" varchar(255) NOT NULL,
    "PhoneNumber" varchar(255) NOT NULL,
    "DateOfBirth" DATE NOT NULL,
    "BadgeName" varchar(255) NOT NULL,
    "RegistrationDate" TIMESTAMP NOT NULL,
    "CheckInDate" TIMESTAMP,
    "PaymentDate" TIMESTAMP,
    "BadgeTypeID" integer NOT NULL,
    "BadgeNumber" varchar(255) NOT NULL,
    "printed" BOOLEAN NOT NULL,
    "DiscordVerified" BOOLEAN NOT NULL,
    "PreRegSortNumber" integer,
    "orderID" integer,
    CONSTRAINT "Attendee_pk" PRIMARY KEY ("AttendeeID")
)
WITH (
  OIDS=FALSE
);

CREATE TABLE "Convention"
(
    "ConventionID" serial NOT NULL,
    "OrganizationID" integer,
    "ConventionName" varchar(255) NOT NULL,
    "ConventionStartTime" TIMESTAMP NOT NULL,
    "ConventionEndTime" TIMESTAMP NOT NULL,
    "ConventionNews" varchar(255),
    CONSTRAINT "Convention_pk" PRIMARY KEY ("ConventionID")
)
WITH (
  OIDS=FALSE
);

CREATE TABLE "Event"
(
    "EventID" serial NOT NULL,
    "ConventionID" integer NOT NULL,
    "EventName" varchar(255) NOT NULL,
    "EventStartTime" TIMESTAMP NOT NULL,
    "LocationID" integer NOT NULL,
    "IsCancelled" BOOLEAN NOT NULL,
    "EventDescription" varchar(255) NOT NULL,
    "SponsorID" integer,
    "DateCreated" TIMESTAMP NOT NULL,
    "DateLastModified" TIMESTAMP,
    "EventModifiedNotes" varchar(255) NOT NULL,
    CONSTRAINT "Event_pk" PRIMARY KEY ("EventID")
)
WITH (
  OIDS=FALSE
);

CREATE TABLE "EventTags"
(
    "EventTagsID" serial NOT NULL,
    "Event_ID" integer NOT NULL,
    "Tag_ID" integer NOT NULL,
    CONSTRAINT "EventTags_pk" PRIMARY KEY ("EventTagsID")
)
WITH (
  OIDS=FALSE
);

CREATE TABLE "Tags"
(
    "TagID" serial NOT NULL,
    "TagName" varchar(255) NOT NULL,
    CONSTRAINT "Tags_pk" PRIMARY KEY ("TagID")
)
WITH (
  OIDS=FALSE
);

CREATE TABLE "BadgeType"
(
    "BadgeTypeID" serial NOT NULL,
    "BadgeTypeDescription" varchar(255) NOT NULL,
    "isAvailableForSelfRegistration" BOOLEAN NOT NULL,
    CONSTRAINT "BadgeType_pk" PRIMARY KEY ("BadgeTypeID")
)
WITH (
  OIDS=FALSE
);

CREATE TABLE "Location"
(
    "LocationID" serial NOT NULL,
    "LocationName" varchar(255) NOT NULL,
    "LocationDescription" varchar(255) NOT NULL,
    CONSTRAINT "Location_pk" PRIMARY KEY ("LocationID")
)
WITH (
  OIDS=FALSE
);

CREATE TABLE "ConventionSponsor"
(
    "ConventionSponsorID" integer NOT NULL,
    "Convention_ID" integer NOT NULL,
    "SponsorID" integer NOT NULL,
    CONSTRAINT "ConventionSponsor_pk" PRIMARY KEY ("ConventionSponsorID")
)
WITH (
  OIDS=FALSE
);

CREATE TABLE "Sponsor"
(
    "SponsorID" serial NOT NULL,
    "SponsorName" varchar(255) NOT NULL,
    "AmountPaid" varchar(255) NOT NULL,
    "Website" varchar(255) NOT NULL,
    "Notes" varchar(255),
    CONSTRAINT "Sponsor_pk" PRIMARY KEY ("SponsorID")
)
WITH (
  OIDS=FALSE
);

CREATE TABLE "Order"
(
    "OrderID" SERIAL PRIMARY KEY NOT NULL
);

CREATE TABLE "Organization"
(
    "OrganizationID" serial NOT NULL,
    "OrganizationName" varchar(255) NOT NULL,
    CONSTRAINT "Organization_pk" PRIMARY KEY ("OrganizationID")
)
WITH (
  OIDS=FALSE
);



ALTER TABLE "Attendee" ADD CONSTRAINT "Attendee_fk0" FOREIGN KEY ("ConventionID") REFERENCES "Convention"("ConventionID");
ALTER TABLE "Attendee" ADD CONSTRAINT "Attendee_fk1" FOREIGN KEY ("BadgeTypeID") REFERENCES "BadgeType"("BadgeTypeID");




ALTER TABLE "Attendee" ADD CONSTRAINT "Attendee_fk2" FOREIGN KEY ("orderID") REFERENCES "Order"("OrderID");

ALTER TABLE "Convention" ADD CONSTRAINT "Convention_fk0" FOREIGN KEY ("OrganizationID") REFERENCES "Organization"("OrganizationID");

ALTER TABLE "Event" ADD CONSTRAINT "Event_fk0" FOREIGN KEY ("ConventionID") REFERENCES "Convention"("ConventionID");
ALTER TABLE "Event" ADD CONSTRAINT "Event_fk1" FOREIGN KEY ("LocationID") REFERENCES "Location"("LocationID");
ALTER TABLE "Event" ADD CONSTRAINT "Event_fk2" FOREIGN KEY ("SponsorID") REFERENCES "Sponsor"("SponsorID");

ALTER TABLE "EventTags" ADD CONSTRAINT "EventTags_fk0" FOREIGN KEY ("Event_ID") REFERENCES "Event"("EventID");
ALTER TABLE "EventTags" ADD CONSTRAINT "EventTags_fk1" FOREIGN KEY ("Tag_ID") REFERENCES "Tags"("TagID");




ALTER TABLE "ConventionSponsor" ADD CONSTRAINT "ConventionSponsor_fk0" FOREIGN KEY ("Convention_ID") REFERENCES "Convention"("ConventionID");
ALTER TABLE "ConventionSponsor" ADD CONSTRAINT "ConventionSponsor_fk1" FOREIGN KEY ("SponsorID") REFERENCES "Sponsor"("SponsorID");

INSERT INTO "Convention" ("ConventionName", "ConventionStartTime", "ConventionEndTime", "ConventionNews")
VALUES ('2dCon.20 the 2D-Reconening','8/20/2018','08/25/2018','Pizza Party in the lobby nerds.  Come get some'), ('2dCon 2019: The weird gets weirder','8/20/2019','8/25/2019','Probably going to have to update these at some point!'), ('2dCon 2020: Remaster' ,'8/20/2020','8/25/2020','THE FUTURE WAS NOW');

INSERT INTO "BadgeType" ("BadgeTypeDescription", "isAvailableForSelfRegistration")
VALUES ('21 plus',true),('under 21',true),('VIP',false);


INSERT INTO "Order"("OrderID")
VALUES (1),(2),(3),(4);

--Walkin Attendee who has checked in--

INSERT INTO "Attendee" ("ConventionID", "LastName", "FirstName", "MiddleName", "AddressLineOne", "AddressLineTwo", "City", "StateProvince", "PostalCode", "CountryID", "EmailAddress", "PhoneNumber", "DateOfBirth", "BadgeName", "RegistrationDate", "CheckInDate", "PaymentDate", "BadgeTypeID", "BadgeNumber", "printed", "DiscordVerified", "PreRegSortNumber", "orderID")
VALUES (1,'OBannon','Chris','Ryan','123 fakestreet','apartment 2','Savage','MN','55378','United States','crobwan@gmail.com','612-750-6236','04/21/1990','pantspoopers','08/23/2018','08/23/2018','08/23/2018',2,'2020',false,false,'2',null), (3,'Decalan','Berniedividisde','patrick','789 dummdatalane','here','townmane','Quebec','55676','Canada eh','declanB@gmail.com','555-555-5555','04/19/1999','mapleleaf','08/22/2020','08/22/2020','08/22/2020',2,'2025',true,true,4,null);

--Walkinin Attendee who has not checked in--
INSERT INTO "Attendee" ("ConventionID", "LastName", "FirstName", "MiddleName", "AddressLineOne", "AddressLineTwo", "City", "StateProvince", "PostalCode", "CountryID", "EmailAddress", "PhoneNumber", "DateOfBirth", "BadgeName", "RegistrationDate", "BadgeTypeID", "BadgeNumber", "printed", "DiscordVerified", "PreRegSortNumber", "orderID")
VALUES (3,'Marit','Zelinsky','??','123 fakestreet','apartment 2','Tonka','MN','55345','United States','Zlinksy@gmail.com','612-555-5555','06/21/1992','hockey is cool','08/23/2020',1,'2026',false,false,'5',null)

--pregistered attendees who have not yet checked in--


INSERT INTO "Attendee" ("ConventionID", "LastName", "FirstName", "MiddleName", "AddressLineOne", "AddressLineTwo", "City", "StateProvince", "PostalCode", "CountryID", "EmailAddress", "PhoneNumber", "DateOfBirth", "BadgeName", "RegistrationDate", "PaymentDate", "BadgeTypeID", "BadgeNumber", "printed", "DiscordVerified", "PreRegSortNumber", "orderID")
VALUES (3,'OBannnon','Chris','Ryan','123 fakestreet','apartment 2','Savage','MN','55378','United States','crobwan@gmail.com','612-750-6236','04/21/1990','pottytrained', '08/22/2019','08/22/2019',1,'2021',true,true,'3','1'),(3,'Smith','Alex', 'Smitty','456 notreal lane','apartment 2','Minnetonka','MN','55345','UNITED STATES','rodrigo321$gmail.com','555-555-555','10/13/1991','pottytrained','08/22/2019','08/22/2019',1,'2022',true,true,'3','1'),(3,'Dustin','Feilde','guy','4545 notrealave','basmenet','Saint Paul','MN','55401','United STates','dustinisgreat@gamil.com','555-555-55555','11/22/1986','verysmart','06/19/2020','06/19/2020',1,'2023',true,true,'3','2');   

--preregisterd attendees who have checked in--
INSERT INTO "Attendee" ("ConventionID", "LastName", "FirstName", "MiddleName", "AddressLineOne", "AddressLineTwo", "City", "StateProvince", "PostalCode", "CountryID", "EmailAddress", "PhoneNumber", "DateOfBirth", "BadgeName", "RegistrationDate", "CheckInDate", "PaymentDate", "BadgeTypeID", "BadgeNumber", "printed", "DiscordVerified", "PreRegSortNumber", "orderID")
VALUES (3,'Dubois','Andrew','Jamal','123 fakestreet','apartment 2','Savage','MN','55378','United States','doobers@gmail.com','612-555-5555','09/30/1989','dorkstuff','04/23/2020','08/23/2020','04/23/2020',1,'2026',true,false,'7','1'), (3,'Dane','Smith','Donald','2020 pretendplace','apt 3','NorthEast','MN','55403','United States','DainBSmith@gmail.com','555-555-5555','05/05/1984','primestuff','06/01/2020','08/20/202','06/01/2020',1,'2028',true,true,'8','3');
