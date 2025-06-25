'use server';
/**
 * @fileOverview This file defines a Genkit flow for a habit coach that provides tips to overcome negative habits.
 * It provides unique, actionable tips for a list of negative habits.
 *
 * - getNegativeHabitTips - A function that takes negative habits and returns tips.
 * - NegativeHabitCoachInput - The input type for the function.
 * - NegativeHabitCoachOutput - The output type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const NegativeHabitCoachInputSchema = z.object({
  negativeHabits: z.array(z.string()).describe('A list of negative habits the user has logged (e.g., "Procrastinated", "Ate Junk Food").'),
  date: z.string().describe('The date for which the tips are being generated (YYYY-MM-DD). This helps ensure tip variety day-to-day.'),
});
export type NegativeHabitCoachInput = z.infer<typeof NegativeHabitCoachInputSchema>;

const TipSchema = z.object({
    habitName: z.string().describe('The name of the negative habit.'),
    tip: z.string().describe("A short, encouraging, and actionable tip to help the user overcome this habit. Keep it under 30 words and make it unique for the given date."),
});

const NegativeHabitCoachOutputSchema = z.object({
  tips: z.array(TipSchema).describe("A list of tips, one for each negative habit provided in the input."),
});
export type NegativeHabitCoachOutput = z.infer<typeof NegativeHabitCoachOutputSchema>;

export async function getNegativeHabitTips(input: NegativeHabitCoachInput): Promise<NegativeHabitCoachOutput> {
  return negativeHabitCoachFlow(input);
}

const prompt = ai.definePrompt({
  name: 'negativeHabitCoachPrompt',
  input: { schema: NegativeHabitCoachInputSchema },
  output: { schema: NegativeHabitCoachOutputSchema },
  prompt: `You are a supportive and constructive habit coach for students. Your goal is to provide actionable advice to help them overcome negative habits without being judgmental.

A student has logged the following negative habits for the date: {{{date}}}.

Negative Habits:
{{#each negativeHabits}}
- {{{this}}}
{{/each}}

For each habit, provide one short, simple, actionable, and *unique* tip to help them overcome it. The advice should be different from tips you might have given on other days. Your tone should be encouraging.

Example for 'Procrastinated': "Try the '5-minute rule'. Just start the task for 5 minutes. Often, starting is the hardest part!"
Example for 'Ate Junk Food': "Feeling a snack craving? Try drinking a glass of water first. Sometimes our body mistakes thirst for hunger."

Return your response ONLY in the specified JSON format. Ensure there is one tip for each habit listed.
`,
});

const negativeHabitCoachFlow = ai.defineFlow(
  {
    name: 'negativeHabitCoachFlow',
    inputSchema: NegativeHabitCoachInputSchema,
    outputSchema: NegativeHabitCoachOutputSchema,
  },
  async (input) => {
    if (input.negativeHabits.length === 0) {
        return { tips: [] };
    }
    const { output } = await prompt(input);
    if (!output) {
      return { tips: [] };
    }
    return output;
  }
);
