import { ItineraryFormData } from "../shared/types.js";

export async function generateItineraryPDF(data: ItineraryFormData): Promise<Buffer> {
  const html = generateItineraryHTML(data);
  return Buffer.from(html, "utf-8");
}

function generateItineraryHTML(data: ItineraryFormData): string {
  const daysHtml = data.days.map((day) => renderDayBlock(day)).join("");
  const inclusionsHtml = data.inclusions.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  const exclusionsHtml = data.exclusions.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  const contactsHtml = data.emergencyContacts.map((contact) => `<tr><td>${escapeHtml(contact.contactName)}</td><td>${escapeHtml(contact.phone)}</td><td>${escapeHtml(contact.email || "")}</td></tr>`).join("");
  const customSectionsHtml = data.customSections.map((section) => `<div class="custom-section"><h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.content).replace(/\n/g, "<br>")}</p></div>`).join("");
  const termsHtml = data.termsAndConditions.map((term) => `<div class="term-block"><p>${escapeHtml(term.policyContent).replace(/\n/g, "<br>")}</p></div>`).join("");

  let html = buildHTMLStart(data);
  html += daysHtml;
  html += buildHTMLMiddle(data, inclusionsHtml, exclusionsHtml, contactsHtml, customSectionsHtml, termsHtml);
  html += buildHTMLEnd(data);

  return html;
}

