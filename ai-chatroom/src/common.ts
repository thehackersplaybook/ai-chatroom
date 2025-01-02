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
}
