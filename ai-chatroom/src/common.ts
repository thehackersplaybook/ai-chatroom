/**
 *
 * @file common.ts
 * @author Aditya Patange (AdiPat) <contact.adityapatange@gmail.com>
 * @description 🚀 Common utility functions.
 * @date December 2024
 * @version 1.0.0
 * @license Affero General Public License v3.0
 * ✨ "Simplicity is the soul of efficiency." – Austin Freeman
 *
 */
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

/**
 * Common: Utility class for common functions.
 */
export class Common {
  /**
   * Validates if the given source string is a valid URL.
   * @param {string} source - The source string to check.
   * @returns {boolean} True if the source is a valid URL, false otherwise.
   */
  static isUrl(source: string): boolean {
    try {
      new URL(source);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Checks if the given source string is alphanumeric.
   * @param source - The source string to check.
   * @returns True if the source is alphanumeric, false otherwise.
   */
  static isAlphaNumeric(source: string): boolean {
    const alphaNumericRegex = /^[a-zA-Z0-9 ]*$/;
    return alphaNumericRegex.test(source);
  }

  /**
   * Checks if the given name is valid.
   * @param name Name of the entity
   * @returns boolean if the name is valid
   */
  static isValidName(name: string): boolean {
    const alphaNumericRegexWithDots = /^[a-zA-Z0-9. ]*$/;
    return Boolean(name && name.trim()) && alphaNumericRegexWithDots.test(name);
  }

  /**
   * Generates a random name in capital case.
   * @returns A random name generated.
   */
  static generateRandomName(): string {
    return uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
      separator: " ",
      style: "capital",
    });
  }

  /**
   * Validates the name and throws an error if it is invalid.
   * @param name Name of the entity
   * @param errorMessage Error message to throw
   * @throws Error if the name is invalid
   */
  static validateNameWithError(name: string, errorMessage: string): void {
    if (!Common.isValidName(name)) {
      throw new Error(errorMessage);
    }
  }

  /**
   * Checks if the value is null or undefined.
   * @param value Value to check
   * @returns true if the value is null or undefined
   */
  static isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined;
  }

  /**
   * Generates a random integer between the specified range.
   * @param min Minimum value of the range
   * @param max Maximum value of the range
   * @returns A random integer between the specified range
   */
  static generateRandomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
