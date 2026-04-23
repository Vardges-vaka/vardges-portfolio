import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import BRANCHES_isDebug from "../branches.config.js";
import {
  useBranches_states,
  useBranches_apiHelpers,
  useBranches_handlers,
} from "./_branches_hooks.index.js";

const isDebug = BRANCHES_isDebug.hooks;

export const useBranches = () => {
  const { t } = useTranslation("branches");
  const { states, setters } = useBranches_states();
  const { apiHelpers } = useBranches_apiHelpers();
  const { handlers } = useBranches_handlers({ states, setters, apiHelpers, isDebug });

  useEffect(() => {
    handlers.handleFetchAll();
  }, []);

  const compProps = {
    Branches_list_props: {
      branches: states.branches,
      isLoading: states.isLoading,
      onSelect: handlers.handleSelect,
      onDelete: handlers.handleDelete,
      onShowAddForm: handlers.handleShowAddForm,
      selectedId: states.selectedId,
      t,
    },
    Branches_form_props: {
      formData: states.formData,
      isEditing: states.isEditing,
      showForm: states.showForm,
      error: states.error,
      isLoading: states.isLoading,
      onChange: handlers.handleFormChange,
      onSubmit: handlers.handleSubmit,
      onCancel: handlers.handleCancelForm,
      t,
    },
  };

  return { t, states, handlers, compProps };
};
