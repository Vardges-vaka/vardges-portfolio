# cK_simulation — Simulation

What-if engine. Forward-looking scenarios across pricing, costs, commissions, and coverage. Non-destructive — reads real data, applies overrides in memory. Will own the (planned) Scenario schema. Sidebar item: Simulation.

## Layout
- `CK_simulation.jsx` — parent component
- `cK_simulation.cinfig.js` — feature config
- `_styles/cK_simulation.css` — feature CSS (CSS-vars only)
- `01_cK_simulation_comps/` — UI components
- `02_cK_simulation_hlpr/` — pure helpers
- `03_cK_simulation_hooks/` — hooks; entry point `useCK_simulation`
- `04_cK_simulation_vld/` — validators
- `05_cK_simulation_cnst/` — constants
- `06_cK_simulation_memo/` — memoized selectors
- `07_cK_simulation_test/` — tests

## Entry hook

```js
const { states, handlers, childProps, t, TOAST } = useCK_simulation();
```

`TOAST` comes from the global notification context — use it for any
success / error / promise toasts in this feature.
