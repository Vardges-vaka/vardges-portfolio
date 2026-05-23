import { Store, Swords } from "lucide-react";
import NewMenu_pill from "./NewMenu_pill.jsx";

/* ============================================================================
   NewMenu_ownerBadge — shows whether something belongs to "brand" or
   "competitor" with a matching icon + pill tone.
============================================================================ */
const NewMenu_ownerBadge = ({ value }) => {
  const isBrand = value === "brand";
  return (
    <NewMenu_pill tone={isBrand ? "brand" : "competitor"} title={value}>
      {isBrand ? <Store size={12} /> : <Swords size={12} />}
      {value}
    </NewMenu_pill>
  );
};

export default NewMenu_ownerBadge;
