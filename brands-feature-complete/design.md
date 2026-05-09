# Design Document: Brands Feature Complete

## Overview

This design document specifies the complete implementation of the Brands feature for the Cloud Kitchens management system. The feature completion involves fixing CSS convention violations, expanding UI components to full schema depth, removing deprecated functionality, implementing complete theming support, and providing full internationalization coverage across four languages (English, Arabic, Russian, Armenian).

The backend is fully implemented and correct—no backend changes are required. All work is frontend-focused, following strict architectural patterns: React 19 with Vite, i18next for localization, a 4-file hook pattern (states → apiHelpers → handlers → orchestrator), and component-based architecture with a 100-120 line size limit per component.

### Key Design Principles

1. **No Backend Changes**: The backend Brand model, routes, validators, controllers, and services are complete and correct
2. **CSS Convention Compliance**: Single underscore for internal class names (never double underscore)
3. **Component Size Limit**: Maximum 100-120 lines per component file
4. **Hook Pattern**: Four-file structure with clear separation of concerns
5. **Theme Integration**: All colors via CSS variables (no hardcoded values)
6. **Complete Localization**: Identical key structure across all four locale files
7. **Full Schema Depth**: UI components expose all backend schema fields

## Architecture

### High-Level Component Hierarchy

```
Brands (page orchestrator)
├── Brands_list (list view)
│   └── Brands_list_item (individual brand card)
├── Brands_addForm (create new brand)
├── Brands_detail (detail view orchestrator)
│   ├── Brands_detail_basic (basic info section)
│   ├── Brands_detail_files (files section)
│   │   └── Brands_detail_files_contracts (contracts sub-component)
│   ├── Brands_detail_socials (social media section)
│   ├── Brands_detail_website (website section)
│   │   ├── Brands_detail_website_nameServers
│   │   ├── Brands_detail_website_dns
│   │   └── Brands_detail_website_renewal
│   ├── Brands_detail_otherSocials (other social platforms)
│   ├── Brands_detail_inventoryIntegrations (inventory integrations array)
│   │   └── Brands_detail_integration_row (single integration)
│   │       ├── Brands_detail_integration_payment
│   │       ├── Brands_detail_integration_credentials
│   │       ├── Brands_detail_integration_contacts
│   │       ├── Brands_detail_integration_phones
│   │       └── Brands_detail_integration_logins
│   ├── Brands_detail_salesIntegration (sales integration object)
│   │   └── (uses same integration sub-components)
│   ├── Brands_detail_legal (legal info section)
│   └── Brands_detail_relations (branch/employee/menu relations)
└── Modals (confirmModal, discardModal, deleteModal)
```

### Data Flow Pattern

```
User Action
    ↓
Handler (useBrands_handlers)
    ↓
API Helper (useBrands_apiHelpers)
    ↓
Backend API
    ↓
State Update (useBrands_states)
    ↓
Component Re-render
```

### Hook Layer Architecture

The brands feature follows a strict 4-file hook pattern:

1. **useBrands_states.js**: Manages all React state (brands list, selected brand, draft state, edit modes, loading flags)
2. **useBrands_apiHelpers.js**: Imports and exposes all API helper functions
3. **useBrands_handlers.js**: Business logic layer that coordinates between API helpers and state updates
4. **useBrands.js** (orchestrator): Composes all hooks, builds component props objects, handles i18next translation

Only the orchestrator calls `useTranslation()`. All other hooks remain translation-agnostic.

## Components and Interfaces

### Section Components

Each section component represents one top-level schema section and follows this interface:

```typescript
interface SectionComponentProps {
  draft: object; // Current draft state for this section
  onDraftChange: (path: string, value: any) => void; // Update draft at path
  isEditMode: boolean; // Whether section is in edit mode
  onToggleEdit: () => void; // Toggle edit mode
  onSave: () => void; // Save section changes
  onCancel: () => void; // Cancel and revert changes
  t: (key: string) => string; // Translation function
}
```

### Child Components

Child components are focused sub-components that handle specific UI concerns within a section. They follow this interface:

```typescript
interface ChildComponentProps {
  draft: object; // Relevant portion of draft state
  onDraftChange: (path: string, value: any) => void; // Update draft at path
  t: (key: string) => string; // Translation function
}
```

