/**
 * Unified type exports
 * Import shared types from this single entry point.
 */

export type * from "../drizzle/schema";
export * from "./_core/errors";

// Itinerary Builder Types
export interface ItineraryFormData {
  // Tour Details
  companyName: string;
  tourTitle: string;
  destination: string;
  clientName: string;
  bookingReference: string;
  startDate: Date;
  endDate: Date;

  // Company Info
  companyLogoUrl: string | null;
  companyEmail: string;
  companyPhone: string;
  companyWebsite: string;

  // Days
  days: DayFormData[];

  // Inclusions & Exclusions
  inclusions: string[];
  exclusions: string[];

  // Emergency Contacts
  emergencyContacts: EmergencyContactFormData[];

  // Custom Sections
  customSections: CustomSectionFormData[];

  // Terms and Conditions
  termsAndConditions: TermAndConditionFormData[];

  // Custom Tour Detail Fields (appear in the meta-table)
  customFields: CustomFieldFormData[];
}

export interface CustomFieldFormData {
  label: string;
  value: string;
}

export interface DayFormData {
  id?: number;
  dayNumber: number;
  title: string;
  date: Date;
  mealsIncluded: string;
  accommodation: string;
  imageUrl?: string;
  activities: ActivityFormData[];
}

export interface ActivityFormData {
  id?: number;
  time: string;
  description: string;
}

export interface CustomSectionFormData {
  id?: number;
  title: string;
  content: string;
}

export interface EmergencyContactFormData {
  id?: number;
  contactName: string;
  phone: string;
  email: string;
  notes: string;
}

export interface TermAndConditionFormData {
  id?: number;
  policyTitle?: string;
  policyContent: string;
}
