#!/usr/bin/env node

/**
 *
 * @file bin.ts
 * @author Aditya Patange (AdiPat) <contact.adityapatange@gmail.com>
 * @description 🚀 Binary executable for AI Chatroom
 * @date December 2024
 * @version 1.0.0
 * @license Affero General Public License v3.0
 * ✨ "Work & chill, no beer to spill." – Anonymous
 *
 */

import { main } from "./index";

/**
 * Checks if the program is the main script
 * @returns boolean true if program is main
 */
const isProgramMain = () => {
  return require.main == module;
};

if (isProgramMain()) {
  main();
}
