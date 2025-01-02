/**
 * Common: Utility class for common functions.
 */
export declare class Common {
    /**
     * Validates if the given source string is a valid URL.
     * @param {string} source - The source string to check.
     * @returns {boolean} True if the source is a valid URL, false otherwise.
     */
    static isUrl(source: string): boolean;
    /**
     * Checks if the given source string is alphanumeric.
     * @param source - The source string to check.
     * @returns True if the source is alphanumeric, false otherwise.
     */
    static isAlphaNumeric(source: string): boolean;
    /**
     * Checks if the given name is valid.
     * @param name Name of the entity
     * @returns boolean if the name is valid
     */
    static isValidName(name: string): boolean;
    /**
     * Generates a random name in capital case.
     * @returns A random name generated.
     */
    static generateRandomName(): string;
    /**
     * Validates the name and throws an error if it is invalid.
     * @param name Name of the entity
     * @param errorMessage Error message to throw
     * @throws Error if the name is invalid
     */
    static validateNameWithError(name: string, errorMessage: string): void;
    /**
     * Checks if the value is null or undefined.
     * @param value Value to check
     * @returns true if the value is null or undefined
     */
    static isNullOrUndefined(value: any): boolean;
    /**
     * Generates a random integer between the specified range.
     * @param min Minimum value of the range
     * @param max Maximum value of the range
     * @returns A random integer between the specified range
     */
    static generateRandomInteger(min: number, max: number): number;
}
