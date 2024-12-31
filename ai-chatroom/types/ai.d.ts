/**
 * @file ai.ts
 * @author Aditya Patange <contact.adityapatange@gmail.com>
 * @description This file contains the AI class which provides methods to generate text and objects using a specified language model.
 * ✨ "The only limit to our realization of tomorrow is our doubts of today." - Franklin D. Roosevelt
 * @date December 2024
 * @version 1.0.0
 */
import { generateText, generateObject, LanguageModel, CoreMessage } from "ai";
import { z } from "zod";
interface GenerateTextOptions {
    prompt?: string;
    system?: string;
    messages?: Array<CoreMessage>;
    temperature?: number;
    maxTokens?: number;
    maxRetries?: number;
    topK?: number;
    topP?: number;
    frequencyPenalty?: number;
}
interface GenerateObjectOptions {
    prompt?: string;
    messages?: Array<CoreMessage>;
    schema: z.ZodObject<any>;
    system?: string;
    temperature?: number;
    maxTokens?: number;
    maxRetries?: number;
    topK?: number;
    topP?: number;
    frequencyPenalty?: number;
}
/**
 * AI class provides methods to generate text and objects using a specified language model.
 */
export declare class AI {
    private model;
    /**
     * Constructs an instance of the AI class.
     * @param model - The language model to use.
     */
    constructor(model: LanguageModel);
    /**
     * Generates text using the specified options.
     * @param options - The options for generating text.
     * @returns The generated text.
     */
    generateText(options: GenerateTextOptions): Promise<ReturnType<typeof generateText>>;
    /**
     * Generates an object using the specified options.
     * @param options - The options for generating an object.
     * @returns The generated object.
     */
    generateObject(options: GenerateObjectOptions): Promise<ReturnType<typeof generateObject>>;
    /**
     * Retrieves a language model by its name.
     * @param modelName - The name of the model to retrieve.
     * @returns The language model.
     * @throws An error if the model is not found.
     */
    static getModel(modelName: string): Promise<LanguageModel>;
}
export {};
