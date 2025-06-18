CREATE TABLE "links" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"original_link" text NOT NULL,
	"short_link" text NOT NULL,
	"accesses" text DEFAULT '0' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "links_short_link_unique" UNIQUE("short_link")
);
