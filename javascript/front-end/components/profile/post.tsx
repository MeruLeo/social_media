import React from "react";
import { MediaProps, PostAction, PostProps } from "@/types";
import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Tooltip,
} from "@nextui-org/react";
import Image from "next/image";
import {
    BookmarkIcon,
    CommentIcon,
    CommentsIcon,
    ExpandIcon,
    HeartIcon,
    ShareIcon,
} from "../icons/icons";
import AvatarPage from "../ui/avatar";

export default function Post({
    _id,
    caption,
    hashtags,
    media,
    user,
}: PostProps) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const renderMedia = (media: MediaProps) => {
        const mediaUrl = `${apiUrl}/${media.path}`;
        const isImage = /\.(jpeg|jpg|gif|png|webp)$/i.test(media.filename);
        const isVideo = /\.(mp4|webm|ogg)$/i.test(media.filename);

        if (isImage) {
            return (
                <Image
                    src={mediaUrl}
                    alt="Post media"
                    width={1000}
                    height={1000}
                    className="rounded-[2rem] w-full object-cover max-h-[20rem]"
                />
            );
        }

        if (isVideo) {
            return (
                <track className="rounded-[2rem] w-full">
                    <source src={mediaUrl} />
                    مرورگر شما از پخش این ویدیو پشتیبانی نمی‌کند.
                </track>
            );
        }

        return null; // اگر مدیا نه عکس باشد نه ویدیو، می‌توان جایگزینی نشان داد.
    };

    const postActions: PostAction[] = [
        {
            label: "پسندیدن",
            action: () => console.log(true),
            icon: <HeartIcon />,
            value: 23000,
        },
        {
            label: "نظرات",
            action: () => console.log(true),
            icon: <CommentsIcon />,
            value: 12000,
        },
        {
            label: "ذخیره کردن",
            action: () => console.log(true),
            icon: <BookmarkIcon />,
        },
    ];

    return (
        <Card fullWidth className="rounded-[2rem] text-right">
            <CardHeader className="flex gap-4">
                <AvatarPage
                    src={user.avatar}
                    alt={user.username}
                    size="lg"
                    isBorder
                />
                <div>
                    <h4 className="font-bold text-lg">{user?.name}</h4>
                    <h6 className="text-primary-bangladesh-green">
                        {user?.username}@
                    </h6>
                </div>
            </CardHeader>
            <CardBody className="text-right">
                <section>
                    <p>{caption}</p>
                </section>

                <section className="mt-4 relative">
                    {renderMedia(media)}
                    <Tooltip content={`بزرگ کردن تصویر`}>
                        <Button
                            isIconOnly
                            radius="full"
                            className="relative -top-12 right-2"
                        >
                            <ExpandIcon />
                        </Button>
                    </Tooltip>
                </section>
                <section className="flex gap-2 flex-wrap">
                    {hashtags.map((hashtag) => (
                        <span
                            key={hashtag}
                            className="bg-primary-rich-black text-secondary-mint p-2 rounded-full"
                        >
                            {hashtag}
                        </span>
                    ))}
                </section>
            </CardBody>
            <CardFooter className="m-0">
                {postActions.map((action) => (
                    <Tooltip key={action.label} content={action.label}>
                        <Button
                            size="lg"
                            className="text-sm flex flex-col bg-transparent"
                            onClick={action.action}
                            radius="full"
                            isIconOnly
                        >
                            {action.icon}
                        </Button>
                    </Tooltip>
                ))}
            </CardFooter>
        </Card>
    );
}
