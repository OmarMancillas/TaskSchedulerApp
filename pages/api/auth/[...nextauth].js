import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    Providers.GitHub({
      // clientId: process.env.GITHUB_CLIENT_ID,
      // clientSecret: process.env.GITHUB_CLIENT_SECRET,
      clientId = "7225219cd90aaf6bb561",
      clientSecret: "67902972aa342ec01f83cb99ca3acc78c49c6c75",
    }),
    Providers.Google({
      // clientId: process.env.GOOGLE_CLIENT_ID,
      // clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      clientId: "754978520057-rnoi2f0vdq5asgupht681567d7npm7rh.apps.googleusercontent.com",
      clientSecret: "RvQKFBsw18cXzK3BAKzAumJW",
    }),
  ],
});