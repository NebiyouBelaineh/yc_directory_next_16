import { PlayCircle } from "lucide-react";
import { defineField, defineType } from "sanity";

export const playlist = defineType({
  name: "playlist",
  title: "Playlists",
  type: "document",
  icon: PlayCircle,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug", //slug
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "select",
      type: "array",
      of: [{ type: "reference", to: [{ type: "startup" }] }],
    }),
  ],
});
