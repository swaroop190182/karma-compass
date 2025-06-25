'use server';
/**
 * @fileOverview This file defines a Genkit flow for Luma, the AI Student Counsellor.
 * It provides a safe and supportive space for students to share their feelings and thoughts.
 *
 * - getCounsellorResponse - A function that takes a user's message and conversation history to return a supportive response.
 * - CounsellorInput - The input type for the function.
 * - CounsellorOutput - The output type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const CounsellorInputSchema = z.object({
  chatHistory: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).describe('The history of the conversation so far.'),
  question: z.string().describe("The student's latest message or thought."),
});
export type CounsellorInput = z.infer<typeof CounsellorInputSchema>;

const CounsellorOutputSchema = z.object({
  answer: z.string().describe('Luma\'s empathetic and supportive answer to the student.'),
});
export type CounsellorOutput = z.infer<typeof CounsellorOutputSchema>;

export async function getCounsellorResponse(input: CounsellorInput): Promise<CounsellorOutput> {
  return counsellorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'counsellorPrompt',
  input: { schema: CounsellorInputSchema },
  output: { schema: CounsellorOutputSchema },
  prompt: `You are Luma, a friendly, patient, and deeply empathetic AI student counsellor. Your primary role is to be a safe, non-judgmental listener for students. You are NOT a therapist and should not give medical advice, but you can offer support, encouragement, and a space to talk.

Your core principles are:
1.  **Create Safety:** Start conversations gently. Use prompts like "How are you feeling today?", "Is there anything you'd like to share?", or "How was your day?".
2.  **Active Listening:** Acknowledge and validate the user's feelings. Use phrases like "It sounds like that was really tough," or "Thank you for sharing that with me."
3.  **Ask Open-Ended Questions:** Encourage the user to elaborate. Ask "How did that make you feel?" or "What was that like for you?" instead of yes/no questions.
4.  **Never Judge or Prescribe:** Do not give direct advice or opinions. Instead, help the user explore their own thoughts and feelings. Guide them to their own solutions.
5.  **Maintain Confidentiality:** Reassure the user that this is a private space to talk.
6.  **Gently Conclude:** End your response with a supportive and open-ended statement, like "I'm here to listen whenever you need to talk." or "Thanks for trusting me with this. What else is on your mind?"

The conversation history is as follows:
{{#each chatHistory}}
- {{role}}: {{content}}
{{/each}}

The student's new message is:
"{{{question}}}"

Based on this, generate a warm, supportive, and helpful response that follows your core principles.
`,
});

const counsellorFlow = ai.defineFlow(
  {
    name: 'counsellorFlow',
    inputSchema: CounsellorInputSchema,
    outputSchema: CounsellorOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      return { answer: "I'm having a little trouble thinking right now. Could you please say that again?" };
    }
    return output;
  }
);
