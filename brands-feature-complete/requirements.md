# Requirements Document

## Introduction

This document specifies the requirements for completing the Brands feature implementation in the Cloud Kitchens management system. The Brands feature backend is fully implemented and correct. The frontend exists but requires CSS convention fixes, UI expansion to full schema depth, removal of deprecated functionality, complete theming support, and full internationalization coverage across four languages (English, Arabic, Russian, Armenian).

The system follows a strict architectural pattern: backend uses Node 22/Express 5/Mongoose 8 with a routes → validator → controller → service flow. Frontend uses React 19/Vite/i18next with a 4-file hook pattern (states → apiHelpers → handlers → orchestrator) and component-based architecture with a 100-120 line size limit per component.

## Glossary

- **Brand_System**: The frontend React application managing brand data
- **CSS_Convention_Validator**: The system rule enforcing single-underscore class naming
- **Theme_System**: The CSS variable system providing light and dark theme support
- **Locale_System**: The i18next internationalization system managing translations
- **Integration_Component**: A reusable UI component for inventory and sales integration data
- **Section_Component**: A top-level component representing one schema section (basic, files, socials, website, etc.)
- **Child_Component**: A focused sub-component handling specific UI concerns within a section
- **Hook_Layer**: The four-file pattern (states, apiHelpers, handlers, orchestrator) managing component logic
- **Empty_Row_Constant**: A default object shape for adding new array items
- **Field_Validator**: A function validating user input for a specific field
- **Backend_API**: The Express server providing brand CRUD and section management endpoints
- **Schema_Depth**: The complete nested structure of the Brand model including all sub-objects and arrays

## Requirements

### Requirement 1: CSS Class Naming Convention Compliance

**User Story:** As a frontend developer, I want all CSS class names to follow the single-underscore convention, so that the codebase maintains consistent styling patterns and avoids naming conflicts.

#### Acceptance Criteria

1. THE CSS_Convention_Validator SHALL reject any class name containing double-underscore (`__`) patterns
2. WHEN a CSS file contains a root class name, THE Brand_System SHALL use camelCase format (e.g., `brandsDetailSection`)
3. WHEN a CSS file contains an internal class name, THE Brand_System SHALL use single-underscore format (e.g., `brandsDetailSection_header`)
4. THE Brand_System SHALL preserve modifier and state classes using double-dash format (e.g., `brandsDetailSection--collapsed`)
5. WHEN a JSX component references a CSS class, THE Brand_System SHALL use the corrected single-underscore class name
6. THE Brand_System SHALL apply the naming convention to all 14 brand CSS files
7. THE Brand_System SHALL apply the naming convention to all JSX components importing brand CSS files

### Requirement 2: Deprecated API Helper Removal

**User Story:** As a system architect, I want the deprecated `Brand_createBranch` API helper removed from the frontend, so that branch creation is handled exclusively in the Branches feature page.

#### Acceptance Criteria

1. THE Brand_System SHALL NOT export `Brand_createBranch` from the `_adminFeatures.index.js` barrel
2. THE Brand_System SHALL NOT import `Brand_createBranch` in `useBrands_apiHelpers.js`
3. THE Brand_System SHALL NOT include `Brand_createBranch` in the apiHelpers object returned by `useBrands_apiHelpers`
4. THE Brand_System SHALL preserve the `Brand_createBranch.js` file with a deprecation comment
5. THE Brand_System SHALL maintain all other brand API helpers (add, getAll, getOne, update, delete, section operations, link/unlink operations)

### Requirement 3: Theme System CSS Variable Integration

**User Story:** As a UI designer, I want brand-specific CSS variables defined in both light and dark themes, so that the brand feature supports consistent theming without hardcoded colors.

#### Acceptance Criteria

