import { ChatMessage } from "./chat.model";
import { Persona } from "./persona.model";

export interface Agent {
  getName(): string;
  getId(): string;
  getPersona(): Persona;
  getModel(): string;
  processMessage(message: ChatMessage): Promise<ChatMessage | null>;
}
