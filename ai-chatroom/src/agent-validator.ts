import { Common } from "./common";
import { Persona } from "./models";

export class AgentValidator {
  private PERSONA_DESCRIPTION_MAX_LENGTH = 256;

  /**
   * Runs validations on the agent name and persona.
   * @param name Name of the agent
   * @param persona Persona of the agent
   * @throws Error if the name or persona is invalid
   */
  public runValidations(name: string, persona: Persona): void {
    this.validateName(name);
    this.validatePersona(persona);
  }

  /**
   * Checks if the name is valid and throws an error if it is not.
   * @param name Name of the agent
   * @throws Error if the name is invalid
   */
  private validateName(name: string): void {
    if (!Common.isValidName(name)) {
      throw new Error("Invalid agent name");
    }
  }

  /**
   * Checks if the persona is valid and throws an error if it is not.
   * @param persona persona to validate
   * @throws Error if the persona is invalid
   */
  private validatePersona(persona: Persona): void {
    const errorMessage = "Invalid persona name";

    if (!Common.isValidName(persona.name)) {
      throw new Error(errorMessage);
    }

    if (!this.isPersonaDescriptionWithinLimit(persona.description)) {
      throw new Error("Persona description should be less than 256 characters");
    }
  }

  /**
   * Checks if the persona description is within the limit.
   * @param description Description of the persona
   * @returns true if the description is within the limit
   */
  private isPersonaDescriptionWithinLimit(description: string): boolean {
    return description.length <= this.PERSONA_DESCRIPTION_MAX_LENGTH;
  }
}
