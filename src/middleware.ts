import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { Account, Client } from "appwrite";

export default withAuth(
    // withAuth augments your Request with the user's token.
    async function middleware(request) {
        const url = request.nextUrl.clone()
        const origin = url.origin;
        const pathname = url.pathname;

        const authToken = request.nextauth.token;
        if (!authToken || (authToken && new Date() > new Date(authToken.expires as string))) {
            // No valid token or token has already expired
            url.pathname = "/auth/logout";
            url.searchParams.set("sessionTimeout", "true")
            return NextResponse.redirect(url);
        }
        const appwriteSessionToken = authToken.sessionToken as string;
        try {
            // Check session token against appwrite to ensure session is still valid. 
            // This condition is triggered if remote session is terminated due to the following reasons
            // 1) Session is deleted/invalidated on Appwrite (i.e. Logged out from everywhere)
            // 2) Session is overwritten due to max sessions being hit
            const client = new Client()
                .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
                .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string)
                .setSession(appwriteSessionToken);
            const account = new Account(client);
            await account.get();
        } catch (e) {
            console.log("Invalid session token for email " + authToken.email);
            url.pathname = "/auth/logout";
            return NextResponse.redirect(url);
        }
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('x-url', request.url);
        requestHeaders.set('x-origin', origin);
        requestHeaders.set('x-pathname', pathname);
        console.info("Middleware: " + url.pathname)


        if (url.pathname === '/' || url.pathname === '/home') {
            console.info("Middleware: matched /, redirect to overview")
            url.pathname = '/home/overview'
            return NextResponse.redirect(url)
        }
        return NextResponse.next({
            request: {
                headers: requestHeaders,
            }
        });
    },
    {
        callbacks: {
            authorized: ({ token }) => token != undefined,
        },
    }
);

export const config = {
    matcher: ['/', '/home', '/home/:path*'],
}