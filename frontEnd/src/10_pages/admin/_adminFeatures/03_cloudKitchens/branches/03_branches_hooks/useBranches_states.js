import { useState } from "react";

export const useBranches_states = () => {
  const [branches, setBranches] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState({ name: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  return {
    states: { branches, selectedId, formData, isEditing, showForm, isLoading, error },
    setters: {
      setBranches,
      setSelectedId,
      setFormData,
      setIsEditing,
      setShowForm,
      setIsLoading,
      setError,
    },
  };
};
