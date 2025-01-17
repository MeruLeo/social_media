import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { sfblack, sfmedium } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/navbars/sidebar";

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {
        icon: "/favicon.ico",
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "white" },
        { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html suppressHydrationWarning lang="en" dir="rtl">
            <head />
            <body
                className={clsx(
                    "min-h-screen bg-background font-sfMedium antialiased",
                    sfmedium.variable,
                )}
            >
                <Providers
                    themeProps={{ attribute: "class", defaultTheme: "dark" }}
                >
                    <div className="relative flex flex-col h-screen">
                        {/* <Navbar /> */}
                        {/* <Sidebar /> */}
                        <main className=" ">{children}</main>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
