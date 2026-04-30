import { Card } from "@/components/ui/card";

interface ItineraryPreviewProps {
  companyName: string;
  tourTitle: string;
  destination: string;
  clientName: string;
  bookingReference: string;
  startDate: string;
  endDate: string;
  days: any[];
  inclusions: string[];
  exclusions: string[];
  emergencyContacts: any[];
  customSections: any[];
  termsAndConditions: any[];
  companyEmail: string;
  companyPhone: string;
  companyWebsite: string;
  customFields: { label: string; value: string }[];
}

export function ItineraryPreview(props: ItineraryPreviewProps) {
  const calculateDays = (start: string, end: string): number => {
    const s = new Date(start);
    const e = new Date(end);
    const diff = Math.abs(e.getTime() - s.getTime());
    return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
  };

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden max-h-[90vh] overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="border-b pb-4">
          <h1 className="text-2xl font-bold text-blue-900">{props.companyName}</h1>
          <p className="text-lg font-semibold text-blue-600 mt-1">{props.tourTitle}</p>
        </div>

        {/* Metadata */}
        <div className="bg-blue-50 p-4 rounded-lg space-y-2 text-sm">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="font-semibold text-gray-700">Destination:</span>
              <p className="text-gray-600">{props.destination}</p>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Duration:</span>
              <p className="text-gray-600">{calculateDays(props.startDate, props.endDate)} Days</p>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Client:</span>
              <p className="text-gray-600">{props.clientName}</p>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Reference:</span>
              <p className="text-gray-600">{props.bookingReference}</p>
            </div>
            {props.customFields.map((field, idx) => (
              <div key={idx}>
                <span className="font-semibold text-gray-700">{field.label}:</span>
                <p className="text-gray-600">{field.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Itinerary */}
        {props.days.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Daily Itinerary</h2>
            <div className="space-y-3">
              {props.days.map((day, idx) => (
                <div key={idx} className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-600">
                  <h3 className="font-semibold text-gray-900">
                    Day {day.dayNumber}: {day.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    {day.date && formatDate(day.date)} | Meals: {day.mealsIncluded}
                  </p>
                  {day.activities.length > 0 && (
                    <ul className="mt-2 space-y-1 text-xs text-gray-700">
                      {day.activities.map((activity: any, aIdx: number) => (
                        <li key={aIdx} className="ml-2">
                          <strong>{activity.time}</strong> – {activity.description}
                        </li>
                      ))}
                    </ul>
                  )}
                  {day.accommodation && (
                    <p className="text-xs text-blue-700 mt-2">
                      <strong>Accommodation:</strong> {day.accommodation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Inclusions & Exclusions */}
        {(props.inclusions.length > 0 || props.exclusions.length > 0) && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">What's Included & Not Included</h2>
            <div className="grid grid-cols-2 gap-3">
              {props.inclusions.length > 0 && (
                <div className="bg-green-50 p-3 rounded-lg">
                  <h3 className="font-semibold text-green-900 text-sm mb-2">Included</h3>
                  <ul className="space-y-1 text-xs text-green-800">
                    {props.inclusions.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {props.exclusions.length > 0 && (
                <div className="bg-red-50 p-3 rounded-lg">
                  <h3 className="font-semibold text-red-900 text-sm mb-2">Not Included</h3>
                  <ul className="space-y-1 text-xs text-red-800">
                    {props.exclusions.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Emergency Contacts */}
        {props.emergencyContacts.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Emergency Contacts</h2>
            <div className="space-y-2">
              {props.emergencyContacts.map((contact, idx) => (
                <div key={idx} className="bg-gray-50 p-2 rounded text-xs">
                  <p className="font-semibold text-gray-900">{contact.contactName}</p>
                  <p className="text-gray-600">{contact.phone} {contact.email && `| ${contact.email}`}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom Sections */}
        {props.customSections.length > 0 && (
          <div>
            {props.customSections.map((section, idx) => (
              <div key={idx} className="mb-4">
                <h2 className="text-lg font-bold text-gray-900 mb-2">{section.title}</h2>
                <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">{section.content}</p>
              </div>
            ))}
          </div>
        )}

        {/* Terms & Conditions */}
        {props.termsAndConditions.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Terms and Conditions</h2>
            <div className="space-y-3">
              {props.termsAndConditions.map((term, idx) => (
                <div key={idx}>
                  <h3 className="font-semibold text-gray-900 text-sm">{term.policyTitle}</h3>
                  <p className="text-xs text-gray-700 mt-1 leading-relaxed">{term.policyContent}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="border-t pt-4 text-xs text-gray-600">
          <p className="font-semibold text-gray-900 mb-1">Document generated by {props.companyName}</p>
          <p className="space-x-2">
            {props.companyWebsite && <span>{props.companyWebsite}</span>}
            {props.companyEmail && <span>|</span>}
            {props.companyEmail && <span>{props.companyEmail}</span>}
            {props.companyPhone && <span>|</span>}
            {props.companyPhone && <span>{props.companyPhone}</span>}
          </p>
        </div>
      </div>
    </div>
  );
}
