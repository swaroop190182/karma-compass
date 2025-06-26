'use server';
/**
 * @fileOverview This file defines a Genkit flow to analyze a student's journal entries.
 * It identifies completed activities from a reflections entry and creates planner tasks from an intentions entry.
 *
 * - analyzeJournalAndIntentions - A function that takes journal text and returns identified activities and suggested tasks.
 * - AnalyzeJournalInput - The input type for the function.
 * - AnalyzeJournalOutput - The output type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PlannerTaskSchema = z.object({
    time: z.string().describe('A suggested time slot for the task, e.g., "9:00 - 10:00 AM".'),
    task: z.string().describe('A concise description of the task.'),
    priority: z.preprocess((val) => {
        if (typeof val === 'string') {
            const lower = val.toLowerCase();
            if (lower === 'high') return 'High';
            if (lower === 'medium') return 'Medium';
            if (lower === 'low') return 'Low';
        }
        return val;
    }, z.enum(['High', 'Medium', 'Low']).describe('The suggested priority for the task.')),
});

const AnalyzeJournalInputSchema = z.object({
  journalText: z.string().describe("The user's journal entry reflecting on their day."),
  intentionsText: z.string().describe("The user's entry about their intentions for the next day."),
  activityList: z.array(z.string()).describe('A list of all possible activity names.'),
});
export type AnalyzeJournalInput = z.infer<typeof AnalyzeJournalInputSchema>;

const AnalyzeJournalOutputSchema = z.object({
  identifiedActivities: z.array(z.string()).describe('A list of activity names from the provided activity list that were mentioned in the journal text.'),
  plannerTasks: z.array(PlannerTaskSchema).describe('A list of tasks for the planner based on the intentions text.'),
});
export type AnalyzeJournalOutput = z.infer<typeof AnalyzeJournalOutputSchema>;

export async function analyzeJournalAndIntentions(input: AnalyzeJournalInput): Promise<AnalyzeJournalOutput> {
  return analyzeJournalFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeJournalPrompt',
  input: { schema: AnalyzeJournalInputSchema },
  output: { schema: AnalyzeJournalOutputSchema },
  prompt: `You are a helpful student assistant. Your job is to analyze a student's journal entry and their intentions for the next day.

Part 1: Analyze the 'Reflections & Gratitude' journal entry.
Based on this text, identify which of the following activities the student has completed today.
Only return the names of activities that are explicitly mentioned or strongly implied in the journal entry.
Do not invent or guess activities not on the list.

Possible Activities:
{{#each activityList}}
- {{{this}}}
{{/each}}

Journal Entry:
"{{{journalText}}}"

Part 2: Analyze the 'Intentions for Tomorrow' entry.
Based on this text, create a list of tasks for a daily planner. For each task, suggest a reasonable time slot (e.g., "9:00 - 10:00 AM") and a priority ('High', 'Medium', or 'Low').
If the text is empty or has no clear intentions, return an empty array for plannerTasks.

Intentions for Tomorrow:
"{{{intentionsText}}}"

Return your response ONLY in the specified JSON format.
`,
});

const analyzeJournalFlow = ai.defineFlow(
  {
    name: 'analyzeJournalFlow',
    inputSchema: AnalyzeJournalInputSchema,
    outputSchema: AnalyzeJournalOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      // Return a default empty state if the model returns nothing
      return { identifiedActivities: [], plannerTasks: [] };
    }
    return output;
  }
);
