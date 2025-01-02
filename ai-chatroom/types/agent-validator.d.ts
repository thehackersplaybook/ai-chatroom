import { Persona } from "./models";
/**
 * AgentValidator: Class to validate agent details
 */
export declare class AgentValidator {
    private PERSONA_DESCRIPTION_MAX_LENGTH;
    /**
     * Validates the agent details.
     * @param name Name of the agent
     * @param persona Persona of the agent
     * @throws Error if the name or persona is invalid
     */
    runValidations(name: string, persona: Persona): void;
    /**
     * Validates the agent name and throws an error if it is invalid.
     * @param name Name of the agent
     * @throws Error if the name is invalid
     */
    private validateName;
    /**
     * Validates the persona and throws an error if it is invalid.
     * @param persona persona to validate
     * @throws Error if the persona is invalid
     */
    private validatePersona;
    /**
     * Validates the persona name and throws an error if it is invalid.
     * @param persona persona to validate
     * @throws Error if the persona name is invalid
     */
    private validatePersonaName;
    /**
     * Validates the persona description and throws an error if it is invalid.
     * @param persona persona to validate
     * @throws Error if the persona description is invalid
     */
    private validatePersonaDescription;
    /**
     * Verifies if the persona description is within the limit.
     * @param description Description of the persona
     * @returns true if the description is within the limit
     */
    private isPersonaDescriptionWithinLimit;
}
