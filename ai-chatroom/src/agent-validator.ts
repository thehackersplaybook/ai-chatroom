/**
 *
 * @file agent-validator.ts
 * @author Aditya Patange (AdiPat) <contact.adityapatange@gmail.com>
 * @description 🚀 Agent Validator: Validates agent details
 * @date December 2024
 * @version 1.0.0
 * @license Affero General Public License v3.0
 * ✨ "The cleaner your abstractions, the easier it is to change your mind." — Anonymous
 *
 */
import { Common } from "./common";
import { Persona } from "./models";

/**
 * AgentValidator: Class to validate agent details
 */
export class AgentValidator {
  private PERSONA_DESCRIPTION_MAX_LENGTH = 256;

  /**
   * Validates the agent details.
   * @param name Name of the agent
   * @param persona Persona of the agent
   * @throws Error if the name or persona is invalid
   */
  public runValidations(name: string, persona: Persona): void {
    this.validateName(name);
    this.validatePersona(persona);
  }

  /**
   * Validates the agent name and throws an error if it is invalid.
   * @param name Name of the agent
   * @throws Error if the name is invalid
   */
  private validateName(name: string): void {
    if (!Common.isValidName(name)) {
      throw new Error("Invalid agent name");
    }
  }

  /**
   * Validates the persona and throws an error if it is invalid.
   * @param persona persona to validate
   * @throws Error if the persona is invalid
   */
  private validatePersona(persona: Persona): void {
    this.validatePersonaName(persona);
    this.validatePersonaDescription(persona);
  }

  /**
   * Validates the persona name and throws an error if it is invalid.
   * @param persona persona to validate
   * @throws Error if the persona name is invalid
   */
  private validatePersonaName(persona: Persona): void {
    const errorMessage = "Invalid persona name";

    if (!Common.isValidName(persona.name)) {
      throw new Error(errorMessage);
    }
  }

  /**
   * Validates the persona description and throws an error if it is invalid.
   * @param persona persona to validate
   * @throws Error if the persona description is invalid
   */
  private validatePersonaDescription(persona: Persona): void {
    if (!this.isPersonaDescriptionWithinLimit(persona.description)) {
      throw new Error("Persona description should be less than 256 characters");
    }
  }

  /**
   * Verifies if the persona description is within the limit.
   * @param description Description of the persona
   * @returns true if the description is within the limit
   */
  private isPersonaDescriptionWithinLimit(description: string): boolean {
    return description.length <= this.PERSONA_DESCRIPTION_MAX_LENGTH;
  }
}