### Integration Sub-Components

Integration sub-components are shared between inventory integrations (array) and sales integration (single object):

**Brands_detail_integration_payment**

- Props: `{ draft, onDraftChange, t }`
- Fields: cycle, method, currency, amount
- Grid layout with 4 fields

**Brands_detail_integration_credentials**

- Props: `{ draft, onDraftChange, t }`
- Fields: apiKey (password), secret (password), accountId (text)
- Grid layout with 3 fields

**Brands_detail_integration_contacts**

- Props: `{ draft, onDraftChange, t }`
- Fields: telegram, whatsApp, phone, email (each with name and position sub-fields)
- Grid layout with nested object inputs

**Brands_detail_integration_phones**

- Props: `{ draft, onDraftChange, t }`
- Array of registered phone objects
- Each row: branch, phone, isActive, isWhatsAppRegistered, isTelegramRegistered, purpose, notes, registeredAt
- Add/remove row functionality

**Brands_detail_integration_logins**

- Props: `{ draft, onDraftChange, t }`
- Array of login credential objects
- Each row: belongTo (name, employeeId), username, password, email, phoneNumber, type, doesOtpRequired
- Add/remove row functionality

**Brands_detail_integration_row**

- Props: `{ integration, index, isEditMode, onToggleEdit, onRemove, onDraftChange, t }`
- Orchestrates all integration sub-components
- Read mode: displays provider, startedAt, payment summary
- Edit mode: renders all sub-components

### Website Sub-Components

**Brands_detail_website_nameServers**

- Props: `{ draft, onDraftChange, t }`
- String array with add/remove functionality
- Each item is a single text input

**Brands_detail_website_dns**

- Props: `{ draft, onDraftChange, t }`
- Array of DNS record objects
- Each row: type, name, value, ttl
- Add/remove row functionality

**Brands_detail_website_renewal**

- Props: `{ draft, onDraftChange, t }`
- Array of renewal history objects
- Each row: renewedOn, amount, currency, card (brand, last4, cardholder), transactionId
- Add/remove row functionality

### Files Sub-Components

**Brands_detail_files_contracts**

- Props: `{ draft, onDraftChange, t }`
- Array of contract objects
- Each row: with, label, description, fileUrl, started, ending, fileFormat, isEnded, isTerminated, noticePeriodInDays
- Add/remove row functionality
- Dedicated CSS file: `brands_detail_files_contracts.css`

## Data Models

### Empty Row Constants

All new sub-array types require empty-row constants for adding new items:

```javascript
// Registered Phone Row
EMPTY_REGISTERED_PHONE_ROW = {
  branch: "",
  phone: "",
  isActive: true,
  isWhatsAppRegistered: false,
  isTelegramRegistered: false,
  purpose: "",
  notes: "",
  registeredAt: "",
};

// Login Credential Row
EMPTY_LOGIN_CREDENTIAL_ROW = {
  belongTo: { name: "", employeeId: "" },
  username: "",
  password: "",
  email: "",
  phoneNumber: "",
  type: "",
  doesOtpRequired: false,
};

// Contract Row
EMPTY_CONTRACT_ROW = {
  with: "",
  label: "",
  description: "",
  fileUrl: "",
  started: "",
  ending: "",
  fileFormat: "",
  isEnded: false,
  isTerminated: false,
  noticePeriodInDays: "",
};

// File Reference Row (for packaging, miscellaneous)
EMPTY_FILE_REF_ROW = {
  ref: "",
  value: "",
};

// DNS Record Row
EMPTY_DNS_RECORD_ROW = {
  type: "",
  name: "",
  value: "",
  ttl: "",
};

// Renewal Row
EMPTY_RENEWAL_ROW = {
  renewedOn: "",
  amount: "",
  currency: "",
  card: { brand: "", last4: "", cardholder: "" },
  transactionId: "",
};
```

### Draft State Shape

The draft state mirrors the backend Brand schema structure:

```javascript
{
  basic: { name, tagline, isActive, translations },
  files: {
    logos: { highRes, svg, png, jpg, pdf, ico },
    branding: { brandBook, brandOverview, packaging: [{ ref, value }] },
    legalFiles: { vatCertificate, tradeLicense, tradeMark },
    menuFiles: { menuPdf, menuExcel, menuWord },
    recipeFiles: { recipePdf, recipeExcel, recipeWord },
    contracts: [{ with, label, description, fileUrl, started, ending, fileFormat, isEnded, isTerminated, noticePeriodInDays }],
    miscellaneous: [{ ref, value }]
  },
  socials: { instagram, facebook, tikTok, linkedIn, youtube, twitter },
  website: {
    domain, registrar, whois, status, dnsStatus, notes,
    autoRenew, expiresOn, lastRenewedOn,
    nameServers: [string],
    dnsRecords: [{ type, name, value, ttl }],
    renewalHistory: [{ renewedOn, amount, currency, card: { brand, last4, cardholder }, transactionId }]
  },
  otherSocials: { ... },
  inventoryIntegrations: [{
    provider, link, consoleLink, startedAt,
    payment: { cycle, method, currency, amount },
    credentials: { apiKey, secret, accountId },
    mainContacts: { telegram, whatsApp, phone, email },
    registeredPhones: [{ branch, phone, isActive, isWhatsAppRegistered, isTelegramRegistered, purpose, notes, registeredAt }],
    loginCredentials: [{ belongTo: { name, employeeId }, username, password, email, phoneNumber, type, doesOtpRequired }]
  }],
  salesIntegration: {
    provider, link, consoleLink, startedAt,
    payment: { cycle, method, currency, amount },
    credentials: { apiKey, secret, accountId },
    mainContacts: { telegram, whatsApp, phone, email },
    registeredPhones: [{ ... }],
    loginCredentials: [{ ... }]
  },
  legal: { country, city, emirate, dateOfRegistration, hasTradeLicense, hasVATCertificate, hasTradeMark },
  relations: { branches: [id], employees: [id], menu: id }
}
```

### Validation Error Format

Field validators return error messages using locale keys:

```javascript
{
  field: "email",
  error: "validation.invalidEmail"  // Resolved via t("validation.invalidEmail")
}
```

## CSS Architecture

### Variable Naming Convention

**Root Classes**: camelCase (e.g., `brandsDetailSection`)
**Internal Classes**: single underscore (e.g., `brandsDetailSection_header`)
**Modifiers**: double dash (e.g., `brandsDetailSection--collapsed`)
**State Classes**: double dash (e.g., `brandsDetailSection_btn--primary`)

**NEVER use double underscore (`__`) in class names.**

### Theme Integration

All brand-specific CSS variables are defined in both `lightTheme.css` and `darkTheme.css`:

```css
/* Light Theme */
--brands-card-bg: var(--bg-secondary-color);
--brands-card-border: var(--border-primary-color);
--brands-card-shadow: var(--boxShadow-primary-color);
--brands-section-header-bg: var(--bg-tertiary-color);
--brands-section-edit-bg: #f0f7ff;
--brands-section-edit-border: #c2d9f0;
--brands-chip-bg: var(--bg-tertiary-color);
--brands-chip-border: var(--border-primary-color);
--brands-chip-text: var(--text-secondary-color);
--brands-chip-active-bg: #1a6ed8;
--brands-chip-active-border: #1a6ed8;
--brands-chip-active-text: #ffffff;
--brands-badge-active-bg: #d4edda;
--brands-badge-active-text: #155724;
--brands-badge-inactive-bg: #f8d7da;
--brands-badge-inactive-text: #721c24;
--brands-integration-row-bg: var(--bg-tertiary-color);
--brands-integration-row-border: var(--border-primary-color);
--brands-sub-section-bg: #f8f9fa;
--brands-sub-section-border: #dee2e6;
--brands-delete-btn-color: #c0392b;
--brands-delete-btn-hover-bg: #fadbd8;
--brands-add-btn-color: #1a6ed8;
--brands-add-btn-hover-bg: #dbeafe;
--brands-remove-btn-color: #c0392b;
--brands-link-color: #1a6ed8;
--brands-input-bg: var(--bg-primary-color);
--brands-input-border: var(--border-primary-color);
--brands-input-text: var(--text-primary-color);
--brands-label-text: var(--text-secondary-color);
--brands-error-color: #c0392b;

/* Dark Theme - adjusted values */
--brands-section-edit-bg: #1a2535;
--brands-section-edit-border: #2d4a6e;
--brands-badge-active-bg: #1a3a24;
--brands-badge-active-text: #75d89b;
--brands-badge-inactive-bg: #3a1a1a;
--brands-badge-inactive-text: #e08080;
--brands-sub-section-bg: #1e2530;
--brands-sub-section-border: #2d3748;
--brands-delete-btn-color: #e07070;
--brands-delete-btn-hover-bg: #3a1a1a;
--brands-add-btn-color: #5da3f0;
--brands-add-btn-hover-bg: #1a2e4a;
--brands-remove-btn-color: #e07070;
--brands-link-color: #5da3f0;
--brands-error-color: #e07070;
```

### File Organization

**Existing CSS Files** (14 files - all require double-underscore fixes):

1. `brands_detail_section.css` - Section shell styling
2. `brands_list.css` - List view styling
3. `brands_item.css` - Individual brand card styling
4. `brands_addForm.css` - Add form styling
5. `brands_detail.css` - Detail view container styling
6. `brands_modal.css` - Modal styling
7. `brands_viewToggle.css` - View toggle styling
8. `brands_tablePlaceholder.css` - Table placeholder styling
9. `brands_detail_basic.css` - Basic section styling
10. `brands_detail_files.css` - Files section styling
11. `brands_detail_socials.css` - Socials section styling (shared by multiple sections)
12. `brands_detail_emails.css` - Email fields styling (shared by multiple sections)
13. `brands_detail_logoPlaceholder.css` - Logo placeholder styling
14. (Additional existing files)

**New CSS Files** (3 files):

1. `brands_detail_integration.css` - Integration sub-components styling
2. `brands_detail_website_sub.css` - Website sub-components styling
3. `brands_detail_files_contracts.css` - Contracts sub-component styling

## Error Handling

### Validation Strategy

Field validators are pure functions that return error messages or null:

```javascript
const validateEmail = (value) => {
  if (!value) return "validation.required";
  if (value.length < 3) return "validation.tooShort";
  if (value.length > 100) return "validation.tooLong";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
    return "validation.invalidEmail";
  return null;
};

const validateBoolean = (value) => {
  if (typeof value !== "boolean") return "validation.mustBeBoolean";
  return null;
};

const validateString = (value, minLength = 1, maxLength = 255) => {
  if (!value) return "validation.required";
  if (value.length < minLength) return "validation.tooShort";
  if (value.length > maxLength) return "validation.tooLong";
  return null;
};
```

### Validation Coverage

All expanded fields require validators:

**Registered Phone Fields**: phone, branch, purpose, registeredAt
**Login Credential Fields**: username, password, email, phoneNumber, type
**Contract Fields**: with, label, fileUrl, started, ending, noticePeriodInDays
**DNS Record Fields**: type, name, value, ttl
**Renewal Fields**: renewedOn, amount, currency, transactionId
**Website Date Fields**: expiresOn, lastRenewedOn
**Integration Credential Fields**: apiKey, secret, accountId
**Integration Payment Fields**: cycle, method, amount, currency
**Integration Contact Fields**: telegram, whatsApp, phone, email

### Error Display

Validation errors are displayed inline below the relevant input field:

```jsx
<label className="brandsDetailIntegration_field">
  <span className="brandsDetailIntegration_label">{t("fields.email")}</span>
  <input
    className="brandsDetailIntegration_input"
    value={draft?.email ?? ""}
    onChange={(e) => onDraftChange("email", e.target.value)}
  />
  {error && <span className="brandsDetailIntegration_error">{t(error)}</span>}
</label>
```

## Testing Strategy

### Manual Testing Checklist

Since the project has no automated test framework, all testing is manual:

1. **CSS Convention Compliance**
   - Verify no double-underscore class names in any CSS file
   - Verify no double-underscore className props in any JSX file
   - Check browser console for CSS warnings

2. **Theme Switching**
   - Switch between light and dark themes
   - Verify all brand components use CSS variables correctly
   - Verify no hardcoded colors remain

3. **Localization**
   - Switch between all four languages (en, ar, ru, hy)
   - Verify all UI strings are translated
   - Verify no missing translation keys

4. **Component Functionality**
   - Test adding/removing array items (integrations, phones, logins, contracts, DNS records, renewals)
   - Test edit mode toggle for each section
   - Test save/cancel functionality
   - Test validation error display