1. THE Theme_System SHALL define a complete set of brand-specific CSS variables in `lightTheme.css`
2. THE Theme_System SHALL define a complete set of brand-specific CSS variables in `darkTheme.css`
3. THE Theme_System SHALL provide CSS variables for card styling (background, border, shadow)
4. THE Theme_System SHALL provide CSS variables for section styling (header background, edit background, edit border)
5. THE Theme_System SHALL provide CSS variables for chip styling (background, border, text, active states)
6. THE Theme_System SHALL provide CSS variables for badge styling (active and inactive states)
7. THE Theme_System SHALL provide CSS variables for integration row styling (background, border)
8. THE Theme_System SHALL provide CSS variables for sub-section styling (background, border)
9. THE Theme_System SHALL provide CSS variables for button styling (delete, add, remove colors and hover states)
10. THE Theme_System SHALL provide CSS variables for input styling (background, border, text)
11. THE Theme_System SHALL provide CSS variables for label and error styling
12. WHEN a brand CSS file contains a hardcoded color value, THE Brand_System SHALL replace it with the corresponding CSS variable reference

### Requirement 4: Complete Internationalization Coverage

**User Story:** As a multilingual user, I want complete translation key coverage across all four supported languages, so that the brand feature displays correctly in English, Arabic, Russian, and Armenian.

#### Acceptance Criteria

1. THE Locale_System SHALL provide identical key structure across all four locale files (en, ar, ru, hy)
2. THE Locale_System SHALL include translation keys for all UI actions (view, edit, add, save, cancel, confirm, delete, etc.)
3. THE Locale_System SHALL include translation keys for all section names (basic, files, socials, website, integrations, legal, relations)
4. THE Locale_System SHALL include translation keys for all sub-section names (payment, credentials, mainContacts, registeredPhones, loginCredentials, contracts, nameServers, dnsRecords, renewalHistory)
5. THE Locale_System SHALL include translation keys for all field labels (name, tagline, provider, domain, apiKey, secret, phone, email, etc.)
6. THE Locale_System SHALL include translation keys for all badge states (active, inactive, yes, no)
7. THE Locale_System SHALL include translation keys for all empty states (noBrands, noIntegrations, noPhones, noLogins, noContracts, etc.)
8. THE Locale_System SHALL include translation keys for all validation messages (required, tooShort, tooLong, invalidEmail, mustBeBoolean, mustBeString)
9. THE Locale_System SHALL use English text as placeholder for non-English locales until human translation is provided
10. THE Locale_System SHALL correct the typo where `"branches"` key incorrectly maps to `"Brands"` value

### Requirement 5: Empty Row Constants for Sub-Arrays

**User Story:** As a frontend developer, I want empty-row constants defined for all new sub-array types, so that adding new array items follows a consistent pattern with proper default values.

#### Acceptance Criteria

1. THE Brand_System SHALL define `EMPTY_REGISTERED_PHONE_ROW` with all required phone fields (branch, phone, isActive, isWhatsAppRegistered, isTelegramRegistered, purpose, notes, registeredAt)
2. THE Brand_System SHALL define `EMPTY_LOGIN_CREDENTIAL_ROW` with all required login fields (belongTo, username, password, email, phoneNumber, type, doesOtpRequired)
3. THE Brand_System SHALL define `EMPTY_CONTRACT_ROW` with all required contract fields (with, label, description, fileUrl, started, ending, fileFormat, isEnded, isTerminated, noticePeriodInDays)
4. THE Brand_System SHALL define `EMPTY_FILE_REF_ROW` with reference and value fields
5. THE Brand_System SHALL define `EMPTY_DNS_RECORD_ROW` with DNS fields (type, name, value, ttl)
6. THE Brand_System SHALL define `EMPTY_RENEWAL_ROW` with renewal fields (renewedOn, amount, currency, card object, transactionId)
7. THE Brand_System SHALL export all empty-row constants from the `_brands_helpers.index.js` barrel
8. WHEN a user adds a new array item, THE Brand_System SHALL initialize it with the corresponding empty-row constant

### Requirement 6: Shared Integration Sub-Components

**User Story:** As a frontend developer, I want reusable integration sub-components, so that inventory integrations and sales integration share consistent UI patterns without code duplication.

