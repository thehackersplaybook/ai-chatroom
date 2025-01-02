/**
 *
 * @file index.ts
 * @author Aditya Patange (AdiPat) <contact.adityapatange@gmail.com>
 * @description 🚀 Entry point for AI Chatroom
 * @date December 2024
 * @version 1.0.0
 * @license Affero General Public License v3.0
 * ✨ "No work and all play makes you rich, healthy and wise." – Anonymous
 *
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
