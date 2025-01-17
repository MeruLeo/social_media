"use client";

import { ArrowLeftIcon, EditIcon, EllipsIcon } from "@/components/icons/icons";
import { Avatar, Tab, Tabs } from "@nextui-org/react";
import Link from "next/link";

//? Header -> username, ellipsis
//todo main props
//todo main
//?Main -> avatar, name, bio, edit button
//todo posts and EMPTY

// const Header = ({ username }: { username: string }) => {
//     return (
//         <header className="bg-red-500 m-4 flex relative justify-between right-[9rem]  items-center">
//             <div>{username}@</div>
//             <Dropdown>
//                 <DropdownTrigger>
//                     <Button isIconOnly radius="full">
//                         <EllipsIcon />
//                     </Button>
//                 </DropdownTrigger>
//                 <DropdownMenu>
//                     <DropdownItem key={`account-information`}>
//                         <Link href={`/profile/account-info`}>درباره حساب</Link>
//                     </DropdownItem>
//                 </DropdownMenu>
//             </Dropdown>
//         </header>
//     );
// };

interface AccountInfoProps {
    username: string;
    name: string;
    bio: string;
    avatar: string;
    followers: number;
    followings: number;
    editButton: boolean;
}

const AccountInfo = ({
    avatar,
    bio,
    name,
    username,
    followers,
    followings,
    editButton,
}: AccountInfoProps) => {
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
                        className=" w-[10rem] h-[10rem]"
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
                    <Link
                        href={`/followers`}
                        className="flex bg-zinc-800 p-4 rounded-full gap-4"
                    >
                        <span>دنبال کنندگان</span>
                        <span>{followers}</span>
                        <ArrowLeftIcon />
                    </Link>
                    <Link
                        href={`/following`}
                        className="flex bg-zinc-800 p-4 rounded-full gap-4"
                    >
                        <span>دنبال شوندگان</span>
                        <span>{followings}</span>
                        <ArrowLeftIcon />
                    </Link>
                </div>
            </header>
            <main className="flex flex-col items-start gap-4 mt-8">
                <div className="flex flex-col items-start">
                    <span className="text-zinc-400">درباره من</span>
                    <p className="text-xl">{bio}</p>
                </div>
                {editButton && (
                    <Link
                        href={`/profile/edit`}
                        className="bg-primary-bangladesh-green transition-all duration-200 hover:scale-95 gap-4 p-4 rounded-full flex justify-center items-center"
                    >
                        <EditIcon />
                        ویرایش حساب کاربری
                    </Link>
                )}
            </main>
        </section>
    );
};

export default function ProfilePage() {
    return (
        <div className="p-4 flex gap-12 flex-col justify-start items-center w-full h-screen ">
            <AccountInfo
                avatar="https://avatars.githubusercontent.com/u/169075466?v=4"
                bio="برنامه نویس فول استک وبسایت در اصفهان ؛ پاسخگویی در دایرکت"
                name="امیرعلی الله وردی"
                username="themeruleo"
                followers={100}
                followings={200}
                editButton
            />

            <section className="">
                <Tabs radius="full" size="lg">
                    <Tab>پست ها</Tab>
                    <Tab>دریافته‌ها</Tab>
                </Tabs>
            </section>
        </div>
    );
}
