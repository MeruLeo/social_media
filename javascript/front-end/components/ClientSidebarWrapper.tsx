"use client";

import { usePathname } from "next/navigation";

import { Sidebar } from "@/components/navbars/sidebar";

export function ClientSidebarWrapper() {
    const pathname = usePathname();
    const isAuthPage = pathname === "/login" || pathname === "/register";

    if (isAuthPage) {
        return null;
    }

    return <Sidebar />;
}