#### Acceptance Criteria

1. THE Brand_System SHALL provide a `Brands_detail_integration_payment` component accepting draft, onDraftChange, and t props
2. THE `Brands_detail_integration_payment` component SHALL render input fields for cycle, method, currency, and amount
3. THE Brand_System SHALL provide a `Brands_detail_integration_credentials` component accepting draft, onDraftChange, and t props
4. THE `Brands_detail_integration_credentials` component SHALL render password-type inputs for apiKey and secret, and text input for accountId
5. THE Brand_System SHALL provide a `Brands_detail_integration_contacts` component accepting draft, onDraftChange, and t props
6. THE `Brands_detail_integration_contacts` component SHALL render input fields for telegram, whatsApp, phone, and email with name and position sub-fields
7. THE Brand_System SHALL provide a `Brands_detail_integration_phones` component accepting draft, onDraftChange, and t props
8. THE `Brands_detail_integration_phones` component SHALL render an array of registered phone rows with add/remove functionality
9. THE Brand_System SHALL provide a `Brands_detail_integration_logins` component accepting draft, onDraftChange, and t props
10. THE `Brands_detail_integration_logins` component SHALL render an array of login credential rows with add/remove functionality
11. WHEN a user modifies a field in an integration sub-component, THE Brand_System SHALL call onDraftChange with the correct path and value
12. THE Brand_System SHALL limit each integration sub-component to 100-120 lines maximum

### Requirement 7: Integration Row Orchestrator Component

**User Story:** As a frontend developer, I want an integration row orchestrator component, so that individual integration objects are displayed with consistent read and edit modes.

#### Acceptance Criteria

1. THE Brand_System SHALL provide a `Brands_detail_integration_row` component accepting integration object, index, edit mode flag, and callback props
2. WHEN the integration row is in read mode, THE `Brands_detail_integration_row` component SHALL display provider, startedAt, and payment summary
3. WHEN the integration row is in edit mode, THE `Brands_detail_integration_row` component SHALL render all integration sub-components (payment, credentials, contacts, phones, logins)
4. WHEN a user clicks edit on an integration row, THE Brand_System SHALL toggle that row to edit mode
5. WHEN a user clicks remove on an integration row, THE Brand_System SHALL remove that integration from the array
6. THE `Brands_detail_integration_row` component SHALL use the shared integration sub-components
7. THE `Brands_detail_integration_row` component SHALL import `brands_detail_integration.css` for styling

### Requirement 8: Inventory Integrations Full Schema Expansion

**User Story:** As a brand manager, I want the inventory integrations section to display all schema fields, so that I can manage complete integration data including payment, credentials, contacts, phones, and logins.

#### Acceptance Criteria

1. THE `Brands_detail_inventoryIntegrations` component SHALL render an array of integration objects
2. WHEN the inventoryIntegrations array is empty, THE Brand_System SHALL display the "noIntegrations" empty state message
3. WHEN a user clicks "Add integration", THE Brand_System SHALL append an empty integration object to the array
4. THE `Brands_detail_inventoryIntegrations` component SHALL render each integration using the `Brands_detail_integration_row` component
5. THE `Brands_detail_inventoryIntegrations` component SHALL pass the integration object, index, edit state, and callbacks to each row
6. WHEN a user modifies an integration field, THE Brand_System SHALL update the draft state at the correct array index and field path
7. THE `Brands_detail_inventoryIntegrations` component SHALL support multiple integrations in edit mode simultaneously

### Requirement 9: Sales Integration Full Schema Expansion

**User Story:** As a brand manager, I want the sales integration section to display all schema fields including mainContacts, registeredPhones, and loginCredentials, so that I can manage complete sales integration data.

#### Acceptance Criteria

