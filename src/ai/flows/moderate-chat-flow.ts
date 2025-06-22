
'use server';
/**
 * @fileOverview This file defines a Genkit flow for moderating chat messages.
 * It checks messages for inappropriate content like romance, bullying, or sharing private info.
 *
 * - moderateChat - A function that takes a message and returns a moderation decision.
 * - ModerateChatInput - The input type for the function.
 * - ModerateChatOutput - The output type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ModerateChatInputSchema = z.object({
  message: z.string().describe("The chat message to be moderated."),
});
export type ModerateChatInput = z.infer<typeof ModerateChatInputSchema>;

const ModerateChatOutputSchema = z.object({
  isSafe: z.boolean().describe("Whether the message is safe and appropriate for a student chat room."),
  reason: z.string().optional().describe("If the message is not safe, a brief, student-friendly explanation of why it was blocked (e.g., 'Inappropriate language', 'Sharing private information')."),
});
export type ModerateChatOutput = z.infer<typeof ModerateChatOutputSchema>;

export async function moderateChat(input: ModerateChatInput): Promise<ModerateChatOutput> {
  return moderateChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'moderateChatPrompt',
  input: { schema: ModerateChatInputSchema },
  output: { schema: ModerateChatOutputSchema },
  prompt: `You are Aura, a friendly but firm AI moderator for a student classroom chat. Your top priority is to maintain a safe, positive, and on-topic environment.

Analyze the following message: "{{{message}}}"

Your task is to determine if the message violates any of these rules:
1.  **No Romantic or Inappropriate Advances:** Block any messages that are romantic, suggestive, or overly personal in a way that is inappropriate for a school setting.
2.  **No Sharing Private Information:** Block messages that share or ask for private information like phone numbers, home addresses, personal email addresses, or real-world social media handles.
3.  **No Bullying or Harassment:** Block any form of name-calling, insults, threats, or hate speech.
4.  **No Inappropriate Photos/Media:** While you can't see images, if the text describes or requests inappropriate photos, block it.

If the message is safe, set 'isSafe' to true.
If the message violates ANY of these rules, set 'isSafe' to false and provide a simple, clear 'reason' for the block. Examples for 'reason':
- "Let's keep the chat focused on school-friendly topics."
- "Please avoid sharing personal contact information."
- "Remember to be kind and respectful to everyone."
- "Bullying is not allowed here."

Your response must be in the specified JSON format.
`,
});

const moderateChatFlow = ai.defineFlow(
  {
    name: 'moderateChatFlow',
    inputSchema: ModerateChatInputSchema,
    outputSchema: ModerateChatOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      // Fail safe: if moderation fails, assume it's unsafe.
      return {
        isSafe: false,
        reason: "Could not analyze the message. Please rephrase and try again.",
      };
    }
    return output;
  }
);