5. **Data Persistence**
   - Create a new brand
   - Edit each section and save
   - Reload the page and verify data persists
   - Test linking/unlinking branches and employees

6. **Empty States**
   - Verify empty state messages display correctly
   - Verify "Add" buttons work correctly

7. **Integration Testing**
   - Test inventory integrations array (multiple integrations)
   - Test sales integration object (single integration)
   - Verify shared sub-components work in both contexts

8. **Website Section**
   - Test name servers array
   - Test DNS records array
   - Test renewal history array
   - Test date fields (expiresOn, lastRenewedOn)

9. **Files Section**
   - Test contracts array
   - Test miscellaneous files array
   - Test packaging array
   - Test all file URL fields

10. **Deprecated Functionality**
    - Verify Brand_createBranch is not accessible from UI
    - Verify branch creation is only available in Branches page
    - Verify Relations section only links/unlinks existing branches

### Smoke Test Scenarios

**Scenario 1: Create and Edit Brand**

1. Click "Add brand"
2. Enter name and tagline
3. Click "Create"
4. Edit Basic section
5. Save changes
6. Verify changes persist

**Scenario 2: Add Integration**

1. Open brand detail
2. Navigate to Inventory Integrations section
3. Click "Add integration"
4. Fill in provider, payment, credentials
5. Add registered phone
6. Add login credential
7. Save section
8. Verify integration appears in list

**Scenario 3: Manage Website**

1. Open brand detail
2. Navigate to Website section
3. Enter domain and registrar
4. Add name server
5. Add DNS record
6. Add renewal history entry
7. Save section
8. Verify all fields persist

**Scenario 4: Theme and Locale**

1. Switch to dark theme
2. Verify all brand components render correctly
3. Switch to Arabic locale
4. Verify all strings are translated
5. Switch back to English
6. Verify no layout issues

## Integration Patterns

### Section-to-Orchestrator Integration

Each section component receives props from the orchestrator:

```javascript
// In useBrands.js (orchestrator)
const compProps = {
  Brands_detail_basic_props: {
    draft: draftState.basic,
    onDraftChange: (path, value) => handleDraftChange(`basic.${path}`, value),
    isEditMode: editModes.basic,
    onToggleEdit: () => handleToggleEdit("basic"),
    onSave: () => handleSaveSection("basic"),
    onCancel: () => handleCancelEdit("basic"),
    t,
  },
  // ... other section props
};

// In Brands_detail.jsx
<Brands_detail_basic {...compProps.Brands_detail_basic_props} />;
```

### Sub-Component-to-Section Integration

Sub-components receive a subset of props from their parent section:

```javascript
// In Brands_detail_inventoryIntegrations.jsx
<Brands_detail_integration_row
  integration={draft.inventoryIntegrations[index]}
  index={index}
  isEditMode={editModes[`integration_${index}`]}
  onToggleEdit={() => handleToggleIntegrationEdit(index)}
  onRemove={() => handleRemoveIntegration(index)}
  onDraftChange={(path, value) =>
    onDraftChange(`inventoryIntegrations.${index}.${path}`, value)
  }
  t={t}
/>
```

### Integration Row Composition

The integration row orchestrates all integration sub-components:

```javascript
// In Brands_detail_integration_row.jsx
{
  isEditMode && (
    <>
      <Brands_detail_integration_payment
        draft={integration}
        onDraftChange={onDraftChange}
        t={t}
      />
      <Brands_detail_integration_credentials
        draft={integration}
        onDraftChange={onDraftChange}
        t={t}
      />
      <Brands_detail_integration_contacts
        draft={integration}
        onDraftChange={onDraftChange}
        t={t}
      />
      <Brands_detail_integration_phones
        draft={integration}
        onDraftChange={onDraftChange}
        t={t}
      />
      <Brands_detail_integration_logins
        draft={integration}
        onDraftChange={onDraftChange}
        t={t}
      />
    </>
  );
}
```

### Barrel Export Pattern

All child components are exported from a barrel file:

