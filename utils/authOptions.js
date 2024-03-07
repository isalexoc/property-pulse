import connectDB from "@/config/database";
import User from "@/models/User";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      autorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    //invoked on successful sign in
    async signIn({ profile }) {
      //1. Connect to the database
      await connectDB();
      //2. Check if the user is already in the database
      const userExists = await User.findOne({ email: profile.email });
      //3. If not, add the user to the database
      if (!userExists) {
        //truncate user name if too long
        const username = profile.name.slice(0, 20);
        await User.create({
          username,
          email: profile.email,
          image: profile.picture,
        });
      }
      //4. Return true to allow sign in
      return true;
    },
    // Modifies the session object
    async session({ session }) {
      //1. Get user from the database
      const user = await User.findOne({ email: session.user.email });
      //2. Asing the user id to the session
      session.user.id = user._id.toString();
      //3. Return the session
      return session;
    },
  },
};
