import { Store, Swords } from "lucide-react";

/* ============================================================================
   Menus_ownerIcon — single small icon for the ownerType column in tables.
   - "brand"      → Store icon
   - "competitor" → Swords icon

   Used both in table headers (as a placeholder you can change later) and in
   each row's cell.
============================================================================ */
const Menus_ownerIcon = ({ value, size = 16, title }) => {
  const Icon = value === "competitor" ? Swords : Store;
  return (
    <span
      className="menus_iconHeader"
      title={title || value || "Owner"}
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <Icon size={size} />
    </span>
  );
};

export default Menus_ownerIcon;
