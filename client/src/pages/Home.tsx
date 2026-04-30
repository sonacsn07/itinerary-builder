import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Download } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useState, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { ItineraryPreview } from "@/components/ItineraryPreview";
import { useAuth } from "@/_core/hooks/useAuth";

interface Activity {
  time: string;
  description: string;
}

interface Day {
  dayNumber: number;
  title: string;
  date: string;
  mealsIncluded: string;
  activities: Activity[];
  accommodation: string;
}

interface CustomSection {
  title: string;
  content: string;
}

interface TermAndCondition {
  policyTitle: string;
  policyContent: string;
}

interface EmergencyContact {
  contactName: string;
  phone: string;
  email: string;
}

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const previewRef = useRef<HTMLDivElement>(null);
  const generatePDFMutation = trpc.itinerary.generatePDF.useMutation();

  const [formData, setFormData] = useState({
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
    days: [] as Day[],
    inclusions: [] as string[],
    exclusions: [] as string[],
    customSections: [] as CustomSection[],
    emergencyContacts: [] as EmergencyContact[],
    termsAndConditions: [] as TermAndCondition[],
    customFields: [] as { label: string; value: string }[],
  });

  const [newInclusion, setNewInclusion] = useState("");
  const [newExclusion, setNewExclusion] = useState("");
  const [newCustomSection, setNewCustomSection] = useState({ title: "", content: "" });
  const [newTerm, setNewTerm] = useState({ policyTitle: "", policyContent: "" });
  const [newContact, setNewContact] = useState({ contactName: "", phone: "", email: "" });
  const [newCustomField, setNewCustomField] = useState({ label: "", value: "" });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="w-full max-w-md p-8 shadow-xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Itinerary Builder</h1>
          <p className="text-gray-600 mb-6">Create professional travel itineraries in minutes</p>
          <Button className="w-full" onClick={() => (window.location.href = getLoginUrl())}>
            Sign In to Get Started
          </Button>
        </Card>
      </div>
    );
  }

  const addDay = () => {
    const newDay: Day = {
      dayNumber: formData.days.length + 1,
      title: "",
      date: "",
      mealsIncluded: "",
      activities: [],
      accommodation: "",
    };
    setFormData({ ...formData, days: [...formData.days, newDay] });
  };

  const removeDay = (index: number) => {
    setFormData({ ...formData, days: formData.days.filter((_, i) => i !== index) });
  };

  const addActivity = (dayIndex: number) => {
    const updatedDays = [...formData.days];
    updatedDays[dayIndex].activities.push({ time: "", description: "" });
    setFormData({ ...formData, days: updatedDays });
  };

  const removeActivity = (dayIndex: number, activityIndex: number) => {
    const updatedDays = [...formData.days];
    updatedDays[dayIndex].activities = updatedDays[dayIndex].activities.filter((_, i) => i !== activityIndex);
    setFormData({ ...formData, days: updatedDays });
  };

  const updateDay = (index: number, field: string, value: string) => {
    const updatedDays = [...formData.days];
    updatedDays[index] = { ...updatedDays[index], [field]: value };
    setFormData({ ...formData, days: updatedDays });
  };

  const updateActivity = (dayIndex: number, activityIndex: number, field: string, value: string) => {
    const updatedDays = [...formData.days];
    updatedDays[dayIndex].activities[activityIndex] = {
      ...updatedDays[dayIndex].activities[activityIndex],
      [field]: value,
    };
    setFormData({ ...formData, days: updatedDays });
  };

  const addInclusion = () => {
    if (newInclusion.trim()) {
      setFormData({ ...formData, inclusions: [...formData.inclusions, newInclusion] });
      setNewInclusion("");
    }
  };

  const removeInclusion = (index: number) => {
    setFormData({ ...formData, inclusions: formData.inclusions.filter((_, i) => i !== index) });
  };

  const addExclusion = () => {
    if (newExclusion.trim()) {
      setFormData({ ...formData, exclusions: [...formData.exclusions, newExclusion] });
      setNewExclusion("");
    }
  };

  const removeExclusion = (index: number) => {
    setFormData({ ...formData, exclusions: formData.exclusions.filter((_, i) => i !== index) });
  };

  const addCustomSection = () => {
    if (newCustomSection.title.trim() && newCustomSection.content.trim()) {
      setFormData({ ...formData, customSections: [...formData.customSections, newCustomSection] });
      setNewCustomSection({ title: "", content: "" });
    }
  };

  const removeCustomSection = (index: number) => {
    setFormData({ ...formData, customSections: formData.customSections.filter((_, i) => i !== index) });
  };

  const addTerm = () => {
    if (newTerm.policyTitle.trim() && newTerm.policyContent.trim()) {
      setFormData({ ...formData, termsAndConditions: [...formData.termsAndConditions, newTerm] });
      setNewTerm({ policyTitle: "", policyContent: "" });
      toast.success("Term added successfully!");
    } else {
      toast.error("Please fill in both policy title and content");
    }
  };

  const removeTerm = (index: number) => {
    setFormData({ ...formData, termsAndConditions: formData.termsAndConditions.filter((_, i) => i !== index) });
  };

  const addContact = () => {
    if (newContact.contactName.trim() && newContact.phone.trim()) {
      setFormData({ ...formData, emergencyContacts: [...formData.emergencyContacts, newContact] });
      setNewContact({ contactName: "", phone: "", email: "" });
    }
  };

  const removeContact = (index: number) => {
    setFormData({ ...formData, emergencyContacts: formData.emergencyContacts.filter((_, i) => i !== index) });
  };

  const addCustomField = () => {
    if (newCustomField.label.trim() && newCustomField.value.trim()) {
      setFormData({ ...formData, customFields: [...formData.customFields, newCustomField] });
      setNewCustomField({ label: "", value: "" });
    }
  };

  const removeCustomField = (index: number) => {
    setFormData({ ...formData, customFields: formData.customFields.filter((_, i) => i !== index) });
  };

  const handleGeneratePDF = async () => {
    let loadingToastId: string | number | undefined;
    try {
      loadingToastId = toast.loading("Generating PDF...");
      
      const result = await generatePDFMutation.mutateAsync({
        companyName: formData.companyName,
        tourTitle: formData.tourTitle,
        destination: formData.destination,
        clientName: formData.clientName,
        bookingReference: formData.bookingReference,
        companyEmail: formData.companyEmail,
        companyPhone: formData.companyPhone,
        companyWebsite: formData.companyWebsite,
        startDate: formData.startDate,
        endDate: formData.endDate,
        days: formData.days,
        inclusions: formData.inclusions,
        exclusions: formData.exclusions,
        emergencyContacts: formData.emergencyContacts,
        customSections: formData.customSections,
        termsAndConditions: formData.termsAndConditions,
        customFields: formData.customFields,
      });

      if (result.success && result.html) {
        toast.dismiss(loadingToastId);
        const blob = new Blob([result.html], { type: "text/html" });
        const url = window.URL.createObjectURL(blob);
        
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src = url;
        document.body.appendChild(iframe);
        
        iframe.onload = () => {
          setTimeout(() => {
            iframe.contentWindow?.print();
            setTimeout(() => {
              document.body.removeChild(iframe);
              window.URL.revokeObjectURL(url);
              toast.success("PDF ready! Use your browser's print dialog to save as PDF.");
            }, 100);
          }, 250);
        };
      } else {
        toast.dismiss(loadingToastId);
        toast.error("Failed to generate PDF");
      }
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.dismiss(loadingToastId);
      toast.error("Failed to generate PDF");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Itinerary Builder</h1>
          <p className="text-gray-600">Create professional travel itineraries for your clients</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Tour Details */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Tour Details</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label className="mb-2">Company Name</Label>
                  <Input value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} />
                </div>
                <div>
                  <Label className="mb-2">Tour Title</Label>
                  <Input value={formData.tourTitle} onChange={(e) => setFormData({ ...formData, tourTitle: e.target.value })} />
                </div>
                <div>
                  <Label className="mb-2">Destination</Label>
                  <Input value={formData.destination} onChange={(e) => setFormData({ ...formData, destination: e.target.value })} />
                </div>
                <div>
                  <Label className="mb-2">Client Name</Label>
                  <Input value={formData.clientName} onChange={(e) => setFormData({ ...formData, clientName: e.target.value })} />
                </div>
                <div>
                  <Label className="mb-2">Booking Reference</Label>
                  <Input value={formData.bookingReference} onChange={(e) => setFormData({ ...formData, bookingReference: e.target.value })} />
                </div>
                <div>
                  <Label className="mb-2">Start Date</Label>
                  <Input type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} />
                </div>
                <div>
                  <Label className="mb-2">End Date</Label>
                  <Input type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} />
                </div>
                <div>
                  <Label className="mb-2">Company Email</Label>
                  <Input value={formData.companyEmail} onChange={(e) => setFormData({ ...formData, companyEmail: e.target.value })} />
                </div>
                <div>
                  <Label className="mb-2">Company Phone</Label>
                  <Input value={formData.companyPhone} onChange={(e) => setFormData({ ...formData, companyPhone: e.target.value })} />
                </div>
                <div>
                  <Label className="mb-2">Company Website</Label>
                  <Input value={formData.companyWebsite} onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })} />
                </div>
              </div>

              {/* Custom Fields */}
              <div className="col-span-2 border-t pt-4 mt-2">
                <Label className="mb-2 block font-semibold">Custom Fields</Label>
                <div className="space-y-2 mb-3">
                  {formData.customFields.map((field, index) => (
                    <Card key={index} className="p-2 bg-indigo-50 flex justify-between items-center">
                      <span className="text-sm"><strong>{field.label}:</strong> {field.value}</span>
                      <Button variant="ghost" size="sm" onClick={() => removeCustomField(index)}>
                        <Trash2 size={14} />
                      </Button>
                    </Card>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Label (e.g. Tour Guide)" value={newCustomField.label} onChange={(e) => setNewCustomField({ ...newCustomField, label: e.target.value })} />
                  <Input placeholder="Value (e.g. Jane Smith)" value={newCustomField.value} onChange={(e) => setNewCustomField({ ...newCustomField, value: e.target.value })} />
                  <Button onClick={addCustomField} variant="outline" className="gap-1 shrink-0">
                    <Plus size={16} /> Add
                  </Button>
                </div>
              </div>
            </Card>

            {/* Daily Itinerary */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Daily Itinerary</h2>
                <Button onClick={addDay} className="gap-2">
                  <Plus size={16} /> Add Day
                </Button>
              </div>
              <div className="space-y-4">
                {formData.days.map((day, dayIndex) => (
                  <Card key={dayIndex} className="p-4 bg-blue-50">
                    <div className="grid grid-cols-3 gap-3 mb-3">
                      <div>
                        <Label className="text-sm">Day Title</Label>
                        <Input value={day.title} onChange={(e) => updateDay(dayIndex, "title", e.target.value)} placeholder="e.g., Arrival in Paris" />
                      </div>
                      <div>
                        <Label className="text-sm">Date</Label>
                        <Input type="date" value={day.date} onChange={(e) => updateDay(dayIndex, "date", e.target.value)} />
                      </div>
                      <div>
                        <Label className="text-sm">Meals Included</Label>
                        <Input value={day.mealsIncluded} onChange={(e) => updateDay(dayIndex, "mealsIncluded", e.target.value)} placeholder="e.g., B, L, D" />
                      </div>
                    </div>

                    {/* Activities */}
                    <div className="mb-3">
                      <Label className="text-sm font-semibold mb-2 block">Activities</Label>
                      <div className="space-y-2">
                        {day.activities.map((activity, actIndex) => (
                          <div key={actIndex} className="flex gap-2">
                            <Input placeholder="Time (e.g., 09:00)" value={activity.time} onChange={(e) => updateActivity(dayIndex, actIndex, "time", e.target.value)} className="w-24" />
                            <Input placeholder="Activity description" value={activity.description} onChange={(e) => updateActivity(dayIndex, actIndex, "description", e.target.value)} className="flex-1" />
                            <Button variant="ghost" size="sm" onClick={() => removeActivity(dayIndex, actIndex)}>
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <Button onClick={() => addActivity(dayIndex)} variant="outline" size="sm" className="mt-2 gap-1">
                        <Plus size={14} /> Add Activity
                      </Button>
                    </div>

                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Label className="text-sm">Accommodation</Label>
                        <Input value={day.accommodation} onChange={(e) => updateDay(dayIndex, "accommodation", e.target.value)} placeholder="Hotel name and details" />
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeDay(dayIndex)} className="mt-6">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Inclusions & Exclusions */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Inclusions and Exclusions</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="mb-2 block">Inclusions</Label>
                  <div className="space-y-2 mb-3">
                    <Input placeholder="Add inclusion" value={newInclusion} onChange={(e) => setNewInclusion(e.target.value)} />
                    <Button onClick={addInclusion} variant="outline" className="w-full gap-2">
                      <Plus size={16} /> Add Inclusion
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {formData.inclusions.map((item, index) => (
                      <Card key={index} className="p-2 bg-green-50 flex justify-between items-center">
                        <span className="text-sm">{item}</span>
                        <Button variant="ghost" size="sm" onClick={() => removeInclusion(index)}>
                          <Trash2 size={14} />
                        </Button>
                      </Card>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="mb-2 block">Exclusions</Label>
                  <div className="space-y-2 mb-3">
                    <Input placeholder="Add exclusion" value={newExclusion} onChange={(e) => setNewExclusion(e.target.value)} />
                    <Button onClick={addExclusion} variant="outline" className="w-full gap-2">
                      <Plus size={16} /> Add Exclusion
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {formData.exclusions.map((item, index) => (
                      <Card key={index} className="p-2 bg-red-50 flex justify-between items-center">
                        <span className="text-sm">{item}</span>
                        <Button variant="ghost" size="sm" onClick={() => removeExclusion(index)}>
                          <Trash2 size={14} />
                        </Button>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Emergency Contacts */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Emergency Contacts</h2>
              <div className="space-y-3 mb-4">
                <Input placeholder="Contact Name" value={newContact.contactName} onChange={(e) => setNewContact({ ...newContact, contactName: e.target.value })} />
                <Input placeholder="Phone Number" value={newContact.phone} onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })} />
                <Input placeholder="Email (optional)" value={newContact.email} onChange={(e) => setNewContact({ ...newContact, email: e.target.value })} />
                <Button onClick={addContact} className="gap-2">
                  <Plus size={16} /> Add Contact
                </Button>
              </div>
              <div className="space-y-2">
                {formData.emergencyContacts.map((contact, index) => (
                  <Card key={index} className="p-3 bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{contact.contactName}</h4>
                        <p className="text-sm text-gray-600">{contact.phone} {contact.email && `| ${contact.email}`}</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeContact(index)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Custom Sections */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Custom Sections</h2>
              <div className="space-y-3 mb-4">
                <Input placeholder="Section Title" value={newCustomSection.title} onChange={(e) => setNewCustomSection({ ...newCustomSection, title: e.target.value })} />
                <Textarea placeholder="Section Content" value={newCustomSection.content} onChange={(e) => setNewCustomSection({ ...newCustomSection, content: e.target.value })} />
                <Button onClick={addCustomSection} className="gap-2">
                  <Plus size={16} /> Add Section
                </Button>
              </div>
              <div className="space-y-2">
                {formData.customSections.map((section, index) => (
                  <Card key={index} className="p-3 bg-purple-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{section.title}</h4>
                        <p className="text-sm text-gray-600">{section.content.substring(0, 100)}...</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeCustomSection(index)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Terms and Conditions */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Terms and Conditions</h2>
              <div className="space-y-3 mb-4">
                <Input placeholder="Policy Title" value={newTerm.policyTitle} onChange={(e) => setNewTerm({ ...newTerm, policyTitle: e.target.value })} />
                <Textarea placeholder="Policy Content" value={newTerm.policyContent} onChange={(e) => setNewTerm({ ...newTerm, policyContent: e.target.value })} />
                <Button onClick={addTerm} className="gap-2">
                  <Plus size={16} /> Add Term
                </Button>
              </div>
              <div className="space-y-2">
                {formData.termsAndConditions.map((term, index) => (
                  <Card key={index} className="p-3 bg-amber-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{term.policyTitle}</h4>
                        <p className="text-sm text-gray-600">{term.policyContent.substring(0, 100)}...</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeTerm(index)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>

          {/* Preview Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-4">
              <div ref={previewRef}>
                <ItineraryPreview {...formData} />
              </div>
              <Button onClick={handleGeneratePDF} className="w-full gap-2 bg-blue-600 hover:bg-blue-700 h-12 text-base">
                <Download size={20} />
                Download as PDF
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
