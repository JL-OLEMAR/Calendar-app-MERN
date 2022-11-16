/* eslint-disable no-unused-expressions */
export const getEnvVariables = () => {
  import.meta.env

  return {
    ...import.meta.env
  }
}
