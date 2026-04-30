/**
 * Sample template: Dharamshala & Dalhousie Tour
 * Pre-filled itinerary data that users can edit.
 */

interface TemplateDay {
  dayNumber: number;
  title: string;
  date: string;
  mealsIncluded: string;
  accommodation: string;
  imageUrl?: string;
  activities: { time: string; description: string }[];
}

export const dharamshalaDalhousieTemplate = {
  tourTitle: "Dharamshala & Dalhousie Tour",
  destination: "Dharamshala, Dalhousie (Himachal Pradesh)",
  clientName: "Jane Doe",
  bookingReference: "P0077747",
  createdDate: new Date().toISOString().split("T")[0],
  startDate: "2026-04-27",
  endDate: "2026-05-01",

  customFields: [
    { label: "Gender", value: "Male" },
    { label: "Nationality", value: "Indian" },
    { label: "Food Preference", value: "Non Veg" },
    { label: "Adults", value: "2" },
    { label: "Nights/Days", value: "4 Nights / 5 Days" },
  ],

  days: [
    {
      dayNumber: 1,
      title: "Chandigarh → Dharamshala (240 KMS / 4-5 HRS)",
      date: "2026-04-27",
      mealsIncluded: "Dinner",
      accommodation: "Anupam Resort by DLS – Deluxe Room (Double), MAP",
      activities: [
        { time: "Morning", description: "Arrive Chandigarh Railway Station, meet representative & start trip to Dharamshala" },
        { time: "Enroute", description: "Visit Kangra Devi Temple" },
        { time: "Afternoon", description: "Reach Dharamshala (approx 3 hrs), check into hotel" },
        { time: "Evening", description: "Visit Local Market & Kotwali Bazaar" },
      ],
    },
    {
      dayNumber: 2,
      title: "Dharamshala Local Sightseeing",
      date: "2026-04-28",
      mealsIncluded: "Breakfast, Dinner",
      accommodation: "Anupam Resort by DLS – Deluxe Room (Double), MAP",
      activities: [
        { time: "Morning", description: "Visit Mcleodganj and Tsuglagkhang complex (official residence of 14th Dalai Lama)" },
        { time: "Mid-day", description: "Namgyal Gompa, Tibet Museum, Mcleodganj Library" },
        { time: "Afternoon", description: "Bhagsu Nag Temple & Waterfall" },
        { time: "Late Afternoon", description: "St. John Church, War Memorial" },
        { time: "Evening", description: "Cricket Stadium and local market" },
      ],
    },
    {
      dayNumber: 3,
      title: "Dharamshala → Dalhousie (120 KMS / 5-6 HRS)",
      date: "2026-04-29",
      mealsIncluded: "Breakfast, Dinner",
      accommodation: "DLS Nature Trinket Regency – Luxury Cottage with Balcony (Double), MAP",
      activities: [
        { time: "Morning", description: "Breakfast and check out, drive to Dalhousie" },
        { time: "Afternoon", description: "Visit Panchpula Waterfall" },
        { time: "Afternoon", description: "Churches of St. John's, St. Francis & St. Patricks" },
        { time: "Evening", description: "Subhash Chowk and Tibetan Market" },
      ],
    },
    {
      dayNumber: 4,
      title: "Khajjiar + Dalhousie Sightseeing",
      date: "2026-04-30",
      mealsIncluded: "Breakfast, Dinner",
      accommodation: "DLS Nature Trinket Regency – Luxury Cottage with Balcony (Double), MAP",
      activities: [
        { time: "Morning", description: "Visit Khajjiar (22 KMs from Dalhousie) — \"Mini Switzerland of India\"" },
        { time: "Mid-day", description: "Admire Khajjiar Lake and lush greenery" },
        { time: "Afternoon", description: "Dalhousie local market" },
        { time: "Evening", description: "Return to hotel" },
      ],
    },
    {
      dayNumber: 5,
      title: "Dalhousie → Chandigarh (260 KMS / 5-6 HRS)",
      date: "2026-05-01",
      mealsIncluded: "Breakfast",
      accommodation: "",
      activities: [
        { time: "Morning", description: "Breakfast and check out from hotel" },
        { time: "Day", description: "Drive to Chandigarh Railway Station for drop" },
      ],
    },
  ],

  inclusions: [
    "Pick-up and drop services from Chandigarh",
    "Stay for 4 nights on double occupancy (2 adults sharing 1 room)",
    "MAP Meal Plan — Daily breakfast and dinner at all places (total 5 each), starting with dinner and ending with breakfast on the last day as per itinerary (meals while travelling are not included)",
    "Transfers and sightseeing by AC vehicle (Sedan cab) as per the itinerary. Note: A/C will not be operated in hilly areas",
    "Transfer taxes, parking, fuel, and driver charges",
    "5% GST (Goods & Services Tax)",
  ],

  exclusions: [
    "Flights, trains, ferries, etc.",
    "Monument entrance fees and camera fees",
    "Personal expenses — laundry, shopping, telephone bills, tips, etc.",
    "Adventure activities — safari, rides, surfing, paragliding, etc.",
    "Any extra services — permits, Volvo luggage charges, heater, meals, etc.",
    "Anything else not listed in the above details",
    "Winter 4x4 jeep charges (extra)",
  ],

  termsAndConditions: [
    { policyTitle: "Himachal Advance", policyContent: "For Himachal packages, 50% advance payment of the total package cost must be deposited in our company's account to confirm the booking." },
    { policyTitle: "Other States Advance", policyContent: "For all other states and destinations, 75% advance payment is required, especially for higher-category hotels." },
    { policyTitle: "Premium Hotels", policyContent: "As per hotel policy, 100% payment is required at the time of booking for 4-star and 5-star properties." },
    { policyTitle: "Train & Flight", policyContent: "For train and flight bookings, 100% advance payment is required at the time of booking." },
    { policyTitle: "International Packages", policyContent: "For international packages, 100% advance payment is required at the time of booking." },
    { policyTitle: "Remaining Payment", policyContent: "The remaining payment will be collected on arrival (first day of the tour)." },
    { policyTitle: "Non-Payment", policyContent: "In case of non-payment (either advance or remaining balance), the company reserves the right to stop all services." },
  ],

  emergencyContacts: [] as { contactName: string; phone: string; email: string }[],

  customSections: [] as { title: string; content: string }[],
};
