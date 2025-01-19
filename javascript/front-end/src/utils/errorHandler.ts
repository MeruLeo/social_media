import { useRouter } from "next/navigation";

interface ErrorResponse {
    status: number;
    message: string;
}

export const handleApiError = (error: ErrorResponse) => {
    const router = useRouter();

    switch (error.status) {
        case 401:
            // Unauthorized: توکن منقضی شده یا نامعتبر است
            router.push("/login");
            break;
        case 403:
            // Forbidden: کاربر دسترسی ندارد
            console.error("شما اجازه دسترسی به این منبع را ندارید");
            break;
        case 404:
            // Not Found: منبع مورد نظر یافت نشد
            console.error("منبع مورد نظر یافت نشد");
            break;
        case 500:
            // Internal Server Error: خطای سرور
            console.error("خطای سرور رخ داده است. لطفا بعدا دوباره تلاش کنید");
            break;
        default:
            console.error("خطایی رخ داده است:", error.message);
    }

    // می‌توانید اینجا یک نوتیفیکیشن یا پیام خطا به کاربر نمایش دهید
};
