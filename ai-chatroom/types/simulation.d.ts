/**
 *
 * @file simulator.ts
 * @author Aditya Patange (AdiPat) <contact.adityapatange@gmail.com>
 * @description 🚀 Simulator. Nothing more, nothing less.
 * @date December 2024
 * @version 1.0.0
 * @license Affero General Public License v3.0
 * ✨ "We aren't simulated, we simulate." – Hybrizo SS
 *
 */
import { AI } from "./ai";
export interface Simulator<T> {
    setup: (options: T) => Promise<boolean>;
    simulate: (options: any) => Promise<void>;
}
export interface SimulationInitOptions {
    name?: string;
}
export declare class Simulation {
    private DEFAULT_AI_MODEL;
    private name;
    private id;
    protected ai: AI | null;
    /**
     * Initializes the simulator
     * @param name The name of the simulator
     */
    constructor(options?: SimulationInitOptions);
    /**
     * Initializes the AI model for the simulator
     * @returns Promise<void>
     */
    protected initAI(): Promise<void>;
    /**
     * Returns the name of the simulator
     * @returns The name of the simulator
     */
    getName(): string;
    /**
     * Returns the ID of the simulator
     * @returns The ID of the simulator
     */
    getId(): string;
}
