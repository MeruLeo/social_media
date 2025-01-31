import { RootState } from "@/redux/store";
import Link from "next/link";
import { useSelector } from "react-redux";

export const AuthCheck = () => {
    const { isLoggedIn, isVerified, loading, error } = useSelector(
        (state: RootState) => state.page,
    );

    if (loading) {
        return <div>در حال بارگذاری...</div>;
    }

    if (!isLoggedIn) {
        return (
            <div
                className="bg-red-600 my-12 border-red-300 border px-4 py-3 rounded-full relative"
                role="alert"
            >
                <strong className="font-bold">خطا! </strong>
                <span className="block sm:inline">
                    برای دسترسی به این صفحه باید وارد حساب کاربری خود شوید.
                </span>
                <Link href="/login" className="underline mr-4">
                    ورود به حساب
                </Link>
            </div>
        );
    }
    if (!isVerified) {
        return (
            <div
                className="bg-red-600 my-12 border-red-300 border px-4 py-3 rounded-full relative"
                role="alert"
            >
                <strong className="font-bold">خطا! </strong>
                <span className="block sm:inline">
                    برای دسترسی به این صفحه باید ایمیل خود را تایید کنید.
                </span>
                <Link href="/login" className="underline mr-4"></Link>
            </div>
        );
    }

    return null;
};
