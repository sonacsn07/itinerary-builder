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
- [x] Integrate server-side PDF generation library (ReportLab or similar)
- [x] Implement branded PDF layout with logo, company name, and contact info
- [x] Ensure PDF mirrors the live preview structure
- [x] Implement one-click PDF download functionality
- [ ] Test PDF output with various input combinations

## Testing & Polish
- [ ] Write vitest tests for backend procedures
- [ ] Test all dynamic form features (add/remove/reorder)
- [ ] Test PDF generation with edge cases (long text, special characters, etc.)
- [ ] Verify responsive design on mobile and desktop
- [ ] Polish animations and micro-interactions
- [ ] Final visual refinement and accessibility check

## Deployment
- [ ] Create initial checkpoint
- [ ] Deploy to production
