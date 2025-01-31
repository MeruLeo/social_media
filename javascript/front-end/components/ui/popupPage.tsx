import React from "react";
import { PopupPageProps } from "@/types";
import Link from "next/link";
import { Avatar } from "@nextui-org/react";
import AvatarPage from "./avatar";

export default function PopupPage({
    avatar,
    name,
    _id,
    username,
}: PopupPageProps) {
    return (
        <Link href={_id} className="gap-4 items-center p-2 rounded-3xl flex">
            <AvatarPage
                isBorder
                src={avatar}
                alt={username}
                radius="full"
                size="lg"
            />
            <div>
                <h5 className="font-bold text-lg">{name}</h5>
                <span className="text-zinc-400">{username}@</span>
            </div>
        </Link>
    );
}
