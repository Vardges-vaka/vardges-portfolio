# Admin Sidebar Component

## Overview
A **self-contained**, responsive sidebar component with pin/unpin functionality for the admin dashboard. All state management and styling logic is contained within the `adminSideBar` directory.

## Architecture
- **Self-Contained State**: Pin/unpin state is managed internally within the component
- **CSS Custom Properties**: Communicates width changes to parent layout via `--sidebar-width` CSS variable
- **Persistent Positioning**: Fixed position that remains visible during scroll
- **No External Dependencies**: Parent components only need to pass sidebar items and handlers

## Features

### 1. **Pin/Unpin Functionality**
- **Pinned State**: Shows icons + labels (220px wide on desktop)
- **Unpinned State**: Shows only icons (70px wide on desktop)
- Smooth transitions between states using CSS cubic-bezier animations
- State persists during component lifecycle

### 2. **Active Item Indication**
- Active items have:
  - Different background color (`--admin-sidebar-item-active`)
  - Left border (4px) in active color (`--admin-sidebar-item-active-border`)
  - Highlighted label color (`--admin-sidebar-item-active-color`)
  - Brighter icon appearance

### 3. **Hover Tooltips (Unpinned State)**
- When sidebar is unpinned, hovering over items shows tooltip on the right
- Tooltip includes:
  - Label text
  - Arrow pointer
  - Fade-in animation
  - Proper z-index layering

### 4. **Responsive Design**
- **Desktop**: Full functionality
- **Tablet (≤768px)**: Reduced widths (180px pinned, 60px unpinned)
- **Mobile (≤480px)**: Force unpinned state (60px)

## Props

```javascript
{
  sideBaritems: Array,    // Array of sidebar item objects
  onClick: Function,       // Handler for item clicks
  isActive: Function       // Function to determine active state
}
```

**Note**: `isPinned` and `togglePin` are managed internally - no need to pass them!

## Sidebar Item Structure

```javascript
{
  icon: String,      // Path to icon image
  label: String,     // Item label text
  path: String,      // Navigation path
  isDefault: Boolean // Whether this is default item
}
```

## CSS Variables Used

### Light Theme
- `--admin-sidebar-bg: #f8f9fa`
- `--admin-tool-icon-color: #495057`
- `--admin-tool-icon-hover: #e9ecef`
- `--admin-tool-icon-active: #007bff`
- `--admin-tool-icon-active-color: #ffffff`
- `--admin-tooltip-bg: #212529`
- `--admin-sidebar-item-active: #e3f2fd`
- `--admin-sidebar-item-active-border: #2196f3`
- `--admin-sidebar-item-active-color: #1976d2`

### Dark Theme
- `--admin-sidebar-bg: #2d2d2d`
- `--admin-tool-icon-color: #b0b0b0`
- `--admin-tool-icon-hover: #404040`
- `--admin-tool-icon-active: #4a9eff`
- `--admin-tool-icon-active-color: #ffffff`
- `--admin-tooltip-bg: #ffffff`
- `--admin-sidebar-item-active: #1e3a5f`
- `--admin-sidebar-item-active-border: #4a9eff`
- `--admin-sidebar-item-active-color: #66b3ff`

## Accessibility

- Semantic HTML with proper ARIA labels
- Keyboard navigation support with `tabIndex={0}`
- Focus indicators for keyboard users
- Alt text on all images
- Proper button roles

## Usage Example

```javascript
<AdminSideBar
  sideBaritems={sideBarItems}
  onClick={handleItemClick}
  isActive={checkIfActive}
/>
```

## How It Works

### 1. **Internal State Management**
The sidebar manages its own pin/unpin state using React's `useState`:
```javascript
const [isPinned, setIsPinned] = useState(true);
```

### 2. **Dynamic Width Communication**
The sidebar updates a CSS custom property when pin state changes:
```javascript
useEffect(() => {
  const sidebarWidth = isPinned ? "220px" : "70px";
  document.documentElement.style.setProperty("--sidebar-width", sidebarWidth);
}, [isPinned]);
```

### 3. **Responsive Width Adjustment**
A resize listener automatically adjusts the sidebar width based on viewport:
- **Desktop (>768px)**: 220px (pinned) / 70px (unpinned)
- **Tablet (≤768px)**: 180px (pinned) / 60px (unpinned)  
- **Mobile (≤480px)**: 60px (always collapsed)

### 4. **Layout Integration**
Parent containers can use the `--sidebar-width` CSS variable:
```css
.contentWrapper {
  margin-left: var(--sidebar-width, 220px);
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

## Styling Details

### BEM Naming Convention
- **Block**: `adminSideBar`
- **Elements**: `__pinToggle`, `__pinButton`, `__itemsWrapper`, `__item`, `__itemContent`, `__itemIcon`, `__itemLabel`, `__tooltip`
- **Modifiers**: `--pinned`, `--unpinned`, `--active`

### Animations
- **Width transition**: 0.3s cubic-bezier(0.4, 0, 0.2, 1)
- **Tooltip fade-in**: 0.2s ease
- **Hover effects**: 0.2s ease
- **Transform effects**: Subtle translateX on hover

### Layout
- Fixed position on the left side
- Top offset: 60px (for header)
- Height: calc(100vh - 60px)
- Z-index: 100
- Custom scrollbar for overflow content