1. THE `Brands_detail_salesIntegration` component SHALL render a single integration object (not an array)
2. THE `Brands_detail_salesIntegration` component SHALL render the provider, link, consoleLink, and startedAt fields
3. THE `Brands_detail_salesIntegration` component SHALL render the payment sub-component
4. THE `Brands_detail_salesIntegration` component SHALL render the credentials sub-component
5. THE `Brands_detail_salesIntegration` component SHALL render the mainContacts sub-component
6. THE `Brands_detail_salesIntegration` component SHALL render the registeredPhones sub-component (array)
7. THE `Brands_detail_salesIntegration` component SHALL render the loginCredentials sub-component (array)
8. WHEN a user modifies a sales integration field, THE Brand_System SHALL update the draft state at the correct field path
9. WHEN the salesIntegration object is empty, THE Brand_System SHALL display the "noIntegrations" empty state message

### Requirement 10: Website Section Sub-Components

**User Story:** As a brand manager, I want dedicated sub-components for website name servers, DNS records, and renewal history, so that complex website data is organized into focused, maintainable components.

#### Acceptance Criteria

1. THE Brand_System SHALL provide a `Brands_detail_website_nameServers` component accepting draft, onDraftChange, and t props
2. THE `Brands_detail_website_nameServers` component SHALL render a string array with add/remove functionality
3. THE Brand_System SHALL provide a `Brands_detail_website_dns` component accepting draft, onDraftChange, and t props
4. THE `Brands_detail_website_dns` component SHALL render an array of DNS record objects with fields for type, name, value, and ttl
5. THE Brand_System SHALL provide a `Brands_detail_website_renewal` component accepting draft, onDraftChange, and t props
6. THE `Brands_detail_website_renewal` component SHALL render an array of renewal history objects with fields for renewedOn, amount, currency, card details, and transactionId
7. WHEN a user adds a name server, THE Brand_System SHALL append an empty string to the nameServers array
8. WHEN a user adds a DNS record, THE Brand_System SHALL append `EMPTY_DNS_RECORD_ROW` to the dnsRecords array
9. WHEN a user adds a renewal entry, THE Brand_System SHALL append `EMPTY_RENEWAL_ROW` to the renewalHistory array
10. THE Brand_System SHALL limit each website sub-component to 100-120 lines maximum

### Requirement 11: Website Section Full Schema Expansion

**User Story:** As a brand manager, I want the website section to display all schema fields including domain details, name servers, DNS records, dates, and renewal history, so that I can manage complete website data.

#### Acceptance Criteria

1. THE `Brands_detail_website` component SHALL render domain, registrar, whois, status, and dnsStatus fields
2. THE `Brands_detail_website` component SHALL render autoRenew, expiresOn, and lastRenewedOn fields
3. THE `Brands_detail_website` component SHALL render notes field
4. THE `Brands_detail_website` component SHALL render the `Brands_detail_website_nameServers` sub-component
5. THE `Brands_detail_website` component SHALL render the `Brands_detail_website_dns` sub-component
6. THE `Brands_detail_website` component SHALL render the `Brands_detail_website_renewal` sub-component
7. WHEN a user modifies a website field, THE Brand_System SHALL update the draft state at the correct field path
8. THE `Brands_detail_website` component SHALL import `brands_detail_website_sub.css` for sub-component styling

### Requirement 12: Files Section Contracts Sub-Component

**User Story:** As a brand manager, I want a dedicated contracts sub-component in the files section, so that contract data is organized separately from other file types.

#### Acceptance Criteria

1. THE Brand_System SHALL provide a `Brands_detail_files_contracts` component accepting draft, onDraftChange, and t props
2. THE `Brands_detail_files_contracts` component SHALL render an array of contract objects
3. THE `Brands_detail_files_contracts` component SHALL render fields for with, label, description, fileUrl, started, ending, fileFormat
4. THE `Brands_detail_files_contracts` component SHALL render boolean fields for isEnded and isTerminated
5. THE `Brands_detail_files_contracts` component SHALL render noticePeriodInDays field
6. WHEN a user adds a contract, THE Brand_System SHALL append `EMPTY_CONTRACT_ROW` to the contracts array
7. WHEN a user removes a contract, THE Brand_System SHALL remove that contract from the array
8. WHEN the contracts array is empty, THE Brand_System SHALL display the "noContracts" empty state message
9. THE `Brands_detail_files_contracts` component SHALL import `brands_detail_files_contracts.css` for styling
10. THE `Brands_detail_files_contracts` component SHALL be limited to 100-120 lines maximum

