"use client";

import React, { useEffect } from "react";

import {
    CommentIcon,
    UserIcon,
    BookmarkIcon,
    SettingsIcon,
    LogoutIcon,
    BlockIcon,
} from "@/components/icons/icons";
import { SidebarProfile } from "@/components/profile/profile.sidebar";
import { AppDispatch, RootState } from "@/redux/store";
import { SidebarLinkProps } from "@/types";

import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchPage } from "@/redux/slices/page/pageSlice";

export default function PagesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const dispatch = useDispatch<AppDispatch>();
    const { isOwnPage, error, loading, page } = useSelector(
        (state: RootState) => {
            return state.page;
        },
    );

    const pathname = usePathname();
    const pageId = pathname.split("/")[2];

    const sidebarOwnLinks: SidebarLinkProps[] = [
        {
            href: `/pages/${page?._id}`,
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
    const sidebarOwnExtraLink: SidebarLinkProps = {
        icon: <LogoutIcon />,
        label: "خروج",
        clickEvent: () => console.log(true),
    };

    const sidebarOtherLinks: SidebarLinkProps[] = [
        {
            href: `/pages/${page?._id}`,
            icon: <UserIcon />,
            label: "حساب کاربری",
        },
        {
            href: "/your-comments",
            icon: <CommentIcon />,
            label: "نظرات این کاربر",
        },
    ];
    const sidebarOtherExtraLink: SidebarLinkProps = {
        icon: <BlockIcon />,
        label: "مسدود",
        clickEvent: () => console.log(true),
    };

    useEffect(() => {
        if (pageId && typeof pageId === "string") {
            dispatch(fetchPage(pageId));
        }
    }, [dispatch, pageId]);

    const sidebarLinks = isOwnPage ? sidebarOwnLinks : sidebarOtherLinks;
    const sidebarExtraLink = isOwnPage
        ? sidebarOwnExtraLink
        : sidebarOtherExtraLink;

    if (error) return <div>Error: {error}</div>;

    return (
        <section className="flex w-full">
            <SidebarProfile
                sidebarLinks={sidebarLinks}
                extraLink={sidebarExtraLink}
            />
            <div className="w-full">{children}</div>
        </section>
    );
}
