# Back Office / Admin Dashboard Architecture

_for: `vardges.me`_

---

## 0. Overview

This document defines how the back office (admin dashboard) of `vardges.me` is structured.

- The dashboard UI is driven by **6 main sections** in the top header.
- Clicking a section opens a **left sidebar** with tools that belong to that section.
- The main content area on the right shows the active tool.
<!-- - There are also two global areas:
  - **Site Content Manager** (edit your public website content)
  - **Settings** -->

This structure is meant to handle ~25 tools without putting 25 icons in the header.

---

## 1. Header Layout

### Header Sections (left → right)
0. **Settings**
1. **Me**
2. **Work & Planning**
3. **Business & Docs**
4. **Assets & Storage**
5. **Tools**
6. **Brand & Product**

Far right (separated from the 6):

- **Settings** (gear icon)

### Behavior

- Each top-level section appears in the header as an **icon** (not text).
- On hover, you see a **tooltip** (e.g. “Work & Planning”).
- On click, a **sidebar slides in from the left** showing all tools inside that section.
- Clicking a tool in the sidebar loads that tool’s page in the main content area.

This keeps the header clean and scalable.

---

## 2. Sections and Their Tools

### 2.1 Work & Planning

**Purpose:** planning, time, tasks, execution.

**Sidebar tools in this section:**

- **To-Do List**

  - Create and manage tasks
  - Status: pending / in-progress / done
  - Priority and due dates

- **Calendar**

  - Events, meetings, deadlines, training sessions, reminders
  - Can show EMS schedule, gym, etc.

- **Countdown**

  - Timers to major targets
  - Examples: exit job date, launch date, travel date

- **Projects**

  - High-level initiatives (ex: “Restaurant Platform MVP”, “Bloome”)
  - Links tasks, deadlines, assets, notes

- **Travel Planner**
  - Store upcoming trip info: flights, stay, visa notes, costs
  - Can connect to Countdown and Calendar

---

### 2.2 Brand & Product

**Purpose:** everything you build for restaurants / clients / brands.

**Sidebar tools in this section:**

- **Cocktail Development Tools**

  - Store cocktail recipes
  - Fields: ingredients, cost per ml, method, glass, garnish, tasting notes
  - Use case: beverage consulting

- **Menu Development Tools**

  - Build and manage menu items
  - Fields: name, description, allergens, cost breakdown, selling price, image
  - Use case: kitchen/menu development and menu engineering

- **Brand Development Tools**

  - Define brand identity
  - Name, tagline, story, positioning, value proposition, tone of voice, target audience

- **Brand Book Development Tools**

  - Generate standardized brand book sections
  - Logo usage rules, color palette, typography, voice guidelines, social media style, photography mood

- **Brand Portfolio Development Tools**

  - Build case studies for clients / investors
  - Before vs after, growth impact, visuals, KPI highlights

---

### 2.3 Business & Docs

**Purpose:** money, reporting, communication, and formal docs.

**Sidebar tools in this section:**

- **Personal Finance Tracker**

  - Track salary, expenses, cash on hand
  - Estimate runway and “quit date” for going full-time on your own work
  - Show monthly burn

- **Email Tools**

  - Send one message to a list of contacts (10 / 20 / 30 people, etc.)
  - For supplier updates, investor updates, internal notices, promo blasts

- **Excel Generator**

  - Auto-generate spreadsheets (.xlsx) from data
  - Examples: cost per dish, branch performance, campaign ROI, commission impact

- **PDF & Image Formatting Tools**

  - Convert images to PDF
  - Compress / rename / stamp with light branding
  - Produce clean shareable docs for partners

- **CV Generator Tool**
  - Turn your experience and role history into different CV formats
  - Hospitality version / business dev version / tech/full-stack version / consulting version

---

### 2.4 Assets & Storage

**Purpose:** store and protect information and media.

**Sidebar tools in this section:**

- **Safe House (Document Vault)**

  - Secure document storage
  - Contracts, IDs, agreements, screenshots, supplier chats, invoices
  - Goal: “I can pull this in 10 seconds when someone asks”

- **Cloud Storage Management**

  - View and organize files across storage (S3 buckets, drives, etc.)
  - Track usage, clean up, rename, structure

- **Password Manager**

  - Store credentials / API keys / access codes
  - Secure, encrypted
  - Not plain text in code or notes

- **Personal Gallery**
  - Central library of media assets
  - Menu photos, product shots, brand visuals, social media material, AI renders
  - Reusable assets you will use in decks, posts, menus, etc.

---

### 2.5 Tools

**Purpose:** general-purpose utilities you reuse a lot.

**Sidebar tools in this section:**

- **QR Code Generator**

  - Generate QR codes for menus, promos, redirects, location pins, etc.

- **Word Counter**

  - Paste text → get word count, character count, optionally token estimate

