const isDebug = true;

export const runBrandRequest = async ({
  displayName,
  endpoint,
  properties,
  fallbackMessage,
}) => {
  isDebug && console.log(`${displayName} [CALLED] | ENDPOINT: [${endpoint}]`);

  try {
    const response = await fetch(endpoint, { ...properties });
    const backendResponse = await response.json();

    isDebug && console.log(`${displayName} [BACKEND RESPONSE]`, backendResponse);

    return {
      success: backendResponse.success || false,
      message: backendResponse.message || fallbackMessage,
      data: backendResponse.payload || null,
    };
  } catch (error) {
    isDebug && console.error(`${displayName} [ERROR]`, error);
    return {
      success: false,
      message: error.message || fallbackMessage,
      data: null,
    };
  }
};
