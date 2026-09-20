# Blog writing guide

Read `../../src/app/blog/AGENTS.md` before adding, editing, renaming, or removing a post. It defines the frontmatter contract, slug rules, taxonomy, and search-index workflow.

## Voice

Write like an experienced practitioner teaching someone newer to the field. Use first person for experience and opinions, and address the reader directly when giving advice. Keep the tone conversational, candid, practical, and encouraging. Confidence should come from concrete examples rather than grand claims.

Explain a concept before adding nuance. Move from the reason it matters, to a plain-language definition, to a realistic example, and then to practical advice. Mark personal judgement with phrases such as "in my experience" or "in my opinion." Preserve the author's career details and lived experience unless the author supplies an update.

## Structure

- Open with a question, problem, or situation the reader will recognise.
- Keep paragraphs focused on one idea and vary their length naturally.
- Use descriptive headings to guide the lesson.
- Use lists for genuine sequences, options, criteria, or summaries.
- Link technical terms and factual claims to useful sources.
- Include examples from software teams, products, teaching, or healthcare when they make an abstract idea concrete.
- When relevant, explain how AI changes the workflow without letting AI replace the article's core lesson.
- End with a concise takeaway, practical next step, or bridge to the next article.

## Prose

Prefer familiar words and direct sentences. Use contractions when they sound natural. Keep technical terminology when it is the clearest language, then explain it for readers who are still learning.

Use periods and commas for most sentence structure. Write prose without semicolons or em dashes. Split the thought into two sentences or use a comma, conjunction, or parentheses. Reserve a colon for a list, code sample, table, or short example that follows directly from the preceding clause.

Bold the term being introduced, not whole sentences. Avoid generic filler, corporate language, exaggerated certainty, and repeated conclusions. Never invent personal anecdotes, employment details, metrics, or citations.

## Editing workflow

1. Read the complete post before changing it. Identify its audience, argument, and the author's personal claims.
2. Preserve the meaning and voice while correcting grammar, repetition, weak transitions, and sentence fragments.
3. Check every em dash, colon, and semicolon. Keep only punctuation that improves clarity under the prose rules above.
4. Confirm that links still describe the text they support and that code examples remain unchanged unless the task includes technical corrections.
5. Update `lastUpdated` when the article itself changes.
6. Follow the validation and search-index steps in `../../src/app/blog/AGENTS.md`.

The edit is complete when the article reads naturally aloud, every factual or personal claim retains its intended meaning, and all repository completion gates pass.