### Requirement 13: Files Section Full Schema Expansion

**User Story:** As a brand manager, I want the files section to display all schema fields including logos, branding, legal files, menu files, recipe files, contracts, and miscellaneous files, so that I can manage complete file data.

#### Acceptance Criteria

1. THE `Brands_detail_files` component SHALL render the logos sub-section with highRes, svg, png, jpg, pdf, and ico fields
2. THE `Brands_detail_files` component SHALL render the branding sub-section with brandBook, brandOverview, and packaging array
3. THE `Brands_detail_files` component SHALL render the legalFiles sub-section with vatCertificate, tradeLicense, and tradeMark fields
4. THE `Brands_detail_files` component SHALL render the menuFiles sub-section with menuPdf, menuExcel, and menuWord fields
5. THE `Brands_detail_files` component SHALL render the recipeFiles sub-section with recipePdf, recipeExcel, and recipeWord fields
6. THE `Brands_detail_files` component SHALL render the `Brands_detail_files_contracts` sub-component
7. THE `Brands_detail_files` component SHALL render the miscellaneous sub-section as an array of file reference objects
8. WHEN a user adds a packaging item, THE Brand_System SHALL append `EMPTY_FILE_REF_ROW` to the packaging array
9. WHEN a user adds a miscellaneous file, THE Brand_System SHALL append `EMPTY_FILE_REF_ROW` to the miscellaneous array
10. WHEN a user modifies a file field, THE Brand_System SHALL update the draft state at the correct field path

### Requirement 14: Child Components Barrel Export

**User Story:** As a frontend developer, I want all new child components exported from the barrel file, so that components can be imported using the standard barrel pattern.

#### Acceptance Criteria

1. THE Brand_System SHALL export `Brands_detail_integration_payment` from `_brands_childComps.index.js`
2. THE Brand_System SHALL export `Brands_detail_integration_credentials` from `_brands_childComps.index.js`
3. THE Brand_System SHALL export `Brands_detail_integration_contacts` from `_brands_childComps.index.js`
4. THE Brand_System SHALL export `Brands_detail_integration_phones` from `_brands_childComps.index.js`
5. THE Brand_System SHALL export `Brands_detail_integration_logins` from `_brands_childComps.index.js`
6. THE Brand_System SHALL export `Brands_detail_integration_row` from `_brands_childComps.index.js`
7. THE Brand_System SHALL export `Brands_detail_website_nameServers` from `_brands_childComps.index.js`
8. THE Brand_System SHALL export `Brands_detail_website_dns` from `_brands_childComps.index.js`
9. THE Brand_System SHALL export `Brands_detail_website_renewal` from `_brands_childComps.index.js`
10. THE Brand_System SHALL export `Brands_detail_files_contracts` from `_brands_childComps.index.js`
11. THE Brand_System SHALL maintain all existing child component exports

### Requirement 15: Field Validators for Expanded Fields

**User Story:** As a frontend developer, I want field validators for all expanded fields, so that user input is validated before submission to the backend.

#### Acceptance Criteria

