import { useBranches } from "./03_branches_hooks/_branches_hooks.index.js";
import { Branches_list, Branches_form } from "./01_branches_comps/_branches_comps.index.js";
import "./_styles/branches.css";

const Branches = () => {
  const { compProps } = useBranches();

  return (
    <div className="branches">
      <Branches_list {...compProps.Branches_list_props} />
      <Branches_form {...compProps.Branches_form_props} />
    </div>
  );
};

export default Branches;
