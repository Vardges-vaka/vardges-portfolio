import Menus_form from "./Menus_form.jsx";

/* ============================================================================
   Menus_form_category — thin wrapper around the shared 3-step Menus_form.

   Wire from a host that owns a useMenuCategory() hook:
       const { states, handlers } = useMenuCategory();
       <Menus_form_category
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
  entity: "category",
  title: "Create a category",
  input: "Category name",
  hint: "e.g. \"Desserts\"",
};

const Menus_form_category = (props) => <Menus_form copy={COPY} {...props} />;

export default Menus_form_category;
