"use client";

import { InfoIcon, PasswordIcon, ShieldIcon } from "@/components/icons/icons";
import { SidebarProfile } from "@/components/profile/profile.sidebar";
import { AppDispatch, RootState } from "@/redux/store";
import { SidebarLinkProps } from "@/types";
import { useDispatch, useSelector } from "react-redux";

// const AccountSettingsLink: SidebarLinkProps = ({ label, icon, href }) => {};

export default function AccountSettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const dispatch = useDispatch<AppDispatch>();
    const { page } = useSelector((state: RootState) => {
        return state.page;
    });

    const accountSettingsLinks: SidebarLinkProps[] = [
        {
            label: "اطلاعات حساب",
            icon: <InfoIcon />,
            href: `/pages/${page?._id}/settings/edit`,
        },
        {
            label: "تغییر رمز عبور",
            icon: <PasswordIcon />,
            href: `/pages/${page?._id}/settings/password`,
        },
        {
            label: "تایید حساب",
            icon: <ShieldIcon />,
            href: `/pages/${page?._id}/settings/verify`,
        },
    ];

    return (
        <section className="flex flex-col  p-4 h-screen overflow-y-auto gap-4">
            <h2 className="text-4xl font-sfBlack">تنظیمات حساب</h2>
            <div className="flex  overflow-y-auto h-screen">
                <SidebarProfile
                    sidebarLinks={accountSettingsLinks}
                    extraStyles="rounded-r-3xl h-[99%]"
                />
                <div className="bg-zinc-900 p-4 h-[99%] rounded-l-3xl w-full">
                    {children}
                </div>
            </div>
        </section>
    );
}
