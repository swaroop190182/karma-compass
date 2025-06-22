// src/ai/flows/motivational-message.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow to provide motivational messages based on the user's daily karma score.
 *
 * - motivationalMessage - A function that takes a karma score and returns a motivational message.
 * - MotivationalMessageInput - The input type for the motivationalMessage function.
 * - MotivationalMessageOutput - The output type for the motivationalMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MotivationalMessageInputSchema = z.object({
  karmaScore: z.number().describe('The user\'s daily karma score.'),
});
export type MotivationalMessageInput = z.infer<typeof MotivationalMessageInputSchema>;

const MotivationalMessageOutputSchema = z.object({
  message: z.string().describe('A motivational message based on the karma score.'),
});
export type MotivationalMessageOutput = z.infer<typeof MotivationalMessageOutputSchema>;

export async function motivationalMessage(input: MotivationalMessageInput): Promise<MotivationalMessageOutput> {
  return motivationalMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'motivationalMessagePrompt',
  input: {schema: MotivationalMessageInputSchema},
  output: {schema: MotivationalMessageOutputSchema},
  prompt: `You are a motivational coach. Based on the user's daily karma score, provide a short, personalized motivational message. Keep the message concise (under 20 words).

If the karma score is positive, encourage them to continue their positive behaviors.
If the karma score is negative, encourage them to improve their negative ones.

Karma Score: {{{karmaScore}}}
Message:`,
});

const motivationalMessageFlow = ai.defineFlow(
  {
    name: 'motivationalMessageFlow',
    inputSchema: MotivationalMessageInputSchema,
    outputSchema: MotivationalMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
