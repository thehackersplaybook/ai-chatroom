/**
 *
 * @file chat-message-builder.ts
 * @author Aditya Patange (AdiPat) <contact.adityapatange@gmail.com>
 * @description Builds chat messages of different specifications.
 * @date December 2024
 * @version 1.0.0
 * @license Affero General Public License v3.0
 * ✨ "We're the pioneers of creation, destruction, and maintainance of software." — H1ckxrBVM808
 *
 */
import { ChatMessage } from "./models";
export declare class ChatMessageBuilder {
    private chatMessage;
    private visbilityExplicitlySet;
    private constructor();
    static build(): ChatMessageBuilder;
    withId(id: string): ChatMessageBuilder;
    withChatroomId(chatroomId: string): ChatMessageBuilder;
    withSender(sender: string): ChatMessageBuilder;
    withMessage(message: string): ChatMessageBuilder;
    withTimestamp(timestamp: number): ChatMessageBuilder;
    withIsVisible(isVisible: boolean): ChatMessageBuilder;
    withType(type: "system" | "agent" | "user"): ChatMessageBuilder;
    buildChatMessage(): ChatMessage;
    agentChatMessage(): ChatMessage;
    systemChatMessage(): ChatMessage;
    userChatMessage(): ChatMessage;
    static buildAgentChatMessage(chatroomId: string, message: string, sender: string): ChatMessage;
    static buildSystemChatMessage(chatroomId: string, message: string, sender: string): ChatMessage;
    static buildUserChatMessage(chatroomId: string, message: string, sender: string): ChatMessage;
    static buildInvisibleSystemChatMessage(chatroomId: string, message: string, sender: string): ChatMessage;
}
