import { z } from "zod";

const questionsSchema = z
  .object({
    question: z
      .string()
      .min(6, { message: "question must have at least 6 characters" }),
    options: z.array(
      z.string().nonempty({ message: "All options are required" })
    ),
    answer: z.string().nonempty({ message: "answer is required" }),
  })
  .refine((data) => data.options.includes(data.answer), {
    message: "Answer doesn't match with any option",
    path: ["answer"],
  });

export { questionsSchema };