1. THE Brand_System SHALL provide validators for all registered phone fields (phone, branch, purpose, registeredAt)
2. THE Brand_System SHALL provide validators for all login credential fields (username, password, email, phoneNumber, type)
3. THE Brand_System SHALL provide validators for all contract fields (with, label, fileUrl, started, ending, noticePeriodInDays)
4. THE Brand_System SHALL provide validators for all DNS record fields (type, name, value, ttl)
5. THE Brand_System SHALL provide validators for all renewal fields (renewedOn, amount, currency, transactionId)
6. THE Brand_System SHALL provide validators for all website date fields (expiresOn, lastRenewedOn)
7. THE Brand_System SHALL provide validators for all integration credential fields (apiKey, secret, accountId)
8. THE Brand_System SHALL provide validators for all integration payment fields (cycle, method, amount, currency)
9. THE Brand_System SHALL provide validators for all integration contact fields (telegram, whatsApp, phone, email)
10. WHEN a field value is invalid, THE Field_Validator SHALL return an error message using the appropriate locale key (required, tooShort, tooLong, invalidEmail, mustBeBoolean, mustBeString)
11. WHEN a field value is valid, THE Field_Validator SHALL return null or undefined
12. THE Brand_System SHALL validate email fields using a standard email regex pattern
13. THE Brand_System SHALL validate boolean fields to ensure they are true or false
14. THE Brand_System SHALL validate string fields to ensure minimum and maximum length constraints

### Requirement 16: CSS Styling for New Components

**User Story:** As a UI designer, I want dedicated CSS files for new component groups, so that styling is organized and maintainable.

#### Acceptance Criteria

1. THE Brand_System SHALL provide `brands_detail_integration.css` with styles for all integration sub-components
2. THE `brands_detail_integration.css` file SHALL define styles for integration sub-section containers
3. THE `brands_detail_integration.css` file SHALL define styles for integration grid layouts
4. THE `brands_detail_integration.css` file SHALL define styles for integration field labels and inputs
5. THE `brands_detail_integration.css` file SHALL use CSS variables from the theme system (no hardcoded colors)
6. THE Brand_System SHALL provide `brands_detail_website_sub.css` with styles for website sub-components
7. THE `brands_detail_website_sub.css` file SHALL define styles for name server, DNS, and renewal arrays
8. THE `brands_detail_website_sub.css` file SHALL use CSS variables from the theme system (no hardcoded colors)
9. THE Brand_System SHALL provide `brands_detail_files_contracts.css` with styles for the contracts sub-component
10. THE `brands_detail_files_contracts.css` file SHALL define styles for contract row layouts
11. THE `brands_detail_files_contracts.css` file SHALL use CSS variables from the theme system (no hardcoded colors)
12. THE Brand_System SHALL follow the single-underscore naming convention in all new CSS files

### Requirement 17: Integration Testing and Wiring Audit

**User Story:** As a QA engineer, I want a final wiring audit and smoke tests, so that all components are correctly integrated and the feature works end-to-end.

#### Acceptance Criteria

1. WHEN a user loads the brands page, THE Brand_System SHALL fetch and display all brands without errors
2. WHEN a user creates a new brand, THE Brand_System SHALL send the correct API request and update the UI
3. WHEN a user edits a brand section, THE Brand_System SHALL enter edit mode and display all fields
4. WHEN a user saves a brand section, THE Brand_System SHALL send the correct API request with sanitized data
5. WHEN a user adds an array item (integration, phone, login, contract, DNS record, renewal), THE Brand_System SHALL append the correct empty-row constant
6. WHEN a user removes an array item, THE Brand_System SHALL remove it from the draft state
7. WHEN a user switches between light and dark themes, THE Brand_System SHALL apply the correct CSS variables
8. WHEN a user switches between languages (en, ar, ru, hy), THE Brand_System SHALL display the correct translations
9. WHEN a user submits invalid data, THE Brand_System SHALL display validation error messages
10. WHEN a user navigates between brands, THE Brand_System SHALL load the correct brand data
11. THE Brand_System SHALL NOT display any console errors during normal operation
12. THE Brand_System SHALL NOT display any CSS class name warnings (double-underscore violations)
13. THE Brand_System SHALL NOT reference the deprecated `Brand_createBranch` API helper
14. THE Brand_System SHALL correctly sync brand-branch relationships when linking/unlinking branches
15. THE Brand_System SHALL display all expanded fields in inventory integrations, sales integration, website, and files sections
