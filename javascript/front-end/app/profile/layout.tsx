import { Sidebar } from "@/components/navbars/sidebar";
import { SidebarProfile } from "@/components/profile/profile.sidebar";

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <section className="flex">
                <div className="flex relative">
                    <Sidebar />
                    <SidebarProfile />
                </div>
                <div className="w-full text-center">{children}</div>
            </section>
        </>
    );
}
