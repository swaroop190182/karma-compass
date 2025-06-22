'use server';
/**
 * @fileOverview This file defines a Genkit flow for Aura, the AI Student Coach.
 * It analyzes a student's planner tasks and provides personalized feedback.
 *
 * - getAuraFeedback - A function that takes planner tasks and returns coaching insights and suggestions.
 * - AuraCoachInput - The input type for the function.
 * - AuraCoachOutput - The output type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PlannerTaskSchema = z.object({
  id: z.string(),
  time: z.string(),
  task: z.string(),
  priority: z.enum(['High', 'Medium', 'Low']),
  status: z.enum(['Done', 'Not Done', 'Skipped']),
});

const AuraCoachInputSchema = z.object({
  tasks: z.array(PlannerTaskSchema).describe("The list of the student's tasks for the day."),
});
export type AuraCoachInput = z.infer<typeof AuraCoachInputSchema>;

const AuraCoachOutputSchema = z.object({
  insights: z.array(z.string().describe("A key observation or insight about the student's productivity or habits based on their tasks.")).describe('A list of insights about the student\'s day.'),
  suggestions: z.array(z.string().describe("A concrete, actionable suggestion for the student to improve or continue their good habits.")).describe('A list of personalized suggestions.'),
});
export type AuraCoachOutput = z.infer<typeof AuraCoachOutputSchema>;

export async function getAuraFeedback(input: AuraCoachInput): Promise<AuraCoachOutput> {
  return auraCoachFlow(input);
}

const prompt = ai.definePrompt({
  name: 'auraCoachPrompt',
  input: { schema: AuraCoachInputSchema },
  output: { schema: AuraCoachOutputSchema },
  prompt: `You are Aura, a friendly, positive, and insightful AI wellness coach for students. Your goal is to provide personalized, encouraging, and actionable feedback based on their daily planner.

Analyze the provided list of tasks, paying close attention to what was completed ('Done'), what was skipped, and the priorities of the tasks.

1.  **Generate Insights:** Identify positive patterns to reinforce (e.g., "You tackled all your high-priority tasks!") or areas for reflection (e.g., "It looks like the afternoon was a bit challenging."). Frame these as neutral, helpful observations. Generate 1-2 insights.
2.  **Generate Suggestions:** Provide gentle, constructive, and actionable tips. If they did well, suggest how to maintain momentum. If they skipped tasks, suggest a strategy to try tomorrow (e.g., "Maybe try breaking a big task into smaller steps?"). Generate 1-2 suggestions.

Your tone should always be supportive and non-judgmental. You are a coach, not a critic. Focus on building good habits and fostering a growth mindset.

Here are the student's tasks:
{{#each tasks}}
- Task: "{{this.task}}" (Priority: {{this.priority}}) was {{this.status}}.
{{/each}}

Return your response ONLY in the specified JSON format.
`,
});

const auraCoachFlow = ai.defineFlow(
  {
    name: 'auraCoachFlow',
    inputSchema: AuraCoachInputSchema,
    outputSchema: AuraCoachOutputSchema,
  },
  async (input) => {
    // If there are no tasks, return a gentle prompt to use the planner.
    if (input.tasks.length === 0) {
        return {
            insights: ["It looks like you don't have any tasks in your planner yet."],
            suggestions: ["Try adding a few tasks for tomorrow to get started!"],
        };
    }

    const { output } = await prompt(input);
    if (!output) {
      return {
        insights: ["I had a little trouble analyzing your day."],
        suggestions: ["Please try again in a moment."],
      };
    }
    return output;
  }
);
