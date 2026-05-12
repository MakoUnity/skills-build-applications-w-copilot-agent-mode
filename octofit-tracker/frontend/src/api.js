const getApiBaseUrl = () => {
  const explicitBaseUrl = process.env.REACT_APP_API_BASE_URL;
  if (explicitBaseUrl) {
    return explicitBaseUrl.replace(/\/$/, '');
  }

  if (typeof window !== 'undefined') {
    const codespacesMatch = window.location.hostname.match(/^(.*)-3000\.app\.github\.dev$/);
    if (codespacesMatch) {
      return `https://${codespacesMatch[1]}-8000.app.github.dev/api`;
    }
  }

  const codespaceName = process.env.REACT_APP_CODESPACE_NAME || process.env.CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }

  return 'http://localhost:8000/api';
};

export default getApiBaseUrl;