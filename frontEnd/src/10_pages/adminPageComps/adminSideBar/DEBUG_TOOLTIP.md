# Tooltip Debugging Guide

## Issue
Tooltips not visible when hovering over icons in unpinned state.

## Root Cause (Fixed)
**Color Contrast Issue**: Dark theme had white text on white background (`--admin-tooltip-bg: #ffffff` + `--admin-tool-icon-active-color: #ffffff`)

## Fixes Applied

### 1. **Color/Contrast Fix**
```css
background-color: var(--admin-sidebar-bg);
color: var(--text-primary-color-HOV);
border: 2px solid var(--admin-sidebar-item-active-border);
```

### 2. **Positioning Fix**
```css
position: fixed !important;
left: 82px !important;
z-index: 999999 !important;
```

### 3. **Visibility Enforcement**
```css
display: block !important;
visibility: visible !important;
opacity: 1 !important;
```

### 4. **Debug Logging Added**
- Console log on render showing `isPinned` and `hoveredItem` state
- Console log on hover showing position calculation
- Data attributes on tooltip element for inspection

## Testing Steps

### Step 1: Check Console Logs
Open browser DevTools console and look for:
```
AdminSideBar render - isPinned: true/false hoveredItem: null/number
```

### Step 2: Unpin the Sidebar
1. Click the pin button at the top of the sidebar
2. Verify console shows: `isPinned: false`
3. Verify sidebar width changes to 70px

### Step 3: Hover Over Icons
1. Hover over any sidebar icon
2. Check console for: `Tooltip hover - Index: X Position: {...} isPinned: false`
3. Tooltip should appear to the right of the icon

### Step 4: Inspect Tooltip in DevTools
If tooltip still not visible:
1. Open DevTools Elements tab
2. Hover over icon (keep hovering!)
3. Look for element with class `adminSideBar__tooltip`
4. Check computed styles:
   - `position: fixed`
   - `left: 82px`
   - `top: XXXpx` (should match cursor position)
   - `z-index: 999999`
   - `display: block`
   - `visibility: visible`
   - `opacity: 1`

## Expected Behavior

### Pinned State (Default)
- Sidebar width: 220px
- Shows icons + labels
- No tooltips on hover
- Pin button shows "pinned" icon

### Unpinned State
- Sidebar width: 70px
- Shows only icons
- Tooltips appear on right when hovering
- Pin button shows "unpinned" icon

## Tooltip Appearance

### Light Theme
- Background: `#f8f9fa` (light gray)
- Text: Dark color from theme
- Border: Blue (`#2196f3`)

### Dark Theme
- Background: `#2d2d2d` (dark gray)
- Text: Light color from theme
- Border: Blue (`#4a9eff`)

## Common Issues

### Issue: "Tooltip not showing"
**Check:**
- Is sidebar actually unpinned? (width should be 70px)
- Is mouse actually hovering? (check console logs)
- Is tooltip rendering? (inspect DOM)
- Is tooltip behind something? (check z-index: 999999)

### Issue: "Can't click unpin button"
**Check:**
- Button should be at top of sidebar
- SVG icon should be visible
- Check console for click events

### Issue: "Tooltip shows but can't see text"
**Check:**
- Browser theme (light/dark)
- CSS custom property values
- Computed color values in DevTools

## Quick Test

Add this temporary code to force tooltip visibility:

```jsx
{/* TEMPORARY TEST - Always show first tooltip */}
{true && (
  <div
    className="adminSideBar__tooltip"
    style={{
      top: "100px",
      transform: "translateY(-50%)",
      left: "82px",
    }}>
    <span>TEST TOOLTIP</span>
  </div>
)}
```

If you can see "TEST TOOLTIP", then:
- ✅ CSS is working
- ✅ Positioning is correct
- ❌ Logic issue with hover state or pin state

If you can't see "TEST TOOLTIP", then:
- ❌ CSS issue (z-index, visibility, colors)
- Check browser DevTools computed styles

