# Feature Requirements Document

## Feature 3: Countdown

---

## 1. Purpose

The Countdown feature is how you apply pressure.

It exists to tell you:

- How long you have left until something critical happens.
- Whether you're actually on pace or lying to yourself.
- Who else needs to feel that pressure with you.

It is used for:

- Personal discipline (weight, money, quitting job).
- Business launches (menu go-live, investor deck, photoshoot dates).
- Brand milestones.

The Countdown module connects to:

- Calendar (milestones and urgency overlays),
- Tasks (launch readiness),
- Health (body goals),
- Finance (savings targets),
- Projects / Brands (go-live deadlines).

---

## 2. Types of Countdowns

Every countdown has a `type`. You defined exactly two types:

### 2.1 `independent`

Personal / standalone.

- Not linked to any brand/project.
- Used for self-control and life targets.
- Examples:
  - `Lose 10 kg by May 1`
  - `Save 30,000 AED by March 1`
  - `Quit job in 96 days`

This type can also cover body metrics (weight, waist), financial runway, discipline milestones, etc.

### 2.2 `specific`

Operational / business.

- Linked to something in the system (brand, project, launch, deliverable).
- Examples:
  - `Vkusno Menu Launch in 12 days` → linked to Brand `Vkusno`
  - `Investor Deck Presentation in 4 days` → linked to Project `Portfolio v1`
  - `Menu Photoshoot Day` → linked to a rollout
  - `Go Live on Deliveroo` for a new brand

This is what you would eventually show to other people (designer, photographer, ops) to put pressure on them.

---

## 3. Fields

When you create a countdown, these are the fields it can have.

### 3.1 Required Fields (must always be provided)

- **title / label**  
  Human-readable name.  
  Examples:

  - `Lose 10 kg`
  - `Quit Job`
  - `Vkusno Menu Launch`

- **targetDate**  
  The deadline. Date or date+time.  
  Drives “X days left.”

- **type**  
  `"independent"` or `"specific"`.

You cannot create a countdown without these three. You must lock in what, when, and what kind of thing it is.

### 3.2 Optional Fields

These are stored in the model but not required on creation:

- **linkedEntities**  
  Only relevant for `type = "specific"`.  
  You can attach the countdown to:

  - Brand(s)
  - Project(s)
  - Menu rollout
  - Investor deck / launch campaign, etc.  
    We are NOT limiting to one. You can link multiple.  
    Example:
  - `Menu Launch` links to both Brand `Vkusno` and Project `New Menu Rollout`.

- **notes / description**  
  Strategy / rules / constraints.  
  Examples:

  - `No carbs after 8pm. EMS Tue/Thu/Sat. Waist < 100cm.`
  - `Soft launch Deliveroo only. DO NOT activate Talabat pricing yet.`
  - `Push CPC cap; force them to not apply Careem Plus rate.`

- **targetMetrics**  
  What “success” means in numbers. Examples:

  - `targetWeightKg = 78`
  - `targetAmountAED = 30000`
  - `targetMenuItemsLive = 12`
  - `targetWaistCm = 100`

- **currentMetrics**  
  Latest known snapshot.  
  Examples:

  - `currentWeightKg = 84`
  - `currentAmountAED = 11250`
  - `currentMenuItemsLive = 9`

  This is for fast display without calculating anything.

- **progressLog**  
  History of progress updates over time. We do NOT just overwrite:
  ```json
  [
    { "date": "2025-10-27", "currentWeightKg": 84.0 },
    { "date": "2025-11-02", "currentWeightKg": 83.2 },
    { "date": "2025-11-09", "currentWeightKg": 82.4 }
  ]
  ```

Money example:
ou chose to store BOTH:

currentMetrics = most recent snapshot,

progressLog = full history of improvement / slip.

This is critical for:

health milestones,

financial runway,

“are we actually prepped for launch or just talking?”

visibility
Who can see this countdown.
Values:

private

team

You choose this per countdown.
It is NOT automatic based on type.
So yes, you can keep a “launch date” hidden until you’re ready to expose it.

