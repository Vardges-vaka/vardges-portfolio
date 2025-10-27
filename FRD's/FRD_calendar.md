# Feature Requirements Document

## Feature 2: Calendar

---

## 1. Purpose

The Calendar is the time and schedule control center of the back office.

It is not just a calendar. It is where:

- You see your day/hour planning (meetings, EMS sessions, shoots, travel timing).
- You see what’s due (task deadlines, milestones).
- You see what’s coming (countdowns, goals, deliverables).
- You see where you physically are (travel windows, flights).
- You see health/time commitments so you don’t overbook yourself.

The Calendar must support both:

1. Time-blocked events with specific start/end times.
2. Deadline/milestone-based items (things due that day, even if no time).

**Locked decision:**  
The Calendar supports **both** scheduled events and due/milestone overlays. (Option C from Q1)

---

## 2. What Appears on the Calendar

The Calendar must be able to show the following categories of items at the same time:

1. **Manual Events (Custom / Scheduled)**

   - You create these by hand.
   - Example: `Meeting with Careem KAM 16:00–16:30`,  
     `Menu photoshoot 10:00–12:00`,  
     `Branch site visit 19:00–20:00`.

2. **Task Deadlines (from To-Do List)**

   - Any task or subtask that has a `dueDate` appears on that date.
   - This represents “must be done by this day,” not “meeting at 15:00.”

3. **Countdown Targets (from Countdown feature)**

   - Long-term milestones like:
     - `Lose 10 kg by May 1`
     - `Portfolio v1 Launch`
     - `Quit job target date`
   - These are strategic dates, not work sessions.

4. **Health Schedule (EMS / Gym / etc.)**

   - EMS sessions, gym sessions, recovery blocks, etc.
   - Health events are treated like normal events with time, not some special health system.
   - (You chose Option A for health: health sessions = normal calendar events with type "health". No extra muscle group logic.)

5. **Travel / Trips**
   - Whole trips (e.g. `Armenia Trip Dec 28 → Jan 14`)
   - Flights (departure/arrival times)
   - Hotel check-in / check-out
   - Meetings tied to the trip

**Locked decision:**  
All 5 categories MUST be supported and displayable.  
You said “all of them.”

---

## 3. Data Architecture Model

The Calendar works in a **hybrid model** (Option C from Q3):

### 3.1 CalendarEvent collection (stored in DB)

We will have a `CalendarEvent` collection for real scheduled events that YOU create, e.g.:

- `Supplier call 18:00–18:30`
- `Gym 09:00–10:00`
- `EMS 14:00–14:30 Tue/Thu/Sat`
- `Menu Photoshoot 10:00–12:00`
- `Site inspection 19:00`

Also includes:

- Travel-related things (flight departure time, hotel check-in, etc.)
- “I have to physically be somewhere or do something at that time” events

These are persistent objects in the DB.

> Only you can create/edit these events.  
> No other admin (future staff) is allowed to mess with your calendar. (Option A from Q4)

### 3.2 Overlay data (NOT stored as CalendarEvent)

Some things only live in their own feature, and the calendar just _pulls_ them in:

- Task deadlines → pulled from Task model.
- Countdown targets → pulled from Countdown feature.
- Trip ranges / travel windows → pulled from TripPlan.
- Health schedule could also be created as CalendarEvents, but long-range health milestones/goals (like “cutting phase ends X date”) can be pulled from Health/Countdown.

So when the calendar renders, it merges:

- Real scheduled CalendarEvents (DB)
- Synthetic items from other modules (not duplicated, just displayed)

This avoids double-entry and keeps one source of truth per thing.

---

## 4. Who Can Edit

- Only you can create, edit, or delete CalendarEvents.
- In the future, even if you add more admins (e.g. an operations manager, marketing assistant), they cannot modify your calendar.

Why:  
This protects your time. No one else books you without you approving it.

---

## 5. CalendarEvent Fields

When you create a CalendarEvent manually, it needs fields.

You decided:

### 5.1 Required field

- **title** (REQUIRED)  
  Example: `Meeting with Careem KAM`, `EMS Upper Body`, `Menu Photoshoot`

### 5.2 Optional fields

All of the following are OPTIONAL at creation time, but supported in the data model/UI:

- **startDateTime**  
  Example: `2025-11-02 14:00`

- **endDateTime**  
  Example: `2025-11-02 14:30`

- **allDay** (boolean)  
  If true, this is an all-day thing like `Expo Day 1` or `Branch in Abu Dhabi`.

- **location**  
  Physical or virtual.  
  Examples: `Business Bay Kitchen`, `Warehouse freezer`, `Zoom with Elias`, `Call Boutros`.

- **notes / description**  
  Example:

  - `Negotiate CPC cap for November.`
  - `Push them not to apply Careem Plus pricing.`
  - `They hinted 5% commission drop (25 → 20).`

- **linkedEntities / context**  
  Same philosophy as Tasks. You can associate the event with:

  - A Brand (`Vkusno`, `Bloome`, etc.)
  - A Project (`Portfolio Website v1`)
  - Health / body goal (`Lose 10kg`)
  - TripPlan (`Yerevan Visit`)
    So when you view a brand, you can see upcoming events tied to that brand.

- **visibility / privacy**  
  Default is private to you. You could later mark it shareable.
  This mirrors task privacy logic.

- **reminder / alert preference**  
  Example: “remind me 15 min before” / “1 hour before.”  
  Even if we don’t implement push/email notifications in v1, we can still store the preference in the document.

- **attachments**  
  Files relevant to that event.  
  Example: supplier contract draft PDF, shot list for photographer, doctor notes, etc.

- **countdownAttachment**  
  You said: “we can add a countdown as well to that event.”  
  This means the event can optionally display “X days left until [something].”
  Example:
  - Event: `Menu Photoshoot`
  - Countdown: “3 days left until public menu launch”

Summary:  
**title is required, everything else is optional.**

---

## 6. Recurring / Repeating Events

You chose **Full rule-based recurrence.** (Option C from Q6)

That means CalendarEvents can support schedules like:

- “Every Tue/Thu/Sat at 14:00” (EMS)
- “Every weekday at 09:00 except Sunday” (gym)
- “Last Thursday of every month” (inventory review)
- “Every 2nd Tuesday” (supplier pricing check)

Also:

- You must be able to edit ONE occurrence without changing the whole series.
- You must be able to edit the entire series.
- You must be able to cancel just one occurrence.

This is advanced, but you explicitly want it. We’re building it in the spec.

---

## 7. Interaction Model (How you open/edit things)

You chose **side drawer** behavior. (Option A from Q7)

Rules:

- When you click something on the calendar — any item: meeting, deadline, countdown milestone, EMS, etc. — a side panel/drawer opens on the right.
- That drawer shows full details for that item.
- You can edit it from that drawer.
- You do NOT navigate to a different page and lose the calendar view.

This is important because you plan to live in the “today + next 2 days” view. You should never lose context jumping around.

---

## 8. Calendar Views & Default Range

Your required views:

- **Daily view**
- **Weekly view**
- **Monthly view**

But with a twist:

**Default view should NOT be full month.**  
Default should be basically “today and the next 2 days,” a tight window.

So initial load behavior is:

- Show a 3-day window: `today`, `today+1`, `today+2`.
- From there, you can switch tabs/buttons to “Day”, “Week”, or “Month” as needed.

This is not typical, so we note this clearly:  
**Default view = short-range immediate horizon (today + 2 days).**

---

## 9. Layer Control (What you see / filtering)

You chose **toggle filters for layers.** (Option B from Q9)

Meaning:

- The calendar UI has toggles/switches like:
  - `[x] Tasks / Deadlines`
  - `[x] Manual Events / Meetings`
  - `[x] Health / EMS / Gym`
  - `[x] Travel`
  - `[x] Countdowns / Milestones`

You can turn categories off if you don’t want noise.

Example use case:

- If you're in “business mode,” you turn off health/gym/EMS and just look at supplier meetings, negotiation deadlines, delivery ops, etc.
- If you're traveling, you might hide normal work stuff and just view trip schedule so you don’t miss flights/check-ins.

We are NOT doing preset “modes” (like Health Mode / Business Mode). You just toggle visibility manually.

---

## 10. Travel Display Rules

You chose **Option C (Both bar + specific events)** from Q10.

Behavior:

- A trip (e.g. `Armenia Trip Dec 28 → Jan 14`) shows as a continuous multiday bar across the date range on the calendar.
- Inside that range, specific events also appear, like:
  - `DXB → EVN flight 14:35`
  - `Hotel check-in`
  - `Meet supplier in Yerevan on Dec 30`
  - `Return flight`

So you see both:

- The whole “I am traveling during this block”
- And the actual timed items inside that block.

This gives you context (I’m out of Dubai this whole range) and logistics (don’t miss the flight).

---

## 11. Health Integration

You chose **Option A: health is just normal events** from Q11.

Meaning:

- EMS sessions, gym blocks, recovery sessions, etc. are just CalendarEvents with type `"health"` (internally).
- They behave like standard events (start time, end time, recurrence).
- We are NOT doing per-muscle tracking or fatigue-prevention logic in the calendar layer.
- We are NOT forcing you to “mark completed or skipped” inside the calendar in v1.

That stuff (body metrics, EMS planning, weight, etc.) belongs to the Health Monitoring feature (Feature 19) — not the Calendar logic.

Calendar just shows when you planned to do it.

---

## 12. How Calendar Connects With Other Features

### 12.1 Tasks / To-Do List

- Any task or subtask with a `dueDate` appears as a non-time “deadline item” on that day.
- Clicking it in the calendar opens the drawer with task info (title, status, impact, blockers, etc.).
- You can jump status (`todo` → `in_progress` → `review` → `done`) from that drawer.

### 12.2 Countdown

- Countdown goals (e.g. `Lose 10 kg by May 1`) show as milestones on those dates.
- Also, individual CalendarEvents can optionally carry a countdown indicator (“3 days left until X”), because you explicitly said you want to attach countdown behavior to events.

### 12.3 Travel Planner

- TripPlan (e.g. `Armenia Trip Dec 28 → Jan 14`) feeds into calendar automatically.
- Full-range trip bars + individual logistics events (flights, check-ins, etc.).

### 12.4 Health Monitoring

- EMS / gym / health sessions show up as CalendarEvents.
- Recurring EMS rules (Tue/Thu/Sat 14:00) are supported.

---

## 13. Scope: Version 1

### In Scope for v1

- A working Calendar UI with:
  - Toggleable layers: Tasks, Events, Health, Travel, Countdown
  - A default “today + next 2 days” view
  - Daily / Weekly / Monthly switching
  - Click-to-open side drawer for edit/details
- A `CalendarEvent` model that only you can create/edit
- Full recurrence rules for CalendarEvents (daily/weekly/etc., complex patterns, ability to edit single occurrence)
- Travel visualized both as:
  - a multiday bar
  - and detailed events inside the trip
- Deadlines from Tasks and milestones from Countdown are shown automatically (not duplicated data)
- Ability to attach optional countdown info to any CalendarEvent

### Out of Scope for v1

- Notifications / alarms actually firing (email, push, SMS, WhatsApp)
- Sync/import with Google Calendar, Outlook, etc.
- Role-based access to certain calendar layers
- Smart load management like “don’t schedule heavy legs day after EMS legs”
- Automatic analytics like “meeting load per week” or “time spent by brand”

Those can come later.

---

## 14. Summary / Positioning

The Calendar is not just “a calendar.”

It is:

- Your next 48 hours at a glance by default.
- Your commitments (meetings, EMS, shoots, supplier calls).
- Your deadlines (tasks due).
- Your goals (countdowns and milestones).
- Your physical logistics (travel blocks and flights).
- Your body time (health sessions).
- And all of it filterable by layer so you can think like CEO or think like athlete, on demand.

It sits on top of multiple modules (Tasks, Countdown, Travel Planner, Health), and it does not duplicate data.  
The calendar is a live merged view of your life and your business.

This spec is now the official definition of the Calendar feature.


