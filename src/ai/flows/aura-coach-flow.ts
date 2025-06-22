'use server';
/**
 * @fileOverview This file defines a Genkit flow for Aura, the AI Student Coach.
 * It analyzes a student's planner tasks and historical journal entries to provide personalized feedback.
 *
 * - getAuraFeedback - A function that takes planner tasks and journal history and returns coaching insights and suggestions.
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

const JournalEntrySchema = z.object({
    date: z.string().describe('The date of the journal entry in YYYY-MM-DD format.'),
    score: z.number().describe('The total karma score for the day.'),
    loggedActivities: z.array(z.string()).describe('A list of activities logged for that day.'),
    reflection: z.string().optional().describe('The user\'s written reflection for the day.'),
});

const AuraCoachInputSchema = z.object({
  tasks: z.array(PlannerTaskSchema).describe("The list of the student's tasks for the current day being planned."),
  journalHistory: z.array(JournalEntrySchema).describe("The student's journal entries from previous days."),
});
export type AuraCoachInput = z.infer<typeof AuraCoachInputSchema>;

const AuraCoachOutputSchema = z.object({
  insights: z.array(z.string().describe("A key observation or insight about the student's productivity or habits based on their tasks and history.")).describe('A list of insights about the student\'s journey.'),
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
  prompt: `You are Aura, a friendly, positive, and insightful AI wellness coach for students. Your goal is to provide personalized, encouraging, and actionable feedback.

You will analyze two sources of information:
1. The student's journal history, which shows their past actions, karma scores, and reflections.
2. The student's planned tasks for today.

Your analysis should be holistic. Look for patterns, progress over time, and connections between past behavior and future plans.

1.  **Generate Insights:** Based on the journal history, identify patterns. For example: "I see you've consistently been exercising in the mornings, that's great!" or "It seems like the last few days have had lower karma scores, is everything okay?". Also, comment on the current day's plan in light of their history. "It's great to see you've planned a 'Test Prep' session, especially after reflecting that you felt unprepared last week." Generate 1-2 key insights.

2.  **Generate Suggestions:** Provide gentle, constructive, and actionable tips based on your insights. If they are building a good habit, suggest how to maintain momentum. If they are struggling, suggest a strategy to try. For example: "Since you've planned to 'Wake Early', maybe try setting out your clothes the night before to make the morning smoother?". Generate 1-2 suggestions.

Your tone should always be supportive and non-judgmental. You are a coach, not a critic. Focus on long-term growth and well-being.

**Student's Journal History:**
{{#if journalHistory}}
{{#each journalHistory}}
- On {{this.date}}: Score {{this.score}}. Activities: {{#each this.loggedActivities}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}. Reflection: "{{this.reflection}}"
{{/each}}
{{else}}
No journal history available.
{{/if}}

**Student's Plan for Today:**
{{#if tasks}}
{{#each tasks}}
- Task: "{{this.task}}" (Priority: {{this.priority}}) is currently {{this.status}}.
{{/each}}
{{else}}
No tasks planned for today yet.
{{/if}}


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
    if (input.tasks.length === 0 && input.journalHistory.length === 0) {
        return {
            insights: ["It looks like you're just getting started!"],
            suggestions: ["Try adding some tasks to your planner or logging a few days in your journal to get feedback from Aura."],
        };
    }

    const { output } = await prompt(input);
    if (!output) {
      return {
        insights: ["I had a little trouble analyzing your journey."],
        suggestions: ["Please try again in a moment."],
      };
    }
    return output;
  }
);
