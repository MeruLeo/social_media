import { Avatar } from "@heroui/react";
import { MediaProps } from "@/types";

interface AvatarProps {
    src: MediaProps;
    alt: string;
    size?: "sm" | "md" | "lg";
    extraStyles?: string;
    radius?: "sm" | "md" | "lg" | "full";
    isBorder?: boolean;
    as?: "button";
}

export default function AvatarPage({
    src,
    alt,
    size = "md",
    extraStyles = "",
    radius = "full",
    isBorder = false,
    as,
}: AvatarProps) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const renderAvatar = () => {
        if (!src || !src.path) return null;

        const avatarUrl = `${apiUrl}/${src.path}`;
        const isImage = /\.(jpeg|jpg|gif|png|webp)$/i.test(src.filename);

        if (isImage) {
            return (
                <Avatar
                    src={avatarUrl}
                    alt={alt}
                    size={size}
                    radius={radius}
                    isBordered={isBorder}
                    className={extraStyles}
                    as={as}
                />
            );
        }

        return (
            <Avatar
                name={alt.charAt(0).toUpperCase()}
                size={size}
                radius={radius}
                isBordered={isBorder}
                className={extraStyles}
            />
        );
    };

    return <>{renderAvatar()}</>;
}
