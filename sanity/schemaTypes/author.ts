import { UserIcon } from "lucide-react";
import { defineType, defineField } from "sanity";
export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: 'id',// slug
      type: 'number'
    }),
    
    defineField({
      name: 'name',
      type: 'string'
    }),
    
    defineField({
      name: 'username',
      type: 'string'
    }),
    
    defineField({
      name: 'email',
      type: 'string'
    }),
    
    defineField({
      name: 'image',
      type: 'url'
    }),
    
    defineField({
      name: 'bio',
      type: 'text'
    }),
  ],
  // Select authors by name to preview them
  preview: {
    select: {
      title: 'name'
    }
  }
});
