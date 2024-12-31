import dotenv from "dotenv";
import { beforeEach } from "vitest";

beforeEach(() => {
  const envConfig = dotenv.config({ path: ".env.test" });
  if (envConfig.error || !envConfig.parsed) {
    throw envConfig.error;
  }
  process.env.OPENAI_API_KEY = envConfig.parsed.OPENAI_API_KEY;
  process.env.ANTHROPIC_API_KEY = envConfig.parsed.ANTHROPIC_API_KEY;
});
