/**
 * @file index.ts
 * @author Aditya Patange <contact.adityapatange@gmail.com>
 * @description 🚀 MIA: Medical Image Analysis
 * @date December 2024
 * @version 1.0.0
 */

import dotenv from "dotenv";

if (process.env.NODE_ENV == "test") {
  dotenv.config({ path: ".env.test" });
} else {
  dotenv.config();
}

/**
 * Main CLI entry point
 * @internal
 */
export async function main() {
  console.log("Hello, World!");
}
