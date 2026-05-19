import Menus_form from "./Menus_form.jsx";

/* ============================================================================
   Menus_form_modifier — thin wrapper around the shared 3-step Menus_form.

   Wire from a host that owns a useMenuModifier() hook:
       const { states, handlers } = useMenuModifier();
       <Menus_form_modifier
         isOpen={states.creating}
         isLoading={states.isLoading}
         onClose={handlers.closeCreate}
         onCreate={async (payload) => {
           // payload = { ownerType, label }
           const res = await handlers.submitCreate(payload);
           return res;
         }}
       />
============================================================================ */

const COPY = {
  entity: "modifier",
  title: "Create a modifier",
  input: "Modifier title",
  hint: "e.g. \"Sauce\"",
};

const Menus_form_modifier = (props) => <Menus_form copy={COPY} {...props} />;

export default Menus_form_modifier;
