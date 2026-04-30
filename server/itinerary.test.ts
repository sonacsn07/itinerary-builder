import { describe, expect, it } from "vitest";
import { generateItineraryPDF } from "./pdf-generator";
import { ItineraryFormData } from "../shared/types";

describe("Itinerary PDF Generation", () => {
  const mockItineraryData: ItineraryFormData = {
    companyName: "Wanderlust Travels",
    tourTitle: "European Grand Tour",
    destination: "Europe",
    clientName: "John Doe",
    bookingReference: "WL-2024-001",
    companyEmail: "info@wanderlust.com",
    companyPhone: "+1-800-TRAVEL",
    companyWebsite: "www.wanderlust.com",
    startDate: new Date("2024-06-01"),
    endDate: new Date("2024-06-15"),
    days: [
      {
        dayNumber: 1,
        title: "Arrival in Paris",
        date: new Date("2024-06-01"),
        mealsIncluded: "Dinner",
        activities: [
          { time: "14:00", description: "Arrival at Charles de Gaulle Airport" },
          { time: "18:00", description: "Check-in at hotel" },
        ],
        accommodation: "Hotel Le Marais, Paris",
      },
      {
        dayNumber: 2,
        title: "Paris City Tour",
        date: new Date("2024-06-02"),
        mealsIncluded: "Breakfast, Lunch, Dinner",
        activities: [
          { time: "09:00", description: "Eiffel Tower visit" },
          { time: "13:00", description: "Lunch at local bistro" },
          { time: "15:00", description: "Louvre Museum tour" },
        ],
        accommodation: "Hotel Le Marais, Paris",
      },
    ],
    inclusions: [
      "All accommodations",
      "Daily breakfast",
      "Guided city tours",
      "Airport transfers",
    ],
    exclusions: ["International flights", "Travel insurance", "Personal expenses"],
    emergencyContacts: [
      { contactName: "Tour Guide - Pierre", phone: "+33-1-2345-6789", email: "pierre@wanderlust.com" },
      { contactName: "24/7 Support", phone: "+1-800-TRAVEL", email: "support@wanderlust.com" },
    ],
    customSections: [
      {
        title: "Packing Suggestions",
        content: "Comfortable walking shoes, light clothing for summer, sunscreen, and a camera.",
      },
    ],
    termsAndConditions: [
      {
        policyTitle: "Cancellation Policy",
        policyContent: "Cancellations made 30 days before departure receive a full refund.",
      },
      {
        policyTitle: "Travel Insurance",
        policyContent: "We recommend purchasing travel insurance for your protection.",
      },
    ],
  };

  it("should generate a valid HTML buffer from itinerary data", async () => {
    const result = await generateItineraryPDF(mockItineraryData);

    expect(result).toBeInstanceOf(Buffer);
    expect(result.length).toBeGreaterThan(0);
  });

  it("should include company name in the generated PDF", async () => {
    const result = await generateItineraryPDF(mockItineraryData);
    const html = result.toString("utf-8");

    expect(html).toContain(mockItineraryData.companyName);
  });

  it("should include tour title in the generated PDF", async () => {
    const result = await generateItineraryPDF(mockItineraryData);
    const html = result.toString("utf-8");

    expect(html).toContain(mockItineraryData.tourTitle);
  });

  it("should include destination in the generated PDF", async () => {
    const result = await generateItineraryPDF(mockItineraryData);
    const html = result.toString("utf-8");

    expect(html).toContain(mockItineraryData.destination);
  });

  it("should include client name in the generated PDF", async () => {
    const result = await generateItineraryPDF(mockItineraryData);
    const html = result.toString("utf-8");

    expect(html).toContain(mockItineraryData.clientName);
  });

  it("should include all days in the itinerary", async () => {
    const result = await generateItineraryPDF(mockItineraryData);
    const html = result.toString("utf-8");

    mockItineraryData.days.forEach((day) => {
      expect(html).toContain(day.title);
      expect(html).toContain(`Day ${day.dayNumber}`);
    });
  });

  it("should include all activities for each day", async () => {
    const result = await generateItineraryPDF(mockItineraryData);
    const html = result.toString("utf-8");

    mockItineraryData.days.forEach((day) => {
      day.activities.forEach((activity) => {
        expect(html).toContain(activity.time);
        expect(html).toContain(activity.description);
      });
    });
  });

  it("should include all inclusions in the PDF", async () => {
    const result = await generateItineraryPDF(mockItineraryData);
    const html = result.toString("utf-8");

    mockItineraryData.inclusions.forEach((inclusion) => {
      expect(html).toContain(inclusion);
    });
  });

  it("should include all exclusions in the PDF", async () => {
    const result = await generateItineraryPDF(mockItineraryData);
    const html = result.toString("utf-8");

    mockItineraryData.exclusions.forEach((exclusion) => {
      expect(html).toContain(exclusion);
    });
  });

  it("should include emergency contact information", async () => {
    const result = await generateItineraryPDF(mockItineraryData);
    const html = result.toString("utf-8");

    mockItineraryData.emergencyContacts.forEach((contact) => {
      expect(html).toContain(contact.contactName);
      expect(html).toContain(contact.phone);
    });
  });

  it("should include custom sections", async () => {
    const result = await generateItineraryPDF(mockItineraryData);
    const html = result.toString("utf-8");

    mockItineraryData.customSections.forEach((section) => {
      expect(html).toContain(section.title);
      expect(html).toContain(section.content);
    });
  });

  it("should include terms and conditions", async () => {
    const result = await generateItineraryPDF(mockItineraryData);
    const html = result.toString("utf-8");

    mockItineraryData.termsAndConditions.forEach((term) => {
      expect(html).toContain(term.policyTitle);
      expect(html).toContain(term.policyContent);
    });
  });

  it("should handle special characters properly", async () => {
    const dataWithSpecialChars: ItineraryFormData = {
      ...mockItineraryData,
      companyName: "Travel & Adventure Co. <Ltd>",
      tourTitle: "Paris \"City of Light\" Tour",
      destination: "France & Switzerland",
    };

    const result = await generateItineraryPDF(dataWithSpecialChars);
    const html = result.toString("utf-8");

    expect(html).toContain("&amp;");
    expect(html).toContain("&quot;");
    expect(html).toContain("&lt;");
  });

  it("should handle long text without breaking", async () => {
    const longText = "A".repeat(500);
    const dataWithLongText: ItineraryFormData = {
      ...mockItineraryData,
      days: [
        {
          ...mockItineraryData.days[0],
          activities: [{ time: "09:00", description: longText }],
        },
      ],
    };

    const result = await generateItineraryPDF(dataWithLongText);
    expect(result).toBeInstanceOf(Buffer);
    expect(result.length).toBeGreaterThan(0);
  });

  it("should handle empty optional sections", async () => {
    const minimalData: ItineraryFormData = {
      ...mockItineraryData,
      customSections: [],
      emergencyContacts: [],
      termsAndConditions: [],
    };

    const result = await generateItineraryPDF(minimalData);
    expect(result).toBeInstanceOf(Buffer);
    expect(result.length).toBeGreaterThan(0);
  });
});
