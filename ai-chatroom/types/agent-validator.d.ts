import { Persona } from "./models";
export declare class AgentValidator {
    private PERSONA_DESCRIPTION_MAX_LENGTH;
    /**
     * Runs validations on the agent name and persona.
     * @param name Name of the agent
     * @param persona Persona of the agent
     * @throws Error if the name or persona is invalid
     */
    runValidations(name: string, persona: Persona): void;
    /**
     * Checks if the name is valid and throws an error if it is not.
     * @param name Name of the agent
     * @throws Error if the name is invalid
     */
    private validateName;
    /**
     * Checks if the persona is valid and throws an error if it is not.
     * @param persona persona to validate
     * @throws Error if the persona is invalid
     */
    private validatePersona;
    /**
     * Checks if the persona description is within the limit.
     * @param description Description of the persona
     * @returns true if the description is within the limit
     */
    private isPersonaDescriptionWithinLimit;
}
