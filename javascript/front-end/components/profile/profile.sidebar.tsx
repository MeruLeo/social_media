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

export const SidebarProfile = () => {
    const sidebarLinks: SidebarLinkProps[] = [
        {
            href: "/profile",
            icon: <UserIcon />,
            label: "حساب کاربری",
        },
        {
            href: "/bookmarks",
            icon: <BookmarkIcon />,
            label: "نشان شده ها",
        },
        {
            href: "/your-comments",
            icon: <CommentIcon />,
            label: "نظرات شما",
        },
        {
            href: "/settings",
            icon: <SettingsIcon />,
            label: "تنظیمات حساب",
        },
    ];

    return (
        <div className="bg-zinc-800 w-fit justify-between items-center relative top-0  h-screen z-40 flex flex-col">
            <nav className="flex flex-col relative p-2">
                {sidebarLinks.map((link) => (
                    <SidebarLink key={link.href} {...link} />
                ))}
            </nav>
            <button
                className={`p-4 text-xl bg-red-600 flex justify-normal items-center gap-2 relative mb-2 rounded-2xl w-[13rem]`}
            >
                <span>
                    <LogoutIcon />
                </span>
                <h5>خروج</h5>
            </button>
        </div>
    );
};
