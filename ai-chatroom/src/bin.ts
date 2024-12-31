#!/usr/bin/env node

/**
 * @file bin.ts
 * @description CLI entry point for MIA
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
