import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_PROVIDER_ID } from "./sanity/lib/queries";
import { writeCleint } from "./sanity/lib/write-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub, Google],
  callbacks: {
    async signIn({ user: { name, email, image }, profile, account }) {
      console.log(`account.provider: ${account?.provider}`);
      console.log(`account?.provider: ${account?.providerAccountId}`);
      const existingUser = await client
        // .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_PROVIDER_ID, {
          provider: account?.provider,
          providerId: account?.providerAccountId,
        });
      // create the user
      if (!existingUser) {
        await writeCleint.create({
          _type: "author",
          id: profile?.id,
          username: profile?.login,
          name,
          email,
          image,
          bio: profile?.bio || "",
        });
      }
      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client
          // .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_PROVIDER_ID, {
            provider: account.provider,
            providerId: account.providerAccountId,
          });
        token.id = user?._id;
      }
      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