showOnCalendar (boolean)
If true, this countdown appears as a milestone on the target date in Calendar.
Example cell in Calendar on that day might show:
Vkusno Menu Launch (12 days left)

attachToCalendarEvents (boolean)
If true, the urgency from this countdown can inject into event views.
Example:
Calendar event: Menu Photoshoot 10:00–12:00
Event drawer also shows: 3 days left until Vkusno Menu Launch

This is what you asked for: “we can attach a countdown to an event to see urgency.”

4. Notifications

Every countdown stores a notifications config.
This config defines if/where/for-who alerts fire.
This applies both to you and (optionally) to other people.

Exact structure (your spec, normalized):
notifications = {
browser: {
isActive: true/false,
receivers: [], // Which users get in-app/browser alerts
},

email: {
isActive: true/false,
receivers: [], // Email addresses
},

SMS: {
isActive: true/false,
receivers: [], // Phone numbers
},

WhatsApp: {
isActive: true/false,
receivers: [], // WhatsApp numbers / IDs
},

Telegram: {
isActive: true/false,
receivers: [], // Telegram usernames/chat IDs
},
};

Key points:

These channels are configurable per countdown.

You can set multiple receivers per channel.

You can edit all this later.

This is how you put pressure on other people, not just yourself.

We will store these settings in v1 even if we don’t fully implement the external delivery logic (SMS/WhatsApp/etc.) yet.

5. Notification Triggers

You said ALL triggers should exist, and you want to be able to enable/disable them per countdown.

We will support these triggers:

Daily reminder

Every day at a set time (e.g. 09:00 Dubai time), send:

12 days left until: Vkusno Menu Launch

Threshold reminder

Fire at specific “time remaining” checkpoints:

30 days left

7 days left

3 days left

1 day left

This can hit other people.
Example: send WhatsApp to photographer when 3 days remain before shoot.

Same-day alert

On the targetDate morning:

TODAY: Investor Deck Presentation

TODAY: Final Deliveroo Menu Push

TODAY: Quit Job Target

Overdue alert

If the targetDate has passed and you didn’t resolve status, send:

Deadline passed for [title]. Mark it: achieved / failed / extended.

This prevents you from just ghosting the objective.

Progress slip alert (only for measurable targets)

If the countdown has numeric targets (weight, money, #items ready),

And based on progressLog you’re off pace,

Send warning.

Example:

Goal: Save 30,000 AED by March 1.

You should be around 20,000 by Feb 10 but you’re at 11,250.

System warns you (and optionally other people) that you’re behind.

All of these:

Are opt-in per countdown.

Are editable later.

6. Progress and Readiness Modes

Each countdown can behave in one of two modes. You decide per countdown.

Mode 1. Time-Only / Reference

Just counts down days.

No readiness %.

You might still link tasks for context, but they don’t drive any math.

Examples:

Quit job in 96 days

Lose 10 kg by May 1 (if you’re just watching the date, not tying it to tasks)

Mode 2. Operational / Readiness-Based

The Countdown becomes an execution gate.

You attach specific tasks from the To-Do List that must be finished before the deadline.

The Countdown calculates “readiness %” from those tasks.

Use case:

Countdown: Vkusno Menu Launch in 12 days

Linked required tasks:

Food Menu

Beverage Menu

Photo Shoot

Costing

If only some are done, Countdown can show Launch Readiness: 55%.

This exposes reality:
“12 days left, 55% ready” → pressure.

You chose BOTH modes:

Some countdowns are just psychological pressure.

Some countdowns are actual launch readiness dashboards.

7. Lifecycle / End State

A countdown does not just disappear when time runs out. You chose the disciplined model.

On or after targetDate, you MUST set an outcome:

achieved

failed

extended

If achieved:

Mark as completed successfully.

Move to history as WIN.

No more notifications.

If failed:

Mark as failed.

Move to history as FAIL.

No more notifications.

If extended:

You must provide a new targetDate.

System logs that you extended.

Countdown stays active.

Notifications continue based on new date.

We track how many times you extended.

This matters for honesty.
Example:

“Menu Launch” slipped 3 times.

“Quit Job Date” moved twice.

“Lose 10kg” got extended once.

We are not silently overwriting. We are building an accountability trail.

8. Visibility / Privacy

Visibility is manually chosen per countdown.

Options:

private
Only you see it.

team
Visible to others (future: designer, marketing assistant, ops manager, etc.).

Important:

Visibility is NOT forced by type.

A specific business launch countdown can still be private until you’re ready to reveal it.

An independent personal goal could technically be exposed if you want to apply pressure to other people (e.g. “I will look like THIS by this date”).

Default behavior for new countdowns (your decision):

visibility = private

9. Calendar Integration

Countdowns feed into the Calendar in two optional ways.

9.1 showOnCalendar

If true, the countdown shows as a milestone on targetDate.

Example in calendar on that date:

Vkusno Menu Launch (12 days left)

Quit Job Target

Lose 10kg Deadline

This is a hard marker.

9.2 attachToCalendarEvents

If true, the countdown can inject urgency messaging into relevant CalendarEvents before the deadline.

Example:

Menu Photoshoot (Nov 2, 10:00–12:00)

When you open it in the calendar drawer, you also see:

3 days left until Vkusno Menu Launch

That’s exactly how you wanted it: the event itself shows the “countdown pressure.”

Default behavior for new countdowns (what you picked):

showOnCalendar = true

attachToCalendarEvents = false

So by default you WILL see the milestone on the calendar day,
but events along the way don’t automatically spam with urgency unless you explicitly enable it.

10. Editing / Discipline

Tasks already enforce discipline with:

impactEditLimit on subtask weights,

dueDateEditLimit on deadlines.

Countdown will enforce discipline using extension tracking.

Rules:

When you hit the targetDate, you MUST mark the countdown achieved, failed, or extended.

If you choose extended, system:

stores the old targetDate in history,

sets the new targetDate,

increments extensionCount.

Result:

You get an honest record of how often you slipped.

You cannot hide from “I moved this deadline 3 times already.”

This is not for vanity. This is to build habits and to show seriousness if you present this system to investors or employers.

11. Scope for Version 1 (v1)
    In Scope

Create countdown with title, targetDate, type

Support both independent and specific

Optional data:

linkedEntities (for specific)

notes / description

targetMetrics

currentMetrics

progressLog (history over time)

visibility (private / team)

showOnCalendar (default true)

attachToCalendarEvents (default false)

Store per-countdown notification config:

browser, email, SMS, WhatsApp, Telegram

each with isActive and receivers

Store per-countdown notification triggers (all configurable):

Daily reminder

Threshold reminders (30 / 7 / 3 / 1 days left)

Same-day alert

Overdue alert (force decision)

Progress slip alert (for measurable goals)

Track whether a countdown is:

time-only (reference mode)

or readiness-based (driven by linked tasks’ completion %)

On/after target date, require achieved / failed / extended

If extended, track how many times you extended and store the new date

Out of Scope (v1)

Actually delivering SMS / WhatsApp / Telegram messages through providers in production (we are only storing that config and logic)

Fancy forecast like “to hit 78kg by May 1 you must average -0.2kg/week” (not required in v1)

Public/external countdown dashboards for clients

Shared multi-user escalation logic (like “auto ping designer if behind pace”)

12. Positioning

Countdown is not a timer. It is an accountability system.

It does three things:

Sets a finish line.

Measures if you’re actually moving toward that finish line.

Forces you to admit what happened when the date hits:

Did you hit it,

Did you fail,

Or are you extending and lying to yourself?

Operationally:

For brands, it becomes a launch readiness tracker.

For body, it becomes fat loss / waist reduction tracking.

For money, it becomes financial runway tracking.

For career, it becomes “exit the job and go full build.”

Visually:

It plugs into Calendar so deadlines are visible in context.

It can inject pressure (“3 days left”) into any event before launch.

It can notify other people so the pain is shared and not just on you.

This spec defines exactly how Countdown works in v1.
