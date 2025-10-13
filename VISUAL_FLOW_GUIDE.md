# 🌿 UrbanGrow - Visual Flow Guide

## Complete User Journey

```
┌─────────────────────────────────────────────────────────────┐
│                     HOMEPAGE (index.html)                    │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   ➕      │  │   📷      │  │   🌱      │  │   🔔      │   │
│  │ Add Plant │  │ Identify  │  │My Garden │  │Reminders │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                      ↑                       │
└──────────────────────────────────────┼──────────────────────┘
                                       │
                    Click "Add a Plant"
                                       ↓
┌─────────────────────────────────────────────────────────────┐
│              ADD PLANT MODAL (Overlay)                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  🌿 Add a Plant to Your Garden              [X]     │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │  🔍 Search: [____________]  Category: [All ▼]       │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐  │   │
│  │  │ 🍅      │ │ 🌿      │ │ 🌱      │ │ 🌶️      │  │   │
│  │  │ Tomato  │ │ Basil   │ │ Mint    │ │ Pepper  │  │   │
│  │  │ Veg     │ │ Herb    │ │ Herb    │ │ Veg     │  │   │
│  │  │ Easy    │ │ Easy    │ │V.Easy   │ │ Moderate│  │   │
│  │  │ [Add]   │ │ [Add]   │ │ [Add]   │ │ [Add]   │  │   │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                                       │
                        Click "Add to My Garden"
                                       ↓
                        ┌──────────────────────┐
                        │  ✅ Tomato Added!    │
                        │  View Garden Now?    │
                        │  [Yes]    [No]       │
                        └──────────────────────┘
                                       │
                              Click "Yes"
                                       ↓
┌─────────────────────────────────────────────────────────────┐
│                  MY GARDEN (my-garden.html)                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  🌿 My Garden                    [➕ Add More Plants]│   │
│  │  You have 3 plants in your garden                   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │ 🌱 Total │ │💧 Need   │ │⏰ Active │ │✅ Watered│      │
│  │    3     │ │ Water: 1 │ │ Alarms:2 │ │ Week: 2  │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
│                                                              │
│  Filter: [All Plants ▼]  Sort: [Date Added ▼]              │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ┌────────────────────────────────────────────┐     │   │
│  │  │         [Tomato Plant Image]               │     │   │
│  │  │                                  💧 Needs   │     │   │
│  │  │                                    Water    │     │   │
│  │  └────────────────────────────────────────────┘     │   │
│  │  Tomato                                              │   │
│  │  Solanum lycopersicum                                │   │
│  │                                                       │   │
│  │  📅 Added: Oct 13, 2025                              │   │
│  │  💧 Last Watered: Oct 14, 8:30 AM                    │   │
│  │  🔔 Next Watering: Oct 15, 8:00 AM                   │   │
│  │  ⏰ Alarm: 8:00 AM (Daily)                           │   │
│  │                                                       │   │
│  │  Watering Status              In 1 day               │   │
│  │  [████████████░░░░░░░░] 60%                          │   │
│  │                                                       │   │
│  │  [💧 Water Now] [⏰ Edit Alarm] [🗑️]                 │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                                       │
                        Click "Set Alarm" or "Edit Alarm"
                                       ↓
┌─────────────────────────────────────────────────────────────┐
│              ALARM MODAL (Overlay)                           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ⏰ Set Watering Alarm                      [X]     │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │  ┌────────┐                                          │   │
│  │  │ [Image]│  Tomato                                  │   │
│  │  │        │  Solanum lycopersicum                    │   │
│  │  │        │  💧 Recommended: Daily                   │   │
│  │  └────────┘                                          │   │
│  │                                                       │   │
│  │  Watering Frequency                                  │   │
│  │  [Daily                                          ▼]  │   │
│  │                                                       │   │
│  │  Alarm Time                                          │   │
│  │  [08:00]                                             │   │
│  │                                                       │   │
│  │  Alarm Sound                                         │   │
│  │  [Default Alarm                                  ▼]  │   │
│  │                                                       │   │
│  │  ☑️ Enable browser notifications                     │   │
│  │                                                       │   │
│  │  ┌─────────────────────────────────────────────┐    │   │
│  │  │ Next Alarm: Oct 15, 2025 at 8:00 AM        │    │   │
│  │  └─────────────────────────────────────────────┘    │   │
│  │                                                       │   │
│  │                        [Cancel] [💾 Save Alarm]      │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                                       │
                          Click "Save Alarm"
                                       ↓
                        ┌──────────────────────┐
                        │ ⏰ Alarm set for     │
                        │    Tomato!           │
                        └──────────────────────┘
                                       │
                        Alarm triggers at 8:00 AM
                                       ↓
┌─────────────────────────────────────────────────────────────┐
│                    ALARM NOTIFICATION                        │
│                                                              │
│  🔊 [Sound Playing: alarm.mp3]                              │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  🔔 Browser Notification                            │   │
│  │  UrbanGrow                                          │   │
│  │  💧 Time to water Tomato!                           │   │
│  │  Don't forget to water your Tomato                  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ⏰ Watering Reminder!                              │   │
│  │                                                      │   │
│  │  Time to water your Tomato!                         │   │
│  │                                                      │   │
│  │                    [OK]                              │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                                       │
                          Click "OK"
                                       ↓
                        Back to My Garden
                                       │
                        Click "💧 Water Now"
                                       ↓
                        ┌──────────────────────┐
                        │ ✅ Tomato has been   │
                        │    watered!          │
                        └──────────────────────┘
                                       │
                        Plant card updates:
                        - Last Watered: Just now
                        - Progress bar resets
                        - "Needs Water" badge removed
                        - Next alarm scheduled
                                       ↓
                        [Cycle Repeats]
```

