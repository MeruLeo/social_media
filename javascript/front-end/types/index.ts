import React, { ReactNode, SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export interface SidebarLinkProps {
    href?: string;
    clickEvent?: () => void;
    icon: ReactNode;
    label: string;
    extraStyles?: string;
}

export interface Page {
    _id: string;
    name: string;
    avatar: string;
    username: string;
    bio: string;
    private: boolean;
    email: string;
    isVerified: boolean;
}

export interface PageState {
    page: Page | null;
    isFollow: boolean;
    followers: Page[];
    followings: Page[];
    isOwnPage: boolean;
    isLoggedIn: boolean;
    isVerified: boolean;
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

export interface MediaProps {
    _id: string;
    path: string;
    filename: string;
}

export interface PostProps {
    _id: string;
    user: Page;
    caption: string;
    media: MediaProps;
    hashtags?: string[];
}

export interface PostAction {
    icon: ReactNode;
    value?: number;
    action: () => void;
    label: string;
}

export interface PostState {
    post: PostProps;
    loading: boolean;
    error: string | null;
}