function buildHTMLStart(data: ItineraryFormData): string {
  let html = "<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><title>";
  html += escapeHtml(data.tourTitle);
  html += "</title><style>";
  html += "* { margin: 0; padding: 0; box-sizing: border-box; }";
  html += "body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #2C3E50; line-height: 1.6; }";
  html += ".container { max-width: 900px; margin: 0 auto; background: white; padding: 40px; }";
  html += "header { margin-bottom: 40px; border-bottom: 3px solid #1A5276; padding-bottom: 20px; }";
  html += ".header-inner { display: flex; align-items: center; gap: 20px; }";
  html += ".header-logo { flex-shrink: 0; }";
  html += ".header-logo img { height: 100px; width: auto; object-fit: contain; }";
  html += ".header-text { flex: 1; }";
  html += ".company-name { font-size: 28px; font-weight: bold; color: #1A5276; margin-bottom: 4px; }";
  html += ".page-title { font-size: 18px; color: #5DADE2; margin-bottom: 4px; }";
  html += ".tour-title { font-size: 22px; font-weight: bold; color: #1A5276; }";
  html += ".meta-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; background: #EBF5FB; }";
  html += ".meta-table td { padding: 12px; border: 1px solid #AED6F1; }";
  html += ".meta-table strong { color: #1A5276; }";
  html += "section { margin-bottom: 40px; }";
  html += "h2 { font-size: 18px; font-weight: bold; color: white; background: #1A5276; padding: 12px 15px; margin-bottom: 20px; border-radius: 4px; }";
  html += ".welcome-text { font-size: 14px; line-height: 1.8; margin-bottom: 15px; text-align: justify; }";
  html += ".day-block { background: #EBF5FB; padding: 15px; margin-bottom: 15px; border-left: 4px solid #1A5276; border-radius: 4px; }";
  html += ".day-header { margin-bottom: 10px; }";
  html += ".day-header h3 { font-size: 16px; color: #1A5276; margin-bottom: 5px; }";
  html += ".day-meta { font-size: 12px; color: #7F8C8D; font-style: italic; }";
  html += ".activities { margin: 10px 0; }";
  html += ".activity { font-size: 13px; margin-bottom: 8px; padding-left: 15px; }";
  html += ".activity strong { color: #1A5276; min-width: 80px; display: inline-block; }";
  html += ".accommodation { font-size: 13px; margin-top: 10px; color: #2E86C1; font-weight: 500; }";
  html += ".day-block-inner { display: flex; gap: 15px; }";
  html += ".day-image { flex-shrink: 0; width: 160px; }";
  html += ".day-image img { width: 100%; height: 140px; object-fit: cover; border-radius: 4px; }";
  html += ".day-content { flex: 1; min-width: 0; }";
  html += ".inclusions-exclusions { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }";
  html += ".inclusions-exclusions div { padding: 15px; background: #EBF5FB; border-radius: 4px; }";
  html += ".inclusions-exclusions h3 { font-size: 14px; color: #1A5276; margin-bottom: 10px; font-weight: bold; }";
  html += ".inclusions-exclusions ul { list-style: none; padding-left: 0; }";
  html += ".inclusions-exclusions li { font-size: 13px; margin-bottom: 8px; padding-left: 20px; position: relative; }";
  html += ".contacts-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }";
  html += ".contacts-table th { background: #1A5276; color: white; padding: 12px; text-align: left; font-weight: bold; font-size: 13px; }";
  html += ".contacts-table td { padding: 12px; border-bottom: 1px solid #AED6F1; font-size: 13px; }";
  html += ".contacts-table tr:nth-child(even) { background: #EBF5FB; }";
  html += ".custom-section { margin-bottom: 30px; }";
  html += ".custom-section h2 { font-size: 16px; background: #2E86C1; padding: 10px 15px; margin-bottom: 15px; }";
  html += ".custom-section p { font-size: 13px; line-height: 1.8; text-align: justify; }";
  html += ".term-block { margin-bottom: 20px; }";
  html += ".term-block h3 { font-size: 14px; color: #1A5276; margin-bottom: 8px; font-weight: bold; }";
  html += ".term-block p { font-size: 13px; line-height: 1.8; text-align: justify; }";
  html += "footer { border-top: 1px solid #AED6F1; padding-top: 20px; margin-top: 40px; text-align: center; font-size: 11px; color: #7F8C8D; }";
  html += ".company-contact { font-size: 11px; margin-top: 10px; }";
  html += "@page { margin: 0.5in; size: A4; }";
  html += "@page { @bottom-left { content: none; } @bottom-right { content: none; } @top-left { content: none; } @top-right { content: none; } }";
  html += "@media print { body { margin: 0; padding: 0; } }";
  html += ".created-date { font-size: 12px; color: #7F8C8D; font-style: italic; margin-bottom: 15px; }";
  html += "</style></head><body><div class=\"container\"><header>";
  html += "<div class=\"header-inner\">";
  if (data.companyLogoUrl) {
    html += "<div class=\"header-logo\"><img src=\"" + data.companyLogoUrl + "\" alt=\"Company Logo\" /></div>";
  }
  html += "<div class=\"header-text\">";
  html += "<div class=\"company-name\">" + escapeHtml(data.companyName) + "</div>";
  html += "<div class=\"page-title\">Travel Itinerary</div>";
  html += "<div class=\"tour-title\">" + escapeHtml(data.tourTitle) + "</div>";
  html += "</div></div>";
  html += "</header>";
  if ((data as any).createdDate) {
    html += "<p class=\"created-date\">Created on " + formatDate(new Date((data as any).createdDate)) + "</p>";
  }
  html += "<table class=\"meta-table\"><tr><td><strong>Destination:</strong></td><td>" + escapeHtml(data.destination) + "</td><td><strong>Duration:</strong></td><td>" + calculateDays(data.startDate, data.endDate) + " Days</td></tr>";
  html += "<tr><td><strong>Client Name:</strong></td><td>" + escapeHtml(data.clientName) + "</td><td><strong>Booking Reference:</strong></td><td>" + escapeHtml(data.bookingReference) + "</td></tr>";
  // Custom fields: render two per row to match the 4-column layout
  if (data.customFields && data.customFields.length > 0) {
    for (let i = 0; i < data.customFields.length; i += 2) {
      const f1 = data.customFields[i];
      const f2 = data.customFields[i + 1];
      html += "<tr><td><strong>" + escapeHtml(f1.label) + ":</strong></td><td>" + escapeHtml(f1.value) + "</td>";
      if (f2) {
        html += "<td><strong>" + escapeHtml(f2.label) + ":</strong></td><td>" + escapeHtml(f2.value) + "</td>";
      } else {
        html += "<td></td><td></td>";
      }
      html += "</tr>";
    }
  }
  html += "</table>";
  html += "<section><h2>Welcome to Your Adventure!</h2><p class=\"welcome-text\">Dear " + escapeHtml(data.clientName) + ",</p>";
  html += "<p class=\"welcome-text\">Thank you for choosing <strong>" + escapeHtml(data.companyName) + "</strong> for your upcoming journey to <strong>" + escapeHtml(data.destination) + "</strong>. We are thrilled to have you on board!</p></section>";
  html += "<section><h2>Daily Itinerary</h2>";
  return html;
}

