CREATE TABLE `activities` (
	`id` int AUTO_INCREMENT NOT NULL,
	`dayId` int NOT NULL,
	`time` varchar(20) NOT NULL,
	`description` text NOT NULL,
	`sortOrder` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `activities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `customSections` (
	`id` int AUTO_INCREMENT NOT NULL,
	`itineraryId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`sortOrder` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `customSections_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `days` (
	`id` int AUTO_INCREMENT NOT NULL,
	`itineraryId` int NOT NULL,
	`dayNumber` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`date` timestamp NOT NULL,
	`mealsIncluded` varchar(100),
	`accommodation` varchar(255),
	`sortOrder` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `days_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `emergencyContacts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`itineraryId` int NOT NULL,
	`contactName` varchar(255) NOT NULL,
	`phone` varchar(20) NOT NULL,
	`email` varchar(320),
	`notes` text,
	`sortOrder` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `emergencyContacts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `exclusions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`itineraryId` int NOT NULL,
	`text` text NOT NULL,
	`sortOrder` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `exclusions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `inclusions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`itineraryId` int NOT NULL,
	`text` text NOT NULL,
	`sortOrder` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `inclusions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `itineraries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`companyName` varchar(255) NOT NULL,
	`tourTitle` varchar(255) NOT NULL,
	`destination` varchar(255) NOT NULL,
	`clientName` varchar(255),
	`bookingReference` varchar(255),
	`startDate` timestamp NOT NULL,
	`endDate` timestamp NOT NULL,
	`companyLogoUrl` text,
	`companyEmail` varchar(320),
	`companyPhone` varchar(20),
	`companyWebsite` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `itineraries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `termsAndConditions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`itineraryId` int NOT NULL,
	`policyTitle` varchar(255) NOT NULL,
	`policyContent` text NOT NULL,
	`sortOrder` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `termsAndConditions_id` PRIMARY KEY(`id`)
);
