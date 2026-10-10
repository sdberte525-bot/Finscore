export const contactTopics = [
  "An order",
  "Sizing and fit",
  "Returns and exchanges",
  "Wholesale or collaboration",
  "Press",
  "Something else",
] as const;

export type ContactTopic = (typeof contactTopics)[number];
