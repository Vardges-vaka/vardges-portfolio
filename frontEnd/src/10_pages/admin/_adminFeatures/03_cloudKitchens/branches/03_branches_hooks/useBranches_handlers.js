export const useBranches_handlers = ({ states, setters, apiHelpers, isDebug }) => {
  const { branches, selectedId, formData, isEditing } = states;
  const {
    setBranches,
    setSelectedId,
    setFormData,
    setIsEditing,
    setShowForm,
    setIsLoading,
    setError,
  } = setters;
  const { Branch_add, Branch_getAll, Branch_update, Branch_delete } = apiHelpers;

  const handleFetchAll = async () => {
    setIsLoading(true);
    setError(null);
    const { success, message, data } = await Branch_getAll();
    setIsLoading(false);
    if (success) {
      setBranches(data || []);
    } else {
      setError(message);
    }
  };

  const handleCreate = async () => {
    if (!formData.name?.trim()) {
      setError("Branch name is required");
      return;
    }
    setIsLoading(true);
    setError(null);
    const { success, message, data } = await Branch_add(formData);
    setIsLoading(false);
    if (success) {
      setBranches((prev) => [data, ...prev]);
      setFormData({ name: "" });
      setShowForm(false);
    } else {
      setError(message);
    }
  };

  const handleUpdate = async () => {
    if (!selectedId) return;
    if (!formData.name?.trim()) {
      setError("Branch name is required");
      return;
    }
    setIsLoading(true);
    setError(null);
    const { success, message, data } = await Branch_update(selectedId, formData);
    setIsLoading(false);
    if (success) {
      setBranches((prev) => prev.map((b) => (b._id === selectedId ? data : b)));
      setFormData({ name: "" });
      setIsEditing(false);
      setSelectedId(null);
      setShowForm(false);
    } else {
      setError(message);
    }
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    setError(null);
    const { success, message } = await Branch_delete(id);
    setIsLoading(false);
    if (success) {
      setBranches((prev) => prev.filter((b) => b._id !== id));
      if (selectedId === id) {
        setSelectedId(null);
        setShowForm(false);
        setIsEditing(false);
      }
    } else {
      setError(message);
    }
  };

  const handleSelect = (branch) => {
    setSelectedId(branch._id);
    setFormData({ name: branch.name });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleShowAddForm = () => {
    setSelectedId(null);
    setFormData({ name: "" });
    setIsEditing(false);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setIsEditing(false);
    setSelectedId(null);
    setFormData({ name: "" });
    setError(null);
  };

  const handleSubmit = () => {
    if (isEditing) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };

  return {
    handlers: {
      handleFetchAll,
      handleCreate,
      handleUpdate,
      handleDelete,
      handleSelect,
      handleFormChange,
      handleShowAddForm,
      handleCancelForm,
      handleSubmit,
    },
  };
};