```javascript
// In _brands_childComps.index.js
export { default as Brands_detail_integration_payment } from "./Brands_detail_integration_payment.jsx";
export { default as Brands_detail_integration_credentials } from "./Brands_detail_integration_credentials.jsx";
export { default as Brands_detail_integration_contacts } from "./Brands_detail_integration_contacts.jsx";
export { default as Brands_detail_integration_phones } from "./Brands_detail_integration_phones.jsx";
export { default as Brands_detail_integration_logins } from "./Brands_detail_integration_logins.jsx";
export { default as Brands_detail_integration_row } from "./Brands_detail_integration_row.jsx";
export { default as Brands_detail_website_nameServers } from "./Brands_detail_website_nameServers.jsx";
export { default as Brands_detail_website_dns } from "./Brands_detail_website_dns.jsx";
export { default as Brands_detail_website_renewal } from "./Brands_detail_website_renewal.jsx";
export { default as Brands_detail_files_contracts } from "./Brands_detail_files_contracts.jsx";
// ... existing exports
```

## Implementation Guidance

### Task Execution Order

The 15 tasks should be executed in this order:

1. **Task 1**: Fix CSS double-underscore convention (all 14 CSS files + JSX)
2. **Task 2**: Remove Brand_createBranch from frontend
3. **Task 3**: Add brand CSS variables to both themes
4. **Task 4**: Complete locale files (all 4 languages)
5. **Task 5**: Add empty-row constants
6. **Task 6**: Create shared integration sub-components (5 components)
7. **Task 7**: Create integration row orchestrator
8. **Task 8**: Expand inventory integrations to full schema
9. **Task 9**: Expand sales integration to full schema
10. **Task 10**: Create website sub-components (3 components)
11. **Task 11**: Expand website section to full schema
12. **Task 12**: Create files contracts sub-component
13. **Task 13**: Expand files section to full schema
14. **Task 14**: Update child components barrel export
15. **Task 15**: Add field validators for expanded fields

### File Modification Summary

**CSS Files to Modify** (14 files):

- Replace all `__` with `_` in class names
- Replace all hardcoded colors with CSS variables

**JSX Files to Modify** (multiple):

- Replace all `__` with `_` in className props
- Expand section components to full schema depth

**New Files to Create** (13 files):

- 5 integration sub-components
- 1 integration row orchestrator
- 3 website sub-components
- 1 files contracts sub-component
- 3 new CSS files

**Configuration Files to Modify**:

- 4 locale JSON files (en, ar, ru, hy)
- 2 theme CSS files (lightTheme.css, darkTheme.css)
- 1 barrel export file (\_brands_childComps.index.js)
- 1 barrel export file (\_brands_helpers.index.js)
- 1 API helpers barrel (\_adminFeatures.index.js)
- 1 hook file (useBrands_apiHelpers.js)
- 1 defaults file (brands_defaults.js)
- 1 validators file (brands_fieldValidators.js)

### Component Size Management

To maintain the 100-120 line limit:

- **Integration sub-components**: Each handles one concern (payment, credentials, contacts, phones, logins)
- **Website sub-components**: Each handles one array type (nameServers, dnsRecords, renewalHistory)
- **Files sub-component**: Contracts array extracted to dedicated component
- **Integration row**: Orchestrates sub-components without implementing their logic

### CSS Organization Strategy

- **Shared styles**: `brands_detail_socials.css` and `brands_detail_emails.css` are imported by multiple components
- **Section-specific styles**: Each section has its own CSS file
- **Sub-component styles**: New sub-components share CSS files by concern (integration, website, files)

### Localization Strategy

- **English as placeholder**: All four locale files use English text initially
- **Identical structure**: All locale files have the same key structure
- **Human translation**: Non-English translations are added later by human translators
- **Key organization**: Keys are grouped by concern (actions, sections, fields, empty, validation, badges)

## Conclusion

This design provides a complete blueprint for implementing the Brands feature completion. The architecture maintains strict separation of concerns, follows established patterns, and ensures maintainability through component size limits and clear interfaces. All 15 tasks are well-defined with specific file paths, code examples, and integration points clearly documented.

The design prioritizes:

- **Consistency**: CSS conventions, component patterns, hook structure
- **Maintainability**: Component size limits, clear separation of concerns
- **Completeness**: Full schema depth, complete localization, comprehensive theming
- **Correctness**: No backend changes, validation at all levels, proper error handling
