import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return { ctx };
}

describe("itinerary.generatePDF tRPC Procedure", () => {
  const mockItineraryData = {
    companyName: "Wanderlust Travels",
    tourTitle: "European Grand Tour",
    destination: "Europe",
    clientName: "John Doe",
    bookingReference: "WL-2024-001",
    companyEmail: "info@wanderlust.com",
    companyPhone: "+1-800-TRAVEL",
    companyWebsite: "www.wanderlust.com",
    startDate: "2024-06-01",
    endDate: "2024-06-15",
    days: [
      {
        dayNumber: 1,
        title: "Arrival in Paris",
        date: "2024-06-01",
        mealsIncluded: "Dinner",
        activities: [{ time: "14:00", description: "Arrival at airport" }],
        accommodation: "Hotel Le Marais",
      },
    ],
    inclusions: ["Accommodation", "Breakfast"],
    exclusions: ["Flights"],
    emergencyContacts: [{ contactName: "Guide", phone: "+33-123", email: "guide@example.com" }],
    customSections: [],
    termsAndConditions: [],
  };

  it("should successfully generate PDF for authenticated user", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.itinerary.generatePDF(mockItineraryData);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.html).toBeDefined();
    expect(typeof result.html).toBe("string");
  });

  it("should return HTML containing company information", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.itinerary.generatePDF(mockItineraryData);

    expect(result.html).toContain(mockItineraryData.companyName);
    expect(result.html).toContain(mockItineraryData.tourTitle);
  });

  it("should return HTML containing itinerary details", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.itinerary.generatePDF(mockItineraryData);

    expect(result.html).toContain(mockItineraryData.destination);
    expect(result.html).toContain(mockItineraryData.clientName);
    expect(result.html).toContain(mockItineraryData.bookingReference);
  });

  it("should return HTML containing day information", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.itinerary.generatePDF(mockItineraryData);

    expect(result.html).toContain(mockItineraryData.days[0].title);
    expect(result.html).toContain(mockItineraryData.days[0].activities[0].description);
  });

  it("should return HTML containing inclusions and exclusions", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.itinerary.generatePDF(mockItineraryData);

    expect(result.html).toContain(mockItineraryData.inclusions[0]);
    expect(result.html).toContain(mockItineraryData.exclusions[0]);
  });

  it("should return HTML containing emergency contacts", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.itinerary.generatePDF(mockItineraryData);

    expect(result.html).toContain(mockItineraryData.emergencyContacts[0].contactName);
    expect(result.html).toContain(mockItineraryData.emergencyContacts[0].phone);
  });

  it("should return valid HTML structure", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.itinerary.generatePDF(mockItineraryData);

    expect(result.html).toContain("<!DOCTYPE html>");
    expect(result.html).toContain("<html>");
    expect(result.html).toContain("</html>");
    expect(result.html).toContain("<body>");
    expect(result.html).toContain("</body>");
  });

  it("should handle complex itinerary with multiple days", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const complexData = {
      ...mockItineraryData,
      days: [
        {
          dayNumber: 1,
          title: "Day 1",
          date: "2024-06-01",
          mealsIncluded: "Breakfast, Lunch, Dinner",
          activities: [
            { time: "09:00", description: "Activity 1" },
            { time: "14:00", description: "Activity 2" },
          ],
          accommodation: "Hotel A",
        },
        {
          dayNumber: 2,
          title: "Day 2",
          date: "2024-06-02",
          mealsIncluded: "Breakfast, Lunch",
          activities: [{ time: "10:00", description: "Activity 3" }],
          accommodation: "Hotel B",
        },
      ],
    };

    const result = await caller.itinerary.generatePDF(complexData);

    expect(result.success).toBe(true);
    expect(result.html).toContain("Day 1");
    expect(result.html).toContain("Day 2");
    expect(result.html).toContain("Activity 1");
    expect(result.html).toContain("Activity 2");
    expect(result.html).toContain("Activity 3");
  });

  it("should handle special characters in content", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const dataWithSpecialChars = {
      ...mockItineraryData,
      companyName: "Travel & Adventure <Co.>",
      tourTitle: 'Paris "City of Light" Tour',
      destination: "France & Switzerland",
    };

    const result = await caller.itinerary.generatePDF(dataWithSpecialChars);

    expect(result.success).toBe(true);
    expect(result.html).toBeDefined();
    expect(result.html.length).toBeGreaterThan(0);
  });
});
