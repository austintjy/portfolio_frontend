import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"

function extractTokenFromCookieHeader(setCookieHeaderVal: string): string {
    const idxStart = setCookieHeaderVal.indexOf('=') + 1;
    const idxEnd = setCookieHeaderVal.indexOf(';');
    const token = setCookieHeaderVal.substring(idxStart, idxEnd);

    return token;
}

const authOptions = {
    pages: {
        signIn: '/auth/login',
    },
    session: {
        strategy: 'jwt' as any,
    },
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" }
            },
            async authorize(credentials: any, req: any) {
                if (!credentials.email || !credentials.password) {
                    return null;
                }
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                const res = await fetch("http://localhost:" + process.env.PORT + "/api/auth/login", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const authResponse = await res.json();
                // If no error and we have user data, return it
                if (res.ok && authResponse && authResponse.status as number == 200) {
                    return {
                        email: credentials.email,
                        name: credentials.email,
                        sessionToken: extractTokenFromCookieHeader(authResponse.userData.cookies[0]),
                        id: authResponse.userData.session.userId,
                        expires: authResponse.userData.session.expire,
                        session: authResponse.userData.session,
                    };
                }
                //console.debug(authResponse);
                // Return null if user data could not be retrieved
                return null;
            },
        })

    ],
    callbacks: {
        async jwt({ token, user, trigger, session }: { token: any; user: any; trigger?: any; session?: any; }) {
            if (token && user) {
                token.id = user.id;
                token.sessionToken = user.sessionToken;
                token.expires = user.expires;
                token.session = user.session;
            }
            return token;
        },
        async session({ session, token, user }: { session: any; token: any; user: any; }) {
            // Send properties to the client, like an access_token from a provider.
            if (token && session.user) {
                session.user.id = token.id;
                session.user.sessionToken = token.sessionToken;
                session.user.session = token.session;
                session.expires = token.expires;
            }
            return session
        }
    }
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };