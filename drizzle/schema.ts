import { int, json, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Itinerary table - stores the main itinerary document
 */
export const itineraries = mysqlTable("itineraries", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  
  // Tour Details
  companyName: varchar("companyName", { length: 255 }).notNull(),
  tourTitle: varchar("tourTitle", { length: 255 }).notNull(),
  destination: varchar("destination", { length: 255 }).notNull(),
  clientName: varchar("clientName", { length: 255 }),
  bookingReference: varchar("bookingReference", { length: 255 }),
  
  // Dates
  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate").notNull(),
  
  // Company Info
  companyLogoUrl: text("companyLogoUrl"),
  companyEmail: varchar("companyEmail", { length: 320 }),
  companyPhone: varchar("companyPhone", { length: 20 }),
  companyWebsite: varchar("companyWebsite", { length: 255 }),
  
  // Metadata
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Itinerary = typeof itineraries.$inferSelect;
export type InsertItinerary = typeof itineraries.$inferInsert;

/**
 * Days table - stores individual days in an itinerary
 */
export const days = mysqlTable("days", {
  id: int("id").autoincrement().primaryKey(),
  itineraryId: int("itineraryId").notNull(),
  dayNumber: int("dayNumber").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  date: timestamp("date").notNull(),
  mealsIncluded: varchar("mealsIncluded", { length: 100 }),
  accommodation: varchar("accommodation", { length: 255 }),
  sortOrder: int("sortOrder").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Day = typeof days.$inferSelect;
export type InsertDay = typeof days.$inferInsert;

/**
 * Activities table - stores time-stamped activities for each day
 */
export const activities = mysqlTable("activities", {
  id: int("id").autoincrement().primaryKey(),
  dayId: int("dayId").notNull(),
  time: varchar("time", { length: 20 }).notNull(),
  description: text("description").notNull(),
  sortOrder: int("sortOrder").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Activity = typeof activities.$inferSelect;
export type InsertActivity = typeof activities.$inferInsert;

/**
 * Custom Sections table - stores user-defined sections with free-form content
 */
export const customSections = mysqlTable("customSections", {
  id: int("id").autoincrement().primaryKey(),
  itineraryId: int("itineraryId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  sortOrder: int("sortOrder").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CustomSection = typeof customSections.$inferSelect;
export type InsertCustomSection = typeof customSections.$inferInsert;

/**
 * Inclusions table - stores what is included in the tour (bullet points)
 */
export const inclusions = mysqlTable("inclusions", {
  id: int("id").autoincrement().primaryKey(),
  itineraryId: int("itineraryId").notNull(),
  text: text("text").notNull(),
  sortOrder: int("sortOrder").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Inclusion = typeof inclusions.$inferSelect;
export type InsertInclusion = typeof inclusions.$inferInsert;

/**
 * Exclusions table - stores what is not included in the tour (bullet points)
 */
export const exclusions = mysqlTable("exclusions", {
  id: int("id").autoincrement().primaryKey(),
  itineraryId: int("itineraryId").notNull(),
  text: text("text").notNull(),
  sortOrder: int("sortOrder").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Exclusion = typeof exclusions.$inferSelect;
export type InsertExclusion = typeof exclusions.$inferInsert;

/**
 * Emergency Contacts table - stores contact information
 */
export const emergencyContacts = mysqlTable("emergencyContacts", {
  id: int("id").autoincrement().primaryKey(),
  itineraryId: int("itineraryId").notNull(),
  contactName: varchar("contactName", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  email: varchar("email", { length: 320 }),
  notes: text("notes"),
  sortOrder: int("sortOrder").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type EmergencyContact = typeof emergencyContacts.$inferSelect;
export type InsertEmergencyContact = typeof emergencyContacts.$inferInsert;

/**
 * Terms and Conditions table - stores individual policy entries
 */
export const termsAndConditions = mysqlTable("termsAndConditions", {
  id: int("id").autoincrement().primaryKey(),
  itineraryId: int("itineraryId").notNull(),
  policyTitle: varchar("policyTitle", { length: 255 }).notNull(),
  policyContent: text("policyContent").notNull(),
  sortOrder: int("sortOrder").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type TermAndCondition = typeof termsAndConditions.$inferSelect;
export type InsertTermAndCondition = typeof termsAndConditions.$inferInsert;
