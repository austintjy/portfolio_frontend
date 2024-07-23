import Footer from "@/components/layout/footer";
import NavBar from "@/components/layout/navbar";
import { SessionProvider } from "next-auth/react";
import { ReactNode, Suspense } from "react";

export default async function HomeLayout({ children }: { children: ReactNode }) {

    return (
        <div className="min-h-full">
            <NavBar />

            <main className="-mt-32">
                <div className="mx-auto pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl">
                    {/* Replace with your content */}
                    <div className="bg-white rounded-lg shadow px-3 py-4">
                        <Suspense>
                            {children}
                        </Suspense>
                    </div>
                    {/* /End replace */}
                </div>
            </main>
        </div>
    );
}