
'use server';
/**
 * @fileOverview This file defines a Genkit flow for a habit coach.
 * It provides a short, actionable tip for sustaining a given habit.
 *
 * - getHabitTip - A function that takes a habit name and returns a tip.
 * - HabitCoachInput - The input type for the function.
 * - HabitCoachOutput - The output type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const HabitCoachInputSchema = z.object({
  habitName: z.string().describe('The name of the positive habit the user has just logged (e.g., "Exercise", "Read Books").'),
});
export type HabitCoachInput = z.infer<typeof HabitCoachInputSchema>;

const HabitCoachOutputSchema = z.object({
  tip: z.string().describe("A short, encouraging, and actionable tip to help the user sustain this habit. Keep it under 25 words."),
});
export type HabitCoachOutput = z.infer<typeof HabitCoachOutputSchema>;

export async function getHabitTip(input: HabitCoachInput): Promise<HabitCoachOutput> {
  return habitCoachFlow(input);
}

const prompt = ai.definePrompt({
  name: 'habitCoachPrompt',
  input: { schema: HabitCoachInputSchema },
  output: { schema: HabitCoachOutputSchema },
  prompt: `You are an encouraging and insightful habit coach for students.

A student has just successfully completed the following positive habit: "{{{habitName}}}"

Your task is to provide one short, simple, and actionable tip to help them maintain this habit in the future. The tip should be encouraging and easy to implement.

Example for 'Exercise': "Great work! To keep the momentum, try putting your workout clothes out the night before. It makes starting easier!"
Example for 'Read Books': "Fantastic! Try keeping your book on your pillow to remind you to read a few pages before sleep."

Keep the tip concise and friendly.
`,
});

const habitCoachFlow = ai.defineFlow(
  {
    name: 'habitCoachFlow',
    inputSchema: HabitCoachInputSchema,
    outputSchema: HabitCoachOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      return { tip: "Keep up the great work on your habits!" };
    }
    return output;
  }
);