function buildHTMLMiddle(data: ItineraryFormData, inclusionsHtml: string, exclusionsHtml: string, contactsHtml: string, customSectionsHtml: string, termsHtml: string): string {
  let html = "</section>";
  if (data.inclusions.length > 0 || data.exclusions.length > 0) {
    html += "<section><h2>Whats Included &amp; Not Included</h2><div class=\"inclusions-exclusions\">";
    if (data.inclusions.length > 0) html += "<div><h3>Included</h3><ul>" + inclusionsHtml + "</ul></div>";
    if (data.exclusions.length > 0) html += "<div><h3>Not Included</h3><ul>" + exclusionsHtml + "</ul></div>";
    html += "</div></section>";
  }
  if (data.emergencyContacts.length > 0) {
    html += "<section><h2>Emergency Contacts</h2><table class=\"contacts-table\"><thead><tr><th>Contact Name</th><th>Phone</th><th>Email</th></tr></thead><tbody>" + contactsHtml + "</tbody></table></section>";
  }
  if (customSectionsHtml) html += "<section>" + customSectionsHtml + "</section>";
  if (data.termsAndConditions.length > 0) html += "<section><h2>Terms and Conditions</h2>" + termsHtml + "</section>";
  return html;
}



function buildHTMLEnd(data: ItineraryFormData): string {
  let footerContent = escapeHtml(data.companyName);
  const contactParts = [];
  if (data.companyWebsite) contactParts.push(escapeHtml(data.companyWebsite));
  if (data.companyEmail) contactParts.push(escapeHtml(data.companyEmail));
  if (data.companyPhone) contactParts.push(escapeHtml(data.companyPhone));
  
  if (contactParts.length > 0) {
    footerContent += " | " + contactParts.join(" | ");
  }
  
  let html = "<footer><p>" + footerContent + "</p></footer></div></body></html>";
  return html;
}

function renderDayBlock(day: any): string {
  const activitiesHtml = day.activities.map((activity: any) => `<p class="activity"><strong>${escapeHtml(activity.time)}</strong> ${escapeHtml(activity.description)}</p>`).join("");
  let html = "<div class=\"day-block\">";
  
  if (day.imageUrl) {
    html += "<div class=\"day-block-inner\">";
    html += "<div class=\"day-image\"><img src=\"" + day.imageUrl + "\" alt=\"Day " + day.dayNumber + "\" /></div>";
    html += "<div class=\"day-content\">";
  }

  html += "<div class=\"day-header\"><h3>Day " + day.dayNumber + ": " + escapeHtml(day.title) + "</h3>";
  html += "<p class=\"day-meta\">Date: " + formatDate(day.date) + " | Meals: " + escapeHtml(day.mealsIncluded) + "</p></div>";
  html += "<div class=\"activities\">" + activitiesHtml + "</div>";
  if (day.accommodation) html += "<p class=\"accommodation\"><strong>Accommodation:</strong> " + escapeHtml(day.accommodation) + "</p>";

  if (day.imageUrl) {
    html += "</div></div>"; // close day-content and day-block-inner
  }

  html += "</div>";
  return html;
}

function escapeHtml(text: string | null | undefined): string {
  if (!text) return "";
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

function calculateDays(startDate: Date, endDate: Date): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1;
}
