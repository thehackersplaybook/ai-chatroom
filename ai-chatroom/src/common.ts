/**
 * Filename: common.ts
 * Author: Aditya Patange
 * Description: Common utility functions for the MIA tool.
 * ✨ "Simplicity is the soul of efficiency." – Austin Freeman
 */

export class Common {
  /**
   * Checks if the given source string is a valid URL.
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
