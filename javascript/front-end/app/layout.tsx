import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { sfmedium } from "@/config/fonts";
import { ClientSidebarWrapper } from "@/components/ClientSidebarWrapper";

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
                    <div className="relative flex h-screen w-full overflow-y-auto">
                        <ClientSidebarWrapper />
                        <main className="w-full">{children}</main>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
