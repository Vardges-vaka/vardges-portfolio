# Admin Dashboard Layout Architecture

## Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                        ADMIN HEADER (Fixed)                      │
│                          Height: 60px                            │
└─────────────────────────────────────────────────────────────────┘
┌──────────────┬──────────────────────────────────────────────────┐
│              │                                                   │
│   SIDEBAR    │          CONTENT WRAPPER                         │
│   (Fixed)    │          (Scrollable)                            │
│              │                                                   │
│  [📌 Pin]    │   ← margin-left: var(--sidebar-width)           │
│              │                                                   │
│  ┌────┐      │   Content starts here, never overlaps sidebar   │
│  │ 🏠 │ Home │   Adjusts automatically when sidebar width       │
│  └────┘      │   changes on pin/unpin                          │
│              │                                                   │
│  ┌────┐      │   Scrolls independently of sidebar              │
│  │ 📊 │ Data │                                                   │
│  └────┘      │                                                   │
│              │                                                   │
│  ┌────┐      │                                                   │
│  │ ⚙️  │ Set  │                                                   │
│  └────┘      │                                                   │
│              │                                                   │
│     220px    │                                                   │
│   (pinned)   │                                                   │
│      or      │                                                   │
│    70px      │                                                   │
│  (unpinned)  │                                                   │
└──────────────┴──────────────────────────────────────────────────┘
```

## Pin State Transitions

### Pinned (220px)
```
┌──────────────────┐
│  [📌 Pinned]     │
│                  │
│  ┌────┐          │
│  │ 🏠 │ Home     │
│  └────┘          │
│                  │
│  ┌────┐          │
│  │ 📊 │ Data     │
│  └────┘          │
│                  │
│  ┌────┐          │
│  │ ⚙️  │ Settings│
│  └────┘          │
└──────────────────┘
     220px width
```

### Unpinned (70px)
```
┌────────┐     ┌─────────────┐
│ [📍]   │     │ Tooltip:    │
│        │ ──→ │ Home        │
│  ┌──┐  │     └─────────────┘
│  │🏠│  │ (Shows on hover)
│  └──┘  │
│        │
│  ┌──┐  │
│  │📊│  │
│  └──┘  │
│        │
│  ┌──┐  │
│  │⚙️ │  │
│  └──┘  │
└────────┘
  70px width
```

## CSS Communication Flow

```javascript
// 1. User clicks pin/unpin button
togglePin() → setIsPinned(!isPinned)

// 2. useEffect detects change
useEffect(() => {
  // 3. Calculate width based on viewport + pin state
  const sidebarWidth = calculateWidth(isPinned, window.innerWidth);
  
  // 4. Set CSS custom property
  document.documentElement.style.setProperty("--sidebar-width", sidebarWidth);
}, [isPinned]);

// 5. CSS automatically adjusts content margin
.adminDashboard__contentWrapper {
  margin-left: var(--sidebar-width);  // ✨ Updates automatically
  transition: margin-left 0.3s;       // Smooth animation
}
```

## Responsive Breakpoints

```
Desktop (>768px):
┌──────────────┐
│    Pinned    │  220px
│   Unpinned   │   70px
└──────────────┘

Tablet (≤768px):
┌──────────────┐
│    Pinned    │  180px
│   Unpinned   │   60px
└──────────────┘

Mobile (≤480px):
┌──────────────┐
│Always Unpin  │   60px (forced)
└──────────────┘
```

## Scroll Behavior

```
┌─────────────┬──────────────────────────┐
│             │  Content scrolls ↕       │
│   SIDEBAR   │  Sidebar stays fixed ↔   │
│   (Fixed)   │                          │
│             │  ▼ Scrollable content    │
│   Stays     │  ▼ More content          │
│   Here!     │  ▼ Even more...          │
│             │  ▼ Keeps scrolling...    │
└─────────────┴──────────────────────────┘
```

## Active Item Indication

```
┌──────────────────┐
│  [📌 Pinned]     │
│                  │
│  ┌────┐          │ ← Normal item
│  │ 🏠 │ Home     │
│  └────┘          │
│                  │
│ ┃┌────┐          │ ← Active item
│ ┃│ 📊 │ Data     │   • Blue border (left)
│ ┃└────┘          │   • Blue background
│ ┃                │   • Brighter icon
│                  │   • Blue text
│  ┌────┐          │
│  │ ⚙️  │ Settings│ ← Normal item
│  └────┘          │
└──────────────────┘
```

## Performance Notes

- CSS transitions are hardware-accelerated
- Only sidebar re-renders on pin/unpin (React.memo on parent)
- Resize listener is debounced via React's batching
- Fixed positioning doesn't cause repaints on scroll
- CSS custom properties update instantly

