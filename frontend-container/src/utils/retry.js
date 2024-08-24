// src/utils/retry.js

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const axiosRetry = async (
  axiosInstance,
  options,
  retries = 3,
  delayMs = 1000,
) => {
  let error;
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axiosInstance(options);
      return response;
    } catch (err) {
      error = err;
      if (i < retries - 1) {
        await delay(delayMs);
        delayMs *= 2; // Exponential backoff
      }
    }
  }
  throw error;
};
