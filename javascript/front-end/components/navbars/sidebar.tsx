"use client";

import Link from "next/link";
import React, { ReactNode } from "react";
import { HomeSimple } from "iconoir-react";
import { Tooltip } from "@nextui-org/tooltip";
import { BellIcon, DirectIcon, PlusIcon } from "../icons/icons";
import { Logo, SearchIcon } from "../icons";
import Image from "next/image";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Avatar,
    User,
    Divider,
} from "@nextui-org/react";
import UserDropdown from "./sidebarAvatar";
import { usePathname } from "next/navigation";

interface SidebarLinkProps {
    href: string;
    icon: ReactNode;
    label: string;
    active?: boolean;
}

const SidebarLink = ({ href, icon, label }: SidebarLinkProps) => {
    const pathname = usePathname();

    // بررسی اکتیو بودن لینک
    const isActive = pathname === href;

    return (
        <Tooltip content={label} placement="left">
            <Link
                href={href}
                className={`relative flex h-[4rem] justify-center items-center p-4 w-[4rem] rounded-3xl ${
                    isActive
                        ? "text-primary-caribbean-green cursor-default before:content-[''] before:absolute before:w-2 before:h-2 before:bg-primary-caribbean-green before:rounded-full before:-right-3"
                        : "text-gray-500"
                }`}
            >
                <span>{icon}</span>
            </Link>
        </Tooltip>
    );
};

export const Sidebar = () => {
    const sidebarLinks: SidebarLinkProps[] = [
        {
            href: "/",
            icon: <HomeSimple />,
            label: "خانه",
        },
        {
            href: "/explore",
            icon: <SearchIcon />,
            label: "کاوش",
        },
        {
            href: "/new",
            icon: <PlusIcon />,
            label: "پست جدید",
        },
        {
            href: "/notifications",
            icon: <BellIcon />,
            label: "اعلان ها",
        },
        {
            href: "/directs",
            icon: <DirectIcon />,
            label: "پیام ها",
        },
    ];

    return (
        <div className="fixed py-4 flex flex-col justify-between items-center top-0 right-0 w-20 h-screen bg-zinc-900 z-50">
            <nav className="flex flex-col items-center">
                <Logo className="flex justify-center items-center mb-4" />
                {sidebarLinks.map((sidebarLink) => (
                    <SidebarLink key={sidebarLink.label} {...sidebarLink} />
                ))}
            </nav>
            <UserDropdown
                avatarSrc="https://avatars.githubusercontent.com/u/169075466?v=4"
                avatarAlt="User Avatar"
            />
        </div>
    );
};
