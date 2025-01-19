"use client";

import React from "react";
import { SidebarLinkProps } from "@/types";
import {
    BookmarkIcon,
    CommentIcon,
    LogoutIcon,
    SettingsIcon,
    UserIcon,
} from "../icons/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@nextui-org/button";

const SidebarLink = ({ href, icon, label }: SidebarLinkProps) => {
    const pathname = usePathname();

    // بررسی اکتیو بودن لینک
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={`p-4 text-xl relative flex items-center gap-2 rounded-2xl w-[13rem] ${
                isActive
                    ? "bg-secondary-frog border border-secondary-forest hover:text-zinc-800 cursor-default text-zinc-800"
                    : "text-gray-500"
            }  hover:text-secondary-frog transition duration-300 ease-in-out`}
        >
            <span>{icon}</span>
            <h5>{label}</h5>
        </Link>
    );
};

export const SidebarProfile = ({
    sidebarLinks,
    extraLink,
}: {
    sidebarLinks: SidebarLinkProps[];
    extraLink?: SidebarLinkProps;
}) => {
    return (
        <div className="bg-zinc-800 w-fit justify-between items-center relative top-0  h-screen z-40 flex flex-col">
            <nav className="flex flex-col relative p-2">
                {sidebarLinks.map((link) => (
                    <SidebarLink key={link.href} {...link} />
                ))}
            </nav>
            {extraLink ? (
                <button
                    onClick={extraLink?.clickEvent}
                    className={`p-4 transition-all duration-200 hover:scale-95 text-xl bg-red-600 flex justify-normal items-center gap-2 relative mb-2 rounded-2xl w-[13rem]`}
                >
                    <span>{extraLink?.icon}</span>
                    <h5>{extraLink?.label}</h5>
                </button>
            ) : (
                <></>
            )}
        </div>
    );
};
