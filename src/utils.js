export const getSafe = (fun, defaultValue) => {
  try {
    const result = fun();
    return result ? result : defaultValue;
  } catch (error) {
    return defaultValue;
  }
};
