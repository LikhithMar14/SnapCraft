import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks:{
    async jwt({token, account}){
      if(account?.provider === "google"){
        token.id = account.providerAccountId;
      }
      return token;
    },
    async session({session, token}){
      if(session.user){
        session.user.id = token.id as string;
      }
      return session;
    }
  }
})