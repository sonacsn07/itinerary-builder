import { eq, and, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  users,
  itineraries,
  days,
  activities,
  customSections,
  inclusions,
  exclusions,
  emergencyContacts,
  termsAndConditions,
  type Itinerary,
  type Day,
  type Activity,
  type CustomSection,
  type Inclusion,
  type Exclusion,
  type EmergencyContact,
  type TermAndCondition,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ── Itinerary queries ──────────────────────────────────────────────────────

export async function createItinerary(data: {
  userId: number;
  companyName: string;
  tourTitle: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  clientName?: string | null;
  bookingReference?: string | null;
  companyLogoUrl?: string | null;
  companyEmail?: string | null;
  companyPhone?: string | null;
  companyWebsite?: string | null;
}): Promise<Itinerary> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(itineraries).values(data);
  const id = (result as any).insertId;
  const itinerary = await db.select().from(itineraries).where(eq(itineraries.id, id)).limit(1);
  return itinerary[0]!;
}

export async function getItineraryById(id: number): Promise<Itinerary | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(itineraries).where(eq(itineraries.id, id)).limit(1);
  return result[0];
}

export async function getItinerariesByUserId(userId: number): Promise<Itinerary[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(itineraries).where(eq(itineraries.userId, userId)).orderBy(desc(itineraries.createdAt));
}

export async function updateItinerary(id: number, data: Partial<Itinerary>): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.update(itineraries).set(data).where(eq(itineraries.id, id));
}

export async function deleteItinerary(id: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.delete(itineraries).where(eq(itineraries.id, id));
}

// ── Days queries ───────────────────────────────────────────────────────────

export async function createDay(data: {
  itineraryId: number;
  dayNumber: number;
  title: string;
  date: Date;
  mealsIncluded?: string | null;
  accommodation?: string | null;
  sortOrder: number;
}): Promise<Day> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(days).values(data);
  const id = (result as any).insertId;
  const day = await db.select().from(days).where(eq(days.id, id)).limit(1);
  return day[0]!;
}

export async function getDaysByItineraryId(itineraryId: number): Promise<Day[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(days).where(eq(days.itineraryId, itineraryId)).orderBy(days.sortOrder);
}

export async function updateDay(id: number, data: Partial<Day>): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.update(days).set(data).where(eq(days.id, id));
}

export async function deleteDay(id: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.delete(days).where(eq(days.id, id));
}

// ── Activities queries ─────────────────────────────────────────────────────

export async function createActivity(data: {
  dayId: number;
  time: string;
  description: string;
  sortOrder: number;
}): Promise<Activity> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(activities).values(data);
  const id = (result as any).insertId;
  const activity = await db.select().from(activities).where(eq(activities.id, id)).limit(1);
  return activity[0]!;
}

export async function getActivitiesByDayId(dayId: number): Promise<Activity[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(activities).where(eq(activities.dayId, dayId)).orderBy(activities.sortOrder);
}

export async function updateActivity(id: number, data: Partial<Activity>): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.update(activities).set(data).where(eq(activities.id, id));
}

export async function deleteActivity(id: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.delete(activities).where(eq(activities.id, id));
}

// ── Custom Sections queries ────────────────────────────────────────────────

export async function createCustomSection(data: {
  itineraryId: number;
  title: string;
  content: string;
  sortOrder: number;
}): Promise<CustomSection> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(customSections).values(data);
  const id = (result as any).insertId;
  const section = await db.select().from(customSections).where(eq(customSections.id, id)).limit(1);
  return section[0]!;
}

export async function getCustomSectionsByItineraryId(itineraryId: number): Promise<CustomSection[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(customSections).where(eq(customSections.itineraryId, itineraryId)).orderBy(customSections.sortOrder);
}

export async function updateCustomSection(id: number, data: Partial<CustomSection>): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.update(customSections).set(data).where(eq(customSections.id, id));
}

export async function deleteCustomSection(id: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.delete(customSections).where(eq(customSections.id, id));
}

// ── Inclusions queries ─────────────────────────────────────────────────────

export async function createInclusion(data: {
  itineraryId: number;
  text: string;
  sortOrder: number;
}): Promise<Inclusion> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(inclusions).values(data);
  const id = (result as any).insertId;
  const inclusion = await db.select().from(inclusions).where(eq(inclusions.id, id)).limit(1);
  return inclusion[0]!;
}

export async function getInclusionsByItineraryId(itineraryId: number): Promise<Inclusion[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(inclusions).where(eq(inclusions.itineraryId, itineraryId)).orderBy(inclusions.sortOrder);
}

export async function updateInclusion(id: number, data: Partial<Inclusion>): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.update(inclusions).set(data).where(eq(inclusions.id, id));
}

export async function deleteInclusion(id: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.delete(inclusions).where(eq(inclusions.id, id));
}

// ── Exclusions queries ─────────────────────────────────────────────────────

export async function createExclusion(data: {
  itineraryId: number;
  text: string;
  sortOrder: number;
}): Promise<Exclusion> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(exclusions).values(data);
  const id = (result as any).insertId;
  const exclusion = await db.select().from(exclusions).where(eq(exclusions.id, id)).limit(1);
  return exclusion[0]!;
}

export async function getExclusionsByItineraryId(itineraryId: number): Promise<Exclusion[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(exclusions).where(eq(exclusions.itineraryId, itineraryId)).orderBy(exclusions.sortOrder);
}

export async function updateExclusion(id: number, data: Partial<Exclusion>): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.update(exclusions).set(data).where(eq(exclusions.id, id));
}

export async function deleteExclusion(id: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.delete(exclusions).where(eq(exclusions.id, id));
}

// ── Emergency Contacts queries ────────────────────────────────────────────

export async function createEmergencyContact(data: {
  itineraryId: number;
  contactName: string;
  phone: string;
  email?: string | null;
  notes?: string | null;
  sortOrder: number;
}): Promise<EmergencyContact> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(emergencyContacts).values(data);
  const id = (result as any).insertId;
  const contact = await db.select().from(emergencyContacts).where(eq(emergencyContacts.id, id)).limit(1);
  return contact[0]!;
}

export async function getEmergencyContactsByItineraryId(itineraryId: number): Promise<EmergencyContact[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(emergencyContacts).where(eq(emergencyContacts.itineraryId, itineraryId)).orderBy(emergencyContacts.sortOrder);
}

export async function updateEmergencyContact(id: number, data: Partial<EmergencyContact>): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.update(emergencyContacts).set(data).where(eq(emergencyContacts.id, id));
}

export async function deleteEmergencyContact(id: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.delete(emergencyContacts).where(eq(emergencyContacts.id, id));
}

// ── Terms and Conditions queries ───────────────────────────────────────────

export async function createTermAndCondition(data: {
  itineraryId: number;
  policyTitle: string;
  policyContent: string;
  sortOrder: number;
}): Promise<TermAndCondition> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(termsAndConditions).values(data);
  const id = (result as any).insertId;
  const term = await db.select().from(termsAndConditions).where(eq(termsAndConditions.id, id)).limit(1);
  return term[0]!;
}

export async function getTermsAndConditionsByItineraryId(itineraryId: number): Promise<TermAndCondition[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(termsAndConditions).where(eq(termsAndConditions.itineraryId, itineraryId)).orderBy(termsAndConditions.sortOrder);
}

export async function updateTermAndCondition(id: number, data: Partial<TermAndCondition>): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.update(termsAndConditions).set(data).where(eq(termsAndConditions.id, id));
}

export async function deleteTermAndCondition(id: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.delete(termsAndConditions).where(eq(termsAndConditions.id, id));
}
