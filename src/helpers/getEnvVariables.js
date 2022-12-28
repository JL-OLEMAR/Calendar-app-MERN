/* eslint-disable no-unused-expressions */
export const getEnvVariables = () => {
  // import.meta.env

  return {
    // ...import.meta.env
    VITE_APP_NODE: import.meta.env.VITE_APP_NODE,
    VITE_APP_API_URL: import.meta.env.VITE_APP_API_URL
  }
}
