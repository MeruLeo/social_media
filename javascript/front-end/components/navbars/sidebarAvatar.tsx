import React from "react";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@nextui-org/react";
import { Avatar } from "@nextui-org/avatar";
import { BookmarkIcon, EyeIcon, LogoutIcon } from "../icons/icons";
import AvatarPage from "../ui/avatar";

interface DropdownItem {
    key: string;
    label: string;
    color?:
        | "default"
        | "primary"
        | "secondary"
        | "success"
        | "warning"
        | "danger";
    icon: React.ReactNode;
}

interface UserDropdownProps {
    avatarSrc: string;
    avatarAlt: string;
}

const UserDropdown: React.FC<UserDropdownProps> = ({
    avatarSrc,
    avatarAlt,
}) => {
    const dropdownItems = [
        { key: "profile", label: "مشاهده پروفایل", icon: <EyeIcon /> },
        { key: "bookmarks", label: "نشان شده ها", icon: <BookmarkIcon /> },
        { key: "logout", label: "خروج", color: "danger", icon: <LogoutIcon /> },
    ];

    return (
        <Dropdown placement="top-end">
            <DropdownTrigger>
                <AvatarPage
                    isBorder
                    as="button"
                    size="lg"
                    extraStyles="transition-transform"
                    src={avatarSrc}
                    alt={avatarAlt}
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
                {dropdownItems.map((item) => (
                    <DropdownItem
                        key={item.key}
                        color={item.color || "default"}
                        startContent={item.icon}
                    >
                        {item.label}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};

export default UserDropdown;
