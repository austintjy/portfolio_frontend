// nextauth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { Models } from "appwrite";
// common interface for JWT and Session
interface IUser extends DefaultUser {
    session: Models.Session;
    sessionToken: string;
}

declare module "next-auth" {
    interface User extends IUser { }
    interface Session {
        user: IUser;
    }
}
declare module "next-auth/jwt" {
    interface JWT extends IUser { }
}
