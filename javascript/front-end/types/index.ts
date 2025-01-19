import React, { ReactNode, SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export interface SidebarLinkProps {
    href?: string;
    clickEvent?: () => void;
    icon: ReactNode;
    label: string;
}

export interface Page {
    _id: string;
    name: string;
    avatar: string;
    username: string;
    bio: string;
    isVerified: boolean;
}

export interface PageState {
    page: Page | null;
    isFollow: boolean;
    followers: Page[];
    followings: Page[];
    isOwnPage: boolean;
    posts: PostProps[];
    loading: boolean;
    error: string | null;
}

export interface FollowingPage {
    success: boolean;
    error: string | null;
    loading: boolean;
}

export interface PopupPageProps {
    _id: string;
    avatar: string;
    username: string;
    name: string;
}

export interface PostMediaProps {
    _id: string;
    path: string;
    filename: string;
}

export interface PostProps {
    _id: string;
    user: Page;
    caption: string;
    media: PostMediaProps;
    hashtags: string[];
}

export interface PostAction {
    icon: ReactNode;
    value?: number;
    action: () => void;
    label: string;
}
