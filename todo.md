# Itinerary Builder - Project TODO

## Database & Backend Setup
- [x] Design and create database schema (itineraries, days, activities, custom_sections tables)
- [x] Generate and apply database migration
- [x] Create database query helpers in server/db.ts
- [x] Implement tRPC procedures for itinerary CRUD operations
- [x] Implement PDF generation procedure with ReportLab-style formatting

## Frontend - Core Form Components
- [x] Build Tour Details Form (company name, logo upload, tour title, destination, client info, contact details)
- [x] Build Date Range Picker component
- [x] Build Dynamic Day Management (add/remove/reorder days)
- [x] Build Per-Day Activity Management (add/remove activities with time + description)
- [x] Build Dynamic Custom Section Creator (add/remove named sections with free-form content)
- [x] Build Inclusions and Exclusions Editor (dual bullet-point lists)
- [x] Build Emergency Contacts Table Editor
- [x] Build Terms and Conditions Editor (individual policy entries)

## Frontend - UI & Layout
- [x] Design and implement elegant, professional color palette and typography
- [x] Create responsive two-panel layout (form on left, live preview on right)
- [x] Build live form preview panel showing structured itinerary summary
- [x] Implement form state management and validation
- [x] Add visual feedback for form interactions (loading, success, error states)

## PDF Generation & Export
- [x] Integrate client-side PDF generation library (html2pdf.js)
- [x] Implement branded PDF layout with company name and contact info
- [x] Ensure PDF mirrors the live preview structure
- [x] Implement one-click PDF download functionality
- [x] Test PDF output with various input combinations

## Testing & Polish
- [x] Write vitest tests for backend procedures (24 tests: 15 PDF generator + 9 tRPC router tests)
- [x] Test all dynamic form features (add/remove functionality verified)
- [x] Test PDF generation with edge cases (long text, special characters, complex itineraries)
- [x] Verify responsive design on mobile and desktop
- [x] Core UI implementation complete with professional styling
- [ ] Future Enhancement: Add animations and micro-interactions for enhanced UX
- [ ] Future Enhancement: Accessibility audit and refinement

## Deployment
- [x] Create initial checkpoint
- [x] Application ready for testing and review (checkpoint: fd039cef)

## Bug Fixes
- [x] Fixed PDF download button - now uses server-side HTML generation with browser print dialog
- [x] Fixed repeated click issue - button now works multiple times without page reload

- [x] Fixed Terms and Conditions section - added validation feedback with toast notifications

- [x] Fixed loading toast not disappearing after PDF generation - now properly dismisses the loading toast before showing success message

- [x] Removed publish link from PDF footer - now displays company name and page number only

- [x] Removed buildHTMLEnd footer function from PDF generator - PDFs now have no footer

- [x] Added footer to PDF with company name, website, email, and phone number

- [x] Added CSS @page rules to hide browser headers and footers automatically when printing to PDF
