/**
 * About Page Event Handlers
 */
const useAbout_handlers = (states) => {
  const { setAboutContent, setLoading, setError } = states;

  const loadAboutData = (data, profile) => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API call delay
      setTimeout(() => {
        setAboutContent(data);
        setLoading(false);
      }, 100);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return {
    loadAboutData,
  };
};

export default useAbout_handlers;
