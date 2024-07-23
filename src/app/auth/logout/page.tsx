"use client";

import { signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";


function LogoutPartial() {
    const params = useSearchParams();
    const sessionTimeout = params?.get("sessionTimeout");
    useEffect(() => {
        signOut({ callbackUrl: '/auth/login' + (sessionTimeout !== null ? '?sessionTimeout=true' : ''), redirect: true });
    }, [sessionTimeout]);

    return <></>;
}

export default function LogoutPage() {
    return (
        <Suspense>
            <LogoutPartial />
        </Suspense>
    )
}