---

## Feature Breakdown

### 1️⃣ Add Plant Flow
```
Homepage → Click "Add Plant" → Modal Opens
    ↓
Search/Filter Plants → Select Plant → Click "Add"
    ↓
Plant Added to localStorage → Prompt to View Garden
    ↓
Redirect to My Garden (if Yes)
```

### 2️⃣ View Garden Flow
```
My Garden Page Loads
    ↓
Read from localStorage → Display Plants
    ↓
Calculate Statistics → Update Dashboard
    ↓
Apply Filters/Sort → Render Grid
```

### 3️⃣ Water Plant Flow
```
Click "Water Now" Button
    ↓
Update lastWatered Timestamp
    ↓
Save to localStorage
    ↓
Refresh Display → Update Progress Bar
    ↓
Update Statistics
```

### 4️⃣ Set Alarm Flow
```
Click "Set Alarm" → Modal Opens
    ↓
Fill Form (Frequency, Time, Sound)
    ↓
Preview Next Alarm Time
    ↓
Click "Save" → Store in localStorage
    ↓
Schedule Alarm with setTimeout
    ↓
Close Modal → Update Plant Card
```

### 5️⃣ Alarm Trigger Flow
```
Alarm Time Reached
    ↓
Play Sound (alarm.mp3)
    ↓
Show Browser Notification (if enabled)
    ↓
Display Alert Popup
    ↓
Calculate Next Alarm Time
    ↓
Update localStorage → Reschedule
```

---

## Data Flow Diagram

```
┌──────────────────────────────────────────────────────────┐
│                    USER ACTIONS                           │
└────────────┬─────────────────────────────────────────────┘
             │
             ↓
┌──────────────────────────────────────────────────────────┐
│                  JAVASCRIPT LAYER                         │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐         │
│  │plant-modal │  │my-garden.js│  │  Alarms    │         │
│  │    .js     │  │            │  │  System    │         │
│  └────────────┘  └────────────┘  └────────────┘         │
└────────────┬─────────────────────────────────────────────┘
             │
             ↓
┌──────────────────────────────────────────────────────────┐
│                   LOCALSTORAGE                            │
│  ┌────────────────────┐  ┌────────────────────┐         │
│  │    myGarden        │  │   gardenAlarms     │         │
│  │  [Array of Plants] │  │  [Array of Alarms] │         │
│  └────────────────────┘  └────────────────────┘         │
└────────────┬─────────────────────────────────────────────┘
             │
             ↓
┌──────────────────────────────────────────────────────────┐
│                      UI LAYER                             │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐         │
│  │  Modals    │  │Plant Cards │  │Statistics  │         │
│  │            │  │            │  │ Dashboard  │         │
│  └────────────┘  └────────────┘  └────────────┘         │
└──────────────────────────────────────────────────────────┘
```

---

## State Management

### Plant State:
```javascript
{
  id: 1,
  name: "Tomato",
  addedDate: "2025-10-13T19:10:00.000Z",
  lastWatered: "2025-10-14T08:30:00.000Z" | null,
  notes: ""
}
```

### Alarm State:
```javascript
{
  id: 1729012345678,
  plantId: 1,
  frequency: "daily",
  time: "08:00",
  nextAlarm: "2025-10-15T08:00:00.000Z",
  notifications: true
}
```

---

## Component Hierarchy

```
index.html
├── Header
├── Main Content
│   ├── Welcome Section
│   ├── Features Grid
│   │   ├── Add Plant (triggers modal)
│   │   ├── Identify Plant
│   │   ├── My Garden (link to my-garden.html)
│   │   └── Set Reminders
│   └── Info Cards
└── Add Plant Modal
    ├── Search Bar
    ├── Category Filter
    └── Plants Grid
        └── Plant Cards
            └── Add Button

my-garden.html
├── Header
├── Garden Dashboard
│   ├── Statistics Cards
│   ├── Filter/Sort Controls
│   └── Garden Grid
│       └── Garden Plant Cards
│           ├── Plant Info
│           ├── Progress Bar
│           └── Action Buttons
└── Alarm Modal
    ├── Plant Info Display
    ├── Alarm Form
    │   ├── Frequency Select
    │   ├── Time Input
    │   ├── Sound Select
    │   └── Notifications Checkbox
    └── Action Buttons
```

---

## Event Flow

### Page Load Events:
```
DOMContentLoaded
    ↓
Load Garden Data from localStorage
    ↓
Display Plants
    ↓
Update Statistics
    ↓
Check for Upcoming Alarms
    ↓
Schedule Alarm Checks (every 60s)
```

### User Interaction Events:
```
Button Click → Event Handler → Update Data → Save to localStorage → Refresh UI
```

### Alarm Events:
```
setTimeout Triggers
    ↓
Play Sound
    ↓
Show Notification
    ↓
Display Alert
    ↓
Update Next Alarm
    ↓
Save to localStorage
```

---

## Visual Elements Key

### Icons Used:
- 🌿 Plant/Garden
- ➕ Add
- 💧 Water
- ⏰ Alarm
- 🔔 Notification
- 📅 Date
- 🗑️ Delete
- ✅ Success
- ⚠️ Warning
- 🔍 Search
- 📊 Statistics

### Color Coding:
- **Green**: Success, healthy, on-schedule
- **Blue**: Water-related actions
- **Orange**: Alarms, warnings
- **Red**: Urgent, remove, overdue
- **Gray**: Neutral, secondary actions

### Status Indicators:
- **Progress Bar**: Green gradient (0-100%)
- **Needs Water Badge**: Red pulsing
- **Alarm Set**: Green alarm button
- **No Alarm**: Orange alarm button

---

## Responsive Breakpoints

```
Desktop (> 768px)
├── Multi-column grid (3-4 columns)
├── Side-by-side stats
└── Horizontal buttons

Tablet (481px - 768px)
├── 2-column grid
├── Stacked stats (2x2)
└── Horizontal buttons

Mobile (< 480px)
├── Single column
├── Stacked stats (1x4)
└── Vertical buttons
```

---

## Success Indicators

### Visual Feedback:
- ✅ Green checkmark on success
- ⚠️ Red badge for urgent items
- 🔊 Sound plays on alarm
- 📊 Statistics update in real-time
- 🎨 Button color changes on action
- ⏳ Progress bars animate smoothly

---

This visual guide shows the complete flow of the My Garden feature from adding plants to receiving watering reminders! 🌱
