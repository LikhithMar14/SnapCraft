import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks:{
    async jwt({token, account}){
      if(account?.id_token){
        token.id = account.id_token;
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