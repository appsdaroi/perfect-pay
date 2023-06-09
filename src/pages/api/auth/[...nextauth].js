import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import _ from "lodash";
import axios from "axios";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const config = {
          headers: {
            "X-Master-Key":
              "$2b$10$qo5bE7wh/z3fVPs.xyH6W.jly4sXaI7d3T3LoiqfYl8Rkw0U1JThi",
          },
        };

        const db = await axios.get(
          "https://api.jsonbin.io/v3/b/647e71efb89b1e2299aa7397",
          config
        );

        const dbUser = _.find(
          db.data.record.users,
          (user) =>
            user.username === credentials.username &&
            user.password === credentials.password
        );

        if (dbUser) return dbUser;
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, trigger, user }) => {
      if (user) {
        token = user;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = token;
      }

      return session;
    },
  },
});
