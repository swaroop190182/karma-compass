'use server';
/**
 * @fileOverview This file defines a Genkit flow for Luma, the AI Student Tutor.
 * It takes a student's question along with their educational context (board, grade, subject)
 * and provides a helpful, grade-appropriate explanation.
 *
 * - getTutorResponse - A function that takes a question and context and returns a helpful answer.
 * - TutorInput - The input type for the function.
 * - TutorOutput - The output type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const TutorInputSchema = z.object({
  board: z.string().describe('The student\'s educational board (e.g., CBSE, ICSE).'),
  grade: z.string().describe('The student\'s grade level (e.g., Grade 10).'),
  subject: z.string().describe('The subject the student needs help with.'),
  chatHistory: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).describe('The history of the conversation so far.'),
  question: z.string().describe('The student\'s latest question.'),
});
export type TutorInput = z.infer<typeof TutorInputSchema>;

const TutorOutputSchema = z.object({
  answer: z.string().describe('Luma\'s helpful and encouraging answer to the student\'s question.'),
});
export type TutorOutput = z.infer<typeof TutorOutputSchema>;

export async function getTutorResponse(input: TutorInput): Promise<TutorOutput> {
  return tutorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'tutorPrompt',
  input: { schema: TutorInputSchema },
  output: { schema: TutorOutputSchema },
  prompt: `You are Luma, a friendly, patient, and knowledgeable AI tutor for students. Your personality is encouraging and positive.

You are currently tutoring a student with the following profile:
- Board: {{{board}}}
- Grade: {{{grade}}}
- Subject: {{{subject}}}

The conversation history is as follows:
{{#each chatHistory}}
- {{role}}: {{content}}
{{/each}}

The student's new question is:
"{{{question}}}"

Your task is to:
1.  Understand the student's question in the context of the conversation history.
2.  Provide a clear, step-by-step explanation that is tailored to their specific grade level and curriculum board.
3.  Use simple language and analogies they can relate to.
4.  Maintain a positive and encouraging tone. Never just give the answer; guide them to understand the concept.
5.  If the question is complex, break it down into smaller, manageable parts.
6.  End your response with a gentle, open-ended question to check their understanding or encourage them to ask more questions. For example: "Does that make sense?" or "What part of that would you like me to explain more?"

Generate a response that helps the student learn, not just get the answer.
`,
});

const tutorFlow = ai.defineFlow(
  {
    name: 'tutorFlow',
    inputSchema: TutorInputSchema,
    outputSchema: TutorOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      return { answer: "I'm having a little trouble thinking right now. Could you please ask me again?" };
    }
    return output;
  }
);
