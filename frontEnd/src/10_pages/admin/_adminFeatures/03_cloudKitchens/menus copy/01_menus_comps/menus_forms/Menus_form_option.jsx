import Menus_form from "./Menus_form.jsx";

/* ============================================================================
   Menus_form_option — thin wrapper around the shared 3-step Menus_form.

   Wire from a host that owns a useMenuOption() hook:
       const { states, handlers } = useMenuOption();
       <Menus_form_option
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
  entity: "option",
  title: "Create an option",
  input: "Option name",
  hint: "e.g. \"Strawberry coulis\"",
};

const Menus_form_option = (props) => <Menus_form copy={COPY} {...props} />;

export default Menus_form_option;
