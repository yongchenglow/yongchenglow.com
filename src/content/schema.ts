import { z } from "zod";

// Shared schemas
const LinkSchema = z.object({
	label: z.string(),
	url: z.string().url(),
});

const ImageSchema = z.object({
	src: z.string(),
	alt: z.string(),
	width: z.number(),
	height: z.number(),
});

// About content schemas - Timeline items with discriminated union
const WorkTimelineItemSchema = z.object({
	type: z.literal("work"),
	title: z.string(),
	location: z.string(),
	years: z.string(),
	bullets: z.array(z.string()),
	skills: z.array(z.string()),
});

const EducationTimelineItemSchema = z.object({
	type: z.literal("education"),
	title: z.string(),
	location: z.string(),
	years: z.string(),
	description: z.string(),
	bullets: z.array(z.string()).optional(),
	link: LinkSchema.optional(),
	links: z.array(LinkSchema).optional(),
});

const MilitaryTimelineItemSchema = z.object({
	type: z.literal("military"),
	title: z.string(),
	years: z.string(),
	location: z.string(),
	description: z.string(),
	bullets: z.array(z.string()).optional(),
	link: LinkSchema,
});

// Unified timeline schema using discriminated union
const TimelineItemSchema = z.discriminatedUnion("type", [
	WorkTimelineItemSchema,
	EducationTimelineItemSchema,
	MilitaryTimelineItemSchema,
]);

export const AboutSchema = z.object({
	hero: z.object({
		name: z.string(),
		title: z.string(),
		objective: z.string(),
		links: z.array(LinkSchema),
	}),
	timeline: z.array(TimelineItemSchema),
});

export type AboutData = z.infer<typeof AboutSchema>;
export type TimelineItem = z.infer<typeof TimelineItemSchema>;

// Home content schemas
const CompanyLinkSchema = z.object({
	label: z.string(),
	url: z.string().url(),
});

const CtaButtonSchema = z.object({
	label: z.string(),
	href: z.string(),
	variant: z.enum(["default", "outline", "secondary", "ghost", "link"]),
});

const ProjectButtonSchema = z.object({
	text: z.string(),
	href: z.string(),
});

const ProjectSchema = z.object({
	title: z.string(),
	description: z.string(),
	buttons: z.array(ProjectButtonSchema),
});

const InternalLinkSchema = z.object({
	label: z.string(),
	href: z.string(),
});

export const HomeSchema = z.object({
	intro: z.object({
		greeting: z.string(),
		name: z.string(),
		title: z.string(),
		companyLinks: z.array(CompanyLinkSchema),
		ctaButtons: z.array(CtaButtonSchema),
		image: ImageSchema,
	}),
	projects: z.object({
		title: z.string(),
		items: z.array(ProjectSchema),
	}),
	about: z.object({
		title: z.string(),
		image: ImageSchema,
		paragraphs: z.array(z.string()),
		externalLinks: z.array(LinkSchema),
		internalLinks: z.array(InternalLinkSchema),
	}),
});

// Author content schemas
export const AuthorSchema = z.object({
	name: z.string(),
	title: z.string(),
	url: z.string().url(),
	image: z.string(),
});

/**
 * A YAML date field, normalized to an ISO 8601 date string (`YYYY-MM-DD`).
 *
 * YAML parses an unquoted `date: 2024-01-01` into a JS `Date` but a quoted
 * `date: "2024-01-01"` into a string. Both are legitimate frontmatter, so the
 * `Date` form is coerced here rather than rejected — otherwise authors get a
 * build failure for forgetting quotes.
 */
const FrontmatterDateSchema = z
	.union([z.string(), z.date()])
	.transform((value) =>
		value instanceof Date ? value.toISOString().slice(0, 10) : value,
	);

// Blog post frontmatter schema
export const BlogFrontmatterSchema = z.object({
	title: z.string(),
	subtitle: z.string().optional(),
	description: z.string(),
	date: FrontmatterDateSchema, // ISO 8601 format
	lastUpdated: FrontmatterDateSchema.optional(),
	author: z.string(),
	tags: z.array(z.string()).optional(),
	image: z.string().optional(),
	draft: z.boolean().optional(),
	featured: z.boolean().optional(),
});
