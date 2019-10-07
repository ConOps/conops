CREATE TABLE "user"
(
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR (80) UNIQUE NOT NULL,
	"password" VARCHAR (1000) NOT NULL,
	"authorization" VARCHAR (255) NOT NULL
);

CREATE TABLE "Attendee"
(
	"AttendeeID" serial NOT NULL,
	"ConventionID" integer NOT NULL,
	"LastName" varchar(255) NOT NULL,
	"FirstName" varchar(255) NOT NULL,
	"MiddleName" varchar(255) NOT NULL,
	"AddressLineOne" varchar(255) NOT NULL,
	"AddressLineTwo" varchar(255) NOT NULL,
	"City" varchar(255) NOT NULL,
	"StateProvince" varchar(255) NOT NULL,
	"PostalCode" varchar(255) NOT NULL,
	"CountryID" integer NOT NULL,
	"EmailAddress" varchar(255) NOT NULL,
	"PhoneNumber" varchar(255) NOT NULL,
	"DateOfBirth" DATE NOT NULL,
	"BadgeName" varchar(255) NOT NULL,
	"RegistrationDate" TIMESTAMP NOT NULL,
	"CheckInDate" TIMESTAMP NOT NULL,
	"PaymentDate" TIMESTAMP NOT NULL,
	"BadgeTypeID" integer NOT NULL,
	"BadgeNumber" varchar(255) NOT NULL,
	"printed" BOOLEAN NOT NULL,
	"DiscordVerified" BOOLEAN NOT NULL,
	"PreRegSortNumber" integer NOT NULL,
	"orderID" integer NOT NULL,
	CONSTRAINT "Attendee_pk" PRIMARY KEY ("AttendeeID")
)
WITH (
  OIDS=FALSE
);

CREATE TABLE "Convention"
(
	"ConventionID" serial NOT NULL,
	"OrganizationID" integer NOT NULL,
	"ConventionName" varchar(255) NOT NULL,
	"ConventionStartTime" TIMESTAMP NOT NULL,
	"ConventionEndTime" TIMESTAMP NOT NULL,
	"ConventionNews" varchar(255) NOT NULL,
	"ConventionAlerts" varchar(255) NOT NULL,
	CONSTRAINT "Convention_pk" PRIMARY KEY ("ConventionID")
)
WITH (
  OIDS=FALSE
);

CREATE TABLE "Event"
(
	"EventID" serial NOT NULL,
	"ConventionID" integer NOT NULL,
	"EventName" varchar(255) NOT NULL,
	"EventStartTime" TIMESTAMP NOT NULL,
	"LocationID" integer NOT NULL,
	"IsCancelled" BOOLEAN NOT NULL,
	"EventDescription" varchar(255) NOT NULL,
	"SponsorID" integer NOT NULL,
	"DateCreated" TIMESTAMP NOT NULL,
	"DateLastModified" TIMESTAMP NOT NULL,
	"EventModifiedNotes" varchar(255) NOT NULL,
	CONSTRAINT "Event_pk" PRIMARY KEY ("EventID")
)
WITH (
  OIDS=FALSE
);

CREATE TABLE "EventTags"
(
	"EventTagsID" serial NOT NULL,
	"Event_ID" integer NOT NULL,
	"Tag_ID" integer NOT NULL,
	CONSTRAINT "EventTags_pk" PRIMARY KEY ("EventTagsID")
)
WITH (
  OIDS=FALSE
);

CREATE TABLE "Tags"
(
	"TagID" serial NOT NULL,
	"TagName" varchar(255) NOT NULL,
	CONSTRAINT "Tags_pk" PRIMARY KEY ("TagID")
)
WITH (
  OIDS=FALSE
);

CREATE TABLE "BadgeType"
(
	"BadgeTypeID" serial NOT NULL,
	"BadgeTypeDescription" varchar(255) NOT NULL,
	"isAvailableForSelfRegistration" BOOLEAN NOT NULL,
	CONSTRAINT "BadgeType_pk" PRIMARY KEY ("BadgeTypeID")
)
WITH (
  OIDS=FALSE
);

CREATE TABLE "Location"
(
	"LocationID" serial NOT NULL,
	"LocationName" varchar(255) NOT NULL,
	"LocationDescription" varchar(255) NOT NULL,
	CONSTRAINT "Location_pk" PRIMARY KEY ("LocationID")
)
WITH (
  OIDS=FALSE
);

CREATE TABLE "ConventionSponsor"
(
	"ConventionSponsorID" integer NOT NULL,
	"Convention_ID" integer NOT NULL,
	"SponsorID" integer NOT NULL,
	CONSTRAINT "ConventionSponsor_pk" PRIMARY KEY ("ConventionSponsorID")
)
WITH (
  OIDS=FALSE
);

CREATE TABLE "Sponsor"
(
	"SponsorID" serial NOT NULL,
	"SponsorName" varchar(255) NOT NULL,
	"AmountPaid" varchar(255) NOT NULL,
	"Website" varchar(255) NOT NULL,
	"Notes" varchar(255) NOT NULL,
	CONSTRAINT "Sponsor_pk" PRIMARY KEY ("SponsorID")
)
WITH (
  OIDS=FALSE
);

CREATE TABLE "Order"
(
	"OrderID" SERIAL PRIMARY KEY NOT NULL
);

CREATE TABLE "Organization"
(
	"OrganizationID" serial NOT NULL,
	"OrganizationName" varchar(255) NOT NULL,
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