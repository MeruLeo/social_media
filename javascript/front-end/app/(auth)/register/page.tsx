"use client";
import React from "react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { registerUser, resetState } from "@/redux/slices/auth/registerSlice";
import toast, { Toaster } from "react-hot-toast";
import { Toast } from "@/components/toast";
import { useRouter } from "next/navigation";

// تعریف اعتبارسنجی فرم
const signupValidationSchema = yup.object({
    name: yup
        .string()
        .min(3, "نام باید حداقل ۳ حرف باشد")
        .required("نام الزامی است"),
    username: yup
        .string()
        .matches(/^\w+$/, "نام کاربری باید فقط شامل حروف، اعداد و _ باشد")
        .required("نام کاربری الزامی است"),
    email: yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
    password: yup
        .string()
        .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
        .required("رمز عبور الزامی است"),
});

export default function SignupPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, error, success } = useSelector(
        (state: RootState) => state.register,
    );

    const router = useRouter();

    const handleSubmit = (values: {
        name: string;
        username: string;
        email: string;
        password: string;
    }) => {
        try {
            dispatch(registerUser(values));
        } catch (error) {
            toast("ایجاد حساب با خطا مواجه شد", {
                icon: "❌",
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
        }
    };

    React.useEffect(() => {
        if (success) {
            router.push("/profile");
            dispatch(resetState());
        }
    }, [success, router, dispatch]);

    return (
        <>
            <div className="max-w-md absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full mx-auto rounded-none md:rounded-[2rem] p-4 md:p-8 dark:bg-black">
                <h2 className="font-bold text-2xl text-neutral-200">
                    خوش اومدی
                </h2>
                <p className="text-neutral-600 text-sm max-w-sm mt-2">
                    حسابتان را ایجاد کنید و شروع به اشتراک گذاری کنید
                </p>

                <Formik
                    initialValues={{
                        name: "",
                        username: "",
                        email: "",
                        password: "",
                    }}
                    validationSchema={signupValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="my-8">
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="name">نام</Label>
                                <Field
                                    id="name"
                                    name="name"
                                    placeholder="امیرعلی الله‌وردی | Amirali allahverdi"
                                    type="text"
                                    as={Input}
                                />
                                <ErrorMessage
                                    name="name"
                                    component="span"
                                    className="text-red-500 text-xs"
                                />
                            </LabelInputContainer>

                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="username">نام کاربری</Label>
                                <Field
                                    id="username"
                                    name="username"
                                    placeholder="amirali_allahverdi"
                                    type="text"
                                    as={Input}
                                />
                                <ErrorMessage
                                    name="username"
                                    component="span"
                                    className="text-red-500 text-xs"
                                />
                            </LabelInputContainer>

                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="email">ایمیل</Label>
                                <Field
                                    id="email"
                                    name="email"
                                    placeholder="vera@gmail.com"
                                    type="email"
                                    as={Input}
                                />
                                <ErrorMessage
                                    name="email"
                                    component="span"
                                    className="text-red-500 text-xs"
                                />
                            </LabelInputContainer>

                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="password">رمز عبور</Label>
                                <Field
                                    id="password"
                                    name="password"
                                    placeholder="••••••••"
                                    type="password"
                                    as={Input}
                                />
                                <ErrorMessage
                                    name="password"
                                    component="span"
                                    className="text-red-500 text-xs"
                                />
                            </LabelInputContainer>

                            <Button
                                fullWidth
                                radius="full"
                                type="submit"
                                color="success"
                                variant="shadow"
                                className="font-sfMedium text-xl mt-4"
                                isLoading={isLoading}
                            >
                                ثبت‌نام
                            </Button>

                            <div className="bg-gradient-to-r from-transparent via-green-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                            <div>
                                <p>
                                    حساب کاربری دارید ؟{" "}
                                    <Link
                                        href={`/login`}
                                        className="text-secondary-frog"
                                    >
                                        وارد شوید
                                    </Link>
                                </p>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <Toaster />
        </>
    );
}

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
