import {
  Competitors_tableView_profile,
  Competitors_tableView_cuisineTypes,
  Competitors_tableView_priceRange,
  Competitors_tableView_menu,
  Competitors_tableView_competesWithBrands,
  Competitors_tableView_branches,
  Competitors_tableView_fullView,
  Competitors_tableView_files,
  Competitors_tableView_socials,
  Competitors_tableView_contact,
  Competitors_tableView_reviews,
} from "./competitors_sections/_competitors_tableView_sections.index.js";
import { VALID_VIEW_SESSIONS } from "../../05_competitors_cnst/_competitors_cnst.index.js";
import TemporaryTesting from "../TemporaryTesting.jsx";

const Competitors_sessionSwitch = ({
  states,
  handlers,
  compProps,
  t,
  session,
  temporaryTestingHandler,
}) => {
  if (!session || !VALID_VIEW_SESSIONS.includes(session)) return null;

  return (
    <>
      {/* <TemporaryTesting handler={temporaryTestingHandler} /> */}
      {(session === "view_profile" ||
        session === "view_name" ||
        session === "view_logo") && (
        <Competitors_tableView_profile
          states={states}
          handlers={handlers}
          compProps={compProps}
          t={t}
        />
      )}
      {session === "view_cuisineTypes" && (
        <Competitors_tableView_cuisineTypes
          states={states}
          handlers={handlers}
          compProps={compProps}
          t={t}
        />
      )}
      {session === "view_competesWithBrands" && (
        <Competitors_tableView_competesWithBrands
          states={states}
          handlers={handlers}
          compProps={compProps}
          t={t}
        />
      )}

      {session === "view_reviews" && (
        <Competitors_tableView_reviews
          states={states}
          handlers={handlers}
          compProps={compProps}
          t={t}
        />
      )}

      {session === "view_files" && (
        <Competitors_tableView_files
          states={states}
          handlers={handlers}
          compProps={compProps}
          t={t}
        />
      )}
      {session === "view_socials" && (
        <Competitors_tableView_socials
          states={states}
          handlers={handlers}
          compProps={compProps}
          t={t}
        />
      )}
      {session === "view_contact" && (
        <Competitors_tableView_contact
          states={states}
          handlers={handlers}
          compProps={compProps}
          t={t}
        />
      )}

      {session === "view_priceRange" && (
        <Competitors_tableView_priceRange
          states={states}
          handlers={handlers}
          compProps={compProps}
          t={t}
        />
      )}
      {session === "view_menu" && (
        <Competitors_tableView_menu
          states={states}
          handlers={handlers}
          compProps={compProps}
          t={t}
        />
      )}

      {session === "view_branches" && (
        <Competitors_tableView_branches
          states={states}
          handlers={handlers}
          compProps={compProps}
          t={t}
        />
      )}
      {session === "view_competitor" && (
        <Competitors_tableView_fullView
          states={states}
          handlers={handlers}
          compProps={compProps}
          t={t}
        />
      )}
    </>
  );
};

export default Competitors_sessionSwitch;
