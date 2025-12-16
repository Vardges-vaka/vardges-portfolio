/**
 * Work Page Event Handlers
 */
const useWork_handlers = (states) => {
  const {
    setWorkContent,
    setLoading,
    setError,
    setSelectedProject,
    setSelectedCategory,
  } = states;

  const loadWorkData = (data, profile) => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API call delay
      setTimeout(() => {
        setWorkContent(data);
        setLoading(false);
      }, 100);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return {
    loadWorkData,
    handleProjectClick,
    handleCloseProject,
    handleCategoryChange,
  };
};

export default useWork_handlers;