- **Template Generator Tools**

  - Generate reusable templates (emails, promo texts, supplier outreach, investor update, etc.)
  - “Give me a base draft I can copy”

- **Map Tools**
  - Delivery zones / branch coverage areas / radius mapping
  - Visual editor for drawing and assigning areas
  - Supports restaurant delivery logistics (“this branch covers this polygon”)

---

### 2.6 Me

**Purpose:** you (health, body, thinking assistant).

**Sidebar tools in this section:**

- **Health Monitoring**

  - Track weight, body fat %, lean mass
  - Track water intake / urination notes / caffeine intake / EMS and gym split
  - Track routine consistency

- **AI Personal Assistant**
  - Your private AI chatbot
  - Knows your brands, tone, and logic
  - Uses API keys you control
  - Answers like “you”, not generic support
  - Can generate strategy, copy, descriptions, negotiations, etc.

Note: The AI assistant can also be exposed as a floating chat bubble in the bottom-right of the dashboard UI, so you can invoke it from anywhere.  
Configuration (API keys, system prompt, context) still lives in this “Me” section.

---

---

### 2.8 Settings

**Purpose:** platform-level config.

Global items (not part of the 6 main header buckets):

- **Admin Account**

  - Edit name, email, etc.
  - Password change

- **System Toggles**

- **Site Content Manager (siteManagment)**

**Purpose:** edit what the public website (`vardges.me`) shows without touching code.

**Tools in this module:**

### Site Content Manager

This module is what keeps your public site up to date without editing code.

---

## 3. Navigation Behavior

1. User clicks on a header icon (example: **Brand & Product**).
2. Left sidebar opens with that section’s tools.
3. User clicks a tool in the sidebar (for example: **Menu Development Tools**).
4. Main content pane loads that tool’s UI.

Rules:

- Only one sidebar is visible at a time.

---

## 4. Implementation Notes

- The header should be generated from a config array, not hardcoded.
- on the left corner is the settings icon, theme toggler and language toggler and a logOut botton

- The header uses only icons. Text comes from hover tooltips.

- The Site Content Manager is critical because it lets you update your public-facing portfolio (`vardges.me`) without touching code.

## 5. Directory Structure

here are the directories already created:

// frontEnd\src\10_pages\admin_adminFeatures\00_settings
// frontEnd\src\10_pages\admin_adminFeatures\01_me
// frontEnd\src\10_pages\admin_adminFeatures\02_work_plannig
// frontEnd\src\10_pages\admin_adminFeatures\03_business_docs
// frontEnd\src\10_pages\admin_adminFeatures\04_assets_storage
// frontEnd\src\10_pages\admin_adminFeatures\05_tools
// frontEnd\src\10_pages\admin_adminFeatures\06_brand_product

each directory has the following structure and functionality:

##### All Directories Have **\_[componentNameStartingWIthlowerCase].[subdirectoryName].index.js** files that export everything from that directory

# **00_style**

    -this is where all the directory's css files goes
    -all the css files are named ther calling component but starting with the lowercase letter

# **01[dirName].comps**

    - this is where all the directory's components goes
    -  **[dirName].ChildComps**
        this is where smaller components goes, components that are used by the **01[dirName].comps** components

# **01[dirName].hooks**

    - this is where all the directory's hooks goes, hooks that are used by the **dirName** component
    - The components  main logic goes here

        - **use[ComponentName]_apiHelpers.js**
        this is where all directories api call helpers are, the hook takes a translation object and returns apiHelpers object where we will add all our api call functions.
        it imports base APi helper functions and uses them to make the calls.

        - **use[ComponentName]_states.js**
        this is where we declare all our states of the directory

        - **use[ComponentName]_handlers.js**
        here are all our handlers, such as, handle change, handle submit, etc.
        the hook takes a states, setters, apiHelpers, and etc objects that are passed to the hook by the calling function and returns the handlers object full of handlers.

        - **use[ComponentName].js**
        this is our main hook that imports everything here calls the rest of the hokks or functions and returns props for our components.

- **01[dirName].validators** - this is where all the directory's validators goes

- **01[dirName].helpers** - this is where all the directory's helpers goes

- **01[dirName].constances** - this is where all the directory's constances goes

- **01[dirName].memo**

        here goes all the comparizon logic containing functions, just in case we we need to wrap some of our components into react.memo and we might require some custom comparizon logic.

- **01[dirName].config.jsx**

this is the file that imports the cutom svg strings and exports an arraey of objects for sidebar configs. and takes the t for the translations.

Translations are in the frontEnd\public\locales\ar\sideBar.json file and they are added @i18n configurations. 




#### Than each global directory has **\_[dirName].config.js** file where it exports an object which has properties that define if the console log should run or not, it is also imported in the main component of the directory.

***the components sush header, sidebar and footer you can find here: [frontEnd\src\10_pages\adminPageComps]***


- Keep in mine that most of the components and functionality are just a placeholders
- Some of routing is implimented already



---
