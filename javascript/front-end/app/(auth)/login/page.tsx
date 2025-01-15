/* eslint-disable padding-line-between-statements */
"use client";
import React, { useEffect } from "react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { loginUser, resetState } from "@/redux/slices/auth/loginSlice";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const loginValidationSchema = yup.object({
    email: yup
        .string()
        .email("لطفاً یک ایمیل معتبر وارد کنید")
        .required("وارد کردن ایمیل ضروری است"),
    password: yup
        .string()
        .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
        .required("وارد کردن رمز عبور ضروری است"),
});

export default function LoginPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, error, success } = useSelector(
        (state: RootState) => state.login,
    );

    const router = useRouter();

    const handleSubmit = (values: { email: string; password: string }) => {
        try {
            dispatch(loginUser(values));
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
                    خوش برگشتی
                </h2>
                <p className="text-neutral-600 text-sm max-w-sm mt-2">
                    وارد شوید
                </p>

                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={loginValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="my-8">
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
                                ورود
                            </Button>

                            <div className="bg-gradient-to-r from-transparent via-green-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                            <div>
                                <p>
                                    حساب کاربری ندارید؟{" "}
                                    <Link
                                        href={`/register`}
                                        className="text-secondary-frog"
                                    >
                                        ایجاد کنید
                                    </Link>
                                </p>
                                <p>
                                    رمز عبور خود را فراموش کرده‌اید؟{" "}
                                    <Link
                                        href={`/register`}
                                        className="text-secondary-frog"
                                    >
                                        بازیابی رمز عبور
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
