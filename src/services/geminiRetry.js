export const callGeminiWithRetry = async (fn, retries = 2, delayMs = 1500) => {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      const message = error?.message || "";
      const is503 =
        message.includes("503") ||
        message.includes("UNAVAILABLE") ||
        message.includes("high demand");

      if (is503 && attempt < retries) {
        console.warn(`Gemini overloaded, retrying (${attempt + 1}/${retries})...`);
        await new Promise((res) => setTimeout(res, delayMs * (attempt + 1)));
        continue;
      }

      // Not a 503, or retries exhausted — attach a friendlier message and rethrow
      if (is503) {
        error.friendlyMessage = "The AI is busy right now. Please try again in a moment.";
      }
      throw error;
    }
  }
};