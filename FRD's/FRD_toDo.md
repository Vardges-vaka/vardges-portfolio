# Feature Requirements Document

## Feature 1: To-Do List

---

## 1. Purpose

The To-Do List is the core task management system for the back office of `vardges.me`.

Its job:

- Plan work (business, operational, personal).
- Track execution with discipline.
- Expose blockers and progress honestly.
- Tie work to brands, projects, health, money, etc.

It is used by a single user right now (you), but it must scale to multiple admins in the future without redesign.

This feature is foundational.  
Tasks will surface inside:

- Calendar
- Projects
- Brand dashboards
- Health/Personal dashboard (“Me” section)
- Countdown milestones

The task system is the backbone that connects all other modules.

---

## 2. Core Concepts

### 2.1 Task

A task is something that needs to be done.  
Example: `Create new delivery menu for Vkusno`.

A task can:

- Have subtasks
- Have progress %
- Have deadlines and priority
- Be linked to multiple parts of the system (brand, project, etc.)
- Be private or shared

### 2.2 Subtask

A subtask is also a task. There is no difference in behavior, only in hierarchy.

- Tasks can have subtasks.
- Subtasks can also have their own subtasks.
- Nesting is unlimited depth.

Example:

- Task: `Create Menu`
  - Subtask: `Food Menu`
    - Subtask: `Finalize Starters`
    - Subtask: `Translate to Arabic`
  - Subtask: `Beverage Menu`
  - Subtask: `Photo Shoot`
  - Subtask: `Costing`

Each subtask is not just a text checkbox. It is a real task with status, deadlines, etc.

### 2.3 Progress %

Tasks have a progress percentage, but it’s not random “I think we’re 70% done.”

Progress is driven by completion of subtasks and their weight (impact %).

We are explicitly **not** talking about “project progress” or “brand progress.”  
We are only talking about each task’s own completion %.

---

## 3. Task Structure

Each Task object has the following fields.

### 3.1 Required Fields

#### `title` (string)

Short label/name of the task.  
Example: `Negotiate Deliveroo commission terms`.

#### `status` (enum)

Allowed values:

- `todo`
- `in_progress`
- `blocked`
- `review`
- `done`

Rules:

- `blocked` = cannot proceed due to external issue (waiting for supplier, approval, etc.)
- `review` = work is finished but waiting on sign-off / approval stage
- `done` = fully completed
- A subtask only counts toward parent progress if its status is `done`

### 3.2 Optional Fields

These are not required at creation time, but they exist in the model/UI and can be filled or changed later.

#### `description` / `notes` (string)

Longer explanation of what this task is about, context, instructions to yourself, etc.

#### `priority` (enum)

- `low`
- `medium`
- `high`
- `critical`

Used to filter/sort and highlight urgent work.

#### `dueDate` (DateTime)

A deadline/target completion moment.  
Shows on calendar.  
Used to mark task as overdue if not done by that time.

#### `dueDateEditLimit` (number)

How many times you’re allowed to change the `dueDate`.

- If you don’t explicitly set one, default is 5.
- After you hit the limit, system should block casual changes or force an explicit override (so you can’t keep lying to yourself by forever pushing deadlines forward).

#### `owner` / `assignedTo` (AdminUser ref)

Which admin is responsible.

- Right now: just you.
- Later: you may add ops manager, marketing assistant, kitchen lead, etc.
- This allows filtering by responsible person.

#### `relatedEntities` (array of references)

This task can link to multiple different things at the same time:

- Project(s)
- Brand(s)
- Menu item(s)
- Health goal(s)
- “Image / personal presentation” work
- Future entities (e.g. campaign, supplier, location)
- Even other high-level strategic goals like “Quit job after financial runway is secured”

There is **no limit of one**.  
One task can sit under multiple domains of your life and business.

Example:  
Task: `Lose 10 kg by May`

- Linked to: `Health Project`
- Linked to: `Personal image / presentation`
- Linked to: `Career positioning for a brand role`

#### `dependsOn` (array of Task refs)

Tasks that BLOCK this task.  
This means you realistically cannot complete this task until those other tasks are finished.

Example:  
Task: `Photoshoot for new menu`  
`dependsOn`: `Finalize plating / branding guidelines`

If a blocking task isn’t done, the main task should clearly show it’s waiting.

#### `relatedTo` (array of Task refs)

Soft relationship. No blocking logic.  
Used to group work mentally.

Example:  
Two tasks might both relate to “Careem KAM negotiation” but only one is technically blocking the other.

#### Progress weighting data:

Each subtask has:

- `impactPercent` (number; weight)
- `impactEditLimit` (number; how many times you’re allowed to change that weight)

You define this when you create the subtask.  
This weight represents how much that subtask matters to the parent.

Example for parent task: `Create Menu`  
Subtasks:

- Food Menu → impactPercent = 40
- Beverage Menu → impactPercent = 20
- Photo Shoot → impactPercent = 25
- Costing → impactPercent = 15  
  Total = 100%

The parent’s progress % = sum of impactPercent for subtasks that are fully `done`.

Important:

- A subtask contributes 0% until it is `done`.
- A subtask is NOT considered `done` unless:
  - That subtask itself is `done`,
  - AND all of ITS OWN subtasks are `done`.

So you get no partial credit for “in_progress” or “review.”

#### `attachments` (array)

List of file references, screenshots, PDFs, images, supplier offers, etc.
These will likely reference file objects in your storage system.

#### `commentsEnabled` (boolean)

When you create a task, you pick whether that task supports comments/history or not.

- If `true`:  
  The task has a comment thread. You (and later other admins) can add updates over time.
- If `false`:  
  No comment thread UI appears. Task stays “clean”.

You can toggle this later. The toggle action itself should be tracked.

#### `visibility` (enum but v1 is simple)

We’re starting simple:

- default = private to you
- you can manually flip to share with others later

Reason: you want to be able to onboard a future team member without showing every sensitive task like  
“fire this supplier after next delivery,” or “prepare cost-cut argument against Deliveroo.”

---

## 4. Subtasks / Hierarchy

### 4.1 Unlimited nesting

- A task can contain subtasks.
- A subtask can have its own subtasks.
- No fixed limit on depth.

This is required because real work is layered.  
Example:

- Task: `Create Menu`
  - Subtask: `Food Menu`
    - Subtask: `Finalize Starters`
    - Subtask: `Translate to Arabic`
  - Subtask: `Costing`
    - Subtask: `Collect updated supplier prices`
    - Subtask: `Recalculate gross margin targets`

### 4.2 Weighted progress roll-up

- Each direct subtask of a parent has `impactPercent`.
- The sum of all direct children’s `impactPercent` should equal 100%.
- The parent’s `progress %` = sum of `impactPercent` of children that are fully `done`.

No partial scoring.  
If only 2 of 4 subtasks are done, and their weights total 55%, then parent progress = 55%.

### 4.3 Locking the weights

Every subtask also stores `impactEditLimit`, which limits how many times you can adjust that subtask’s `impactPercent`.

Reason:  
You don’t cheat the system by constantly re-assigning weight to make yourself “look” more done.

---

## 5. Time and Urgency

### 5.1 `priority`

Each task can have a priority:

- `low`
- `medium`
- `high`
- `critical`

Used to sort, filter, and highlight what needs attention.

### 5.2 `dueDate`

A task or subtask can have a due date/time.

Uses:

- Shows up on your Calendar module.
- Decides if something is overdue.
- Allows you to plan bottlenecks around EMS training, supplier meetings, investor prep, etc.

### 5.3 Overdue behavior

If a task has a dueDate, and that date has passed and the task is not `done`, it becomes “overdue.”

System behavior for overdue:

- It should be visible and sortable.
- Overdue tasks should float higher in lists.
- It should NOT spam you automatically.
- The system does not automatically change the task’s status.

### 5.4 Editing deadlines with discipline

When you set `dueDate`, you also set `dueDateEditLimit` (or accept default = 5).

This is a self-honesty tool:

- “I’ve moved this deadline 5 times already” = signal that you’re procrastinating or resisting the task.

This limit logic matches the `impactEditLimit` logic for progress weights.

---

## 6. Visibility / Privacy / Sharing

### Default behavior

- All tasks are private to the creator by default.

### Sharing

- You can manually flip a task to shared later.
- This lets you bring in other people (future kitchen manager, marketing assistant, designer) without giving them access to all private/internal thinking.

No need for complex role-based ACL in v1.  
We keep it “mine” vs “shared.”

---

## 7. Comments / Activity Log

### Comments

- When creating a task, you choose `commentsEnabled: true | false`.

If `true`:

- You can add manual comments over time.
- Each comment stores:
  - text
  - timestamp
  - which admin wrote it (for future multi-user mode)
- This is how you keep a history of negotiations, supplier pricing, KAM discussions, etc.

If `false`:

- That task does not show a comment thread at all (keeps UI clean for simple tasks).

### System auto-log

Not required in v1.  
We are _not_ forced to store automatic events like “status changed from blocked -> in_progress,” unless you want it later.

---

## 8. Filtering, Views, Retrieval

The system must let you slice tasks in powerful ways.  
This matters because you will run the full business and personal life out of this dashboard.

You must be able to filter/sort/search tasks by:

1. **Status**

   - Show only `blocked`, or only `todo`, etc.

2. **Overdue**

   - Show only tasks that are past dueDate and still not `done`.

3. **Priority**

   - Show only `critical` / `high`.

4. **Linked context / relatedEntities**

   - Show only tasks linked to Brand `Vkusno`.
   - Show only tasks linked to Project `Portfolio Website`.
   - Show only tasks linked to a health goal like `Lose 10kg`.

5. **Owner / assignedTo**

   - Show tasks assigned to a specific admin (for future multi-user mode).

6. **Visibility**

   - Show only tasks that are “safe to show on screen share,” so you don’t accidentally expose private notes in front of someone.

7. **Progress %**

   - Show tasks that are stuck at 0%.
   - Show tasks that are halfway (e.g. 40–60% done).
   - Show tasks where one missing subtask is holding everything hostage.

8. **Keyword search**
   - Search in title, description, and (if enabled) comments.
   - Example: search “Careem CPC”, “5% commission drop”, etc.

### Calendar integration

- Tasks with a `dueDate` must appear in a calendar view.
- You should be able to visually see: “This is due today, this is due in 3 days, this explodes next week.”

### Context integration

Tasks should also show up inside other modules:

- Open a **Brand** → see tasks linked to that brand.
- Open a **Project** → see tasks linked to that project.
- Open **Health / Me** → see tasks linked to goals like “Lose 10kg by May.”
- Open a **Menu Item** in Menu Development → see tasks linked to that dish.

Tasks are not isolated.  
Tasks are visible in-place where they matter.

---

## 9. Behavior Rules (Important Logic)

1. A single task can be linked to multiple entities at once  
   (brand, project, health goal, etc.).  
   We are NOT restricting tasks to “belongs to one project.”

2. A task can define dependencies:

   - `dependsOn` = blocking tasks (must be done first)
   - `relatedTo` = same topic but not a blocker

3. Parent progress is calculated ONLY from direct children using `impactPercent`.

4. A subtask’s weight (`impactPercent`) is only counted when that subtask is fully `done` and all of its own children are fully `done`.

5. Each subtask also stores `impactEditLimit`.  
   You can only change its weight a limited number of times.  
   This prevents fake progress gaming.

6. Each task/subtask can have `dueDate` and `dueDateEditLimit`.  
   Same idea: you can’t just endlessly move deadlines without seeing you’re doing it.

7. Overdue tasks are visually obvious, sortable, and can be filtered.

8. Tasks start private. You choose to expose them.

9. `commentsEnabled` is defined per-task.  
   If enabled, you have a manual comment log (timeline of updates, negotiations, money talks, etc.).  
   If disabled, no comments UI shows up.

---

## 10. Scope (Version 1)

### In Scope for v1

- Create task with required fields (`title`, `status`)
- Add/edit optional fields (priority, dueDate, etc.)
- Support multiple linked entities per task
- Create subtasks (unlimited nesting)
- Assign `impactPercent` and `impactEditLimit` to subtasks
- Auto-calculate parent `progress %` based on completed subtasks
- Set `dueDate` and `dueDateEditLimit`
- Track overdue
- Support full status lifecycle (`todo`, `in_progress`, `blocked`, `review`, `done`)
- Private by default, with manual sharing toggle
- Optional per-task comment threads
- Task dependencies (`dependsOn`) and soft relationships (`relatedTo`)
- Filtering/sorting (status, overdue, priority, etc.)
- Show tasks in calendar view
- Show tasks inside other modules (brand, project, health, etc.)

### Out of Scope for v1

- Notifications / email reminders / push alerts
- Recurring tasks / repeating schedules
- AI auto-generation of subtasks
- Automatic Slack/WhatsApp messaging
- Analytics dashboards like “weekly completion rate”
- Role-based granular permissions beyond “private vs shared”

Those can be added later without breaking the core model.

---

## 11. Summary / Positioning

This is not a basic to-do list.

This is:

- Weighted, accountable execution tracking
- With deadline discipline (edit limits)
- With task-to-business linkage
- With dependency understanding
- With controlled exposure for future staff
- With personal/health/career goals built in the same system as restaurant ops

This module is the backbone of the whole back office.  
Other modules (Calendar, Health, Projects, Brands, Menu Development, etc.) will all consume this task layer.

This spec is now considered the official definition of the To-Do List feature.
