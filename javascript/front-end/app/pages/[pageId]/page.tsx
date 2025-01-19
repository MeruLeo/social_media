"use client";

import {
    ArrowLeftIcon,
    EditIcon,
    EllipsIcon,
    PlusIcon,
} from "@/components/icons/icons";
import { fetchPage } from "@/redux/slices/page/pageSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Button } from "@nextui-org/button";
import { Avatar, Tab, Tabs } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    followPage,
    unfollowPage,
} from "@/redux/slices/page/followAndUnfollowSlice";
import FollowPagesModal from "@/components/profile/followPagesModel";
import { PopupPageProps } from "@/types";
import { handleApiError } from "@/src/utils/errorHandler";
import toast from "react-hot-toast";
import Post from "@/components/profile/post";

interface AccountInfoProps {
    pageId: string;
    username: string | undefined;
    name: string | undefined;
    bio: string;
    avatar: string;
    followers: PopupPageProps | number;
    followings: PopupPageProps | number;
    isOwnPage: boolean;
    isFollow: boolean;
}

const AccountInfo = ({
    pageId,
    avatar,
    bio,
    name,
    username,
    followers: initialFollowers,
    followings: initialFollowings,
    isOwnPage,
    isFollow: initialFollowState,
}: AccountInfoProps) => {
    const dispatch = useDispatch<AppDispatch>();

    // Local states for followers and followings
    const [followers, setFollowers] = useState(initialFollowers.length);
    const [followings, setFollowings] = useState(initialFollowings.length);
    const [isFollow, setIsFollow] = useState(initialFollowState);

    const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
    const [isFollowingsModalOpen, setIsFollowingsModalOpen] = useState(false);

    const handleFollowClick = async () => {
        try {
            setIsFollow(!isFollow);

            if (isFollow) {
                await dispatch(unfollowPage(pageId));
                setFollowers((prev) => prev - 1);
            } else {
                await dispatch(followPage(pageId));
                setFollowers((prev) => prev + 1);
            }
        } catch (error) {
            toast("خطایی رخ داد", {
                icon: "❌",
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
        }
    };

    return (
        <section className="w-full flex flex-col items-start">
            <header className="flex w-full justify-between">
                <div className="flex items-center gap-4">
                    <Avatar
                        src={avatar}
                        alt="user avatar"
                        size="lg"
                        radius="full"
                        isBordered
                        className="w-[10rem] h-[10rem]"
                    />
                    <div className="flex items-start flex-col">
                        <h3 className="font-sfBlack text-5xl font-bold">
                            {name}
                        </h3>
                        <h5 className="bg-primary-dark-green p-2 mt-4 font-bold rounded-full text-secondary-mint">
                            {username}@
                        </h5>
                    </div>
                </div>
                <div className="flex flex-col gap-4 items-center">
                    <Button
                        size="lg"
                        onPress={() => setIsFollowersModalOpen(true)}
                        variant="ghost"
                        className="flex bg-zinc-800 p-4 rounded-full gap-4 transition-all duration-200 hover:scale-95 h-[4rem]"
                    >
                        <span>دنبال کنندگان</span>
                        <span>{followers}</span> {/* Updated followers count */}
                        <ArrowLeftIcon />
                    </Button>
                    <FollowPagesModal
                        title="دنبال کنندگان"
                        pages={initialFollowers}
                        isOpen={isFollowersModalOpen}
                        onClose={() => setIsFollowersModalOpen(false)}
                    />

                    <Button
                        size="lg"
                        onPress={() => setIsFollowingsModalOpen(true)}
                        variant="ghost"
                        className="flex bg-zinc-800 p-4 rounded-full gap-4 transition-all duration-200 hover:scale-95 h-[4rem]"
                    >
                        <span>دنبال شوندگان</span>
                        <span>{followings}</span>{" "}
                        {/* Updated followings count */}
                        <ArrowLeftIcon />
                    </Button>
                    <FollowPagesModal
                        title="دنبال شوندگان"
                        pages={initialFollowings}
                        isOpen={isFollowingsModalOpen}
                        onClose={() => setIsFollowingsModalOpen(false)}
                    />
                </div>
            </header>
            <main className="flex flex-col items-start gap-4 mt-8">
                <div className="flex flex-col items-start">
                    <span className="text-zinc-400">درباره</span>
                    <p className="text-xl">{bio ? bio : "خالی"}</p>
                </div>
                {isOwnPage ? (
                    <Link
                        href={`/profile/edit`}
                        className="bg-primary-bangladesh-green transition-all duration-200 hover:scale-95 gap-4 p-4 rounded-full flex justify-center items-center"
                    >
                        <EditIcon />
                        ویرایش حساب کاربری
                    </Link>
                ) : (
                    <Button
                        onClick={handleFollowClick}
                        size="lg"
                        className={`w-[12rem] text-xl h-[4rem] transition-all duration-200 hover:scale-95 gap-4 p-4 rounded-full flex justify-center items-center ${
                            isFollow
                                ? "bg-transparent text-secondary-frog border-2 border-secondary-frog"
                                : "bg-gradient-forest-frog border border-secondary-forest"
                        }`}
                    >
                        {isFollow ? "دنبال می‌کنید" : "دنبال کردن"}
                    </Button>
                )}
            </main>
        </section>
    );
};

export default function ProfilePage() {
    const pathname = usePathname();
    const pageId = pathname.split("/")[2];

    const dispatch = useDispatch<AppDispatch>();
    const {
        page,
        isFollow,
        isOwnPage,
        followers,
        followings,
        posts,
        loading,
        error,
    } = useSelector((state: RootState) => state.page);

    useEffect(() => {
        if (pageId && typeof pageId === "string") {
            dispatch(fetchPage(pageId));
        }
    }, [pageId, dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-4 flex overflow-auto gap-12 flex-col justify-start items-center w-full h-screen ">
            <AccountInfo
                pageId={pageId}
                avatar="https://avatars.githubusercontent.com/u/169075466?v=4"
                bio={page?.bio}
                name={page?.name}
                username={page?.username}
                followers={followers}
                followings={followings}
                isOwnPage={isOwnPage}
                isFollow={isFollow}
            />

            <section className="w-full">
                <Tabs radius="full" size="lg">
                    <Tab title={`همه پست ها`} className="flex  flex-col gap-4">
                        {posts.map((post) => (
                            <Post key={post._id} {...post} user={page} />
                        ))}
                    </Tab>
                    <Tab title={` رسانه ها`}></Tab>
                    <Tab title={` نوشته ها (به زودی)`} isDisabled></Tab>
                </Tabs>
            </section>
        </div>
    );
}
