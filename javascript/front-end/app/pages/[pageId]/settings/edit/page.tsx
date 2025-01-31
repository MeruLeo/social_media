/* eslint-disable react/self-closing-comp */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { Avatar, Button } from "@nextui-org/react";
import Image from "next/image";
import * as yup from "yup";
import { ErrorMessage, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";

import { fetchPage, editPage, editAvatar } from "@/redux/slices/page/pageSlice";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CheckIcon, DeleteIcon, PhotoIcon } from "@/components/icons/icons";

import { cn } from "@/lib/utils";
import { AppDispatch, RootState } from "@/redux/store";
import { Switch } from "@heroui/react";
import AvatarPage from "@/components/ui/avatar";
import { Page } from "@/types";
import toast from "react-hot-toast";
import { IconFlagQuestion, IconHelpHexagon } from "@tabler/icons-react";

// اعتبارسنجی فیلدها
const accountInfoValidationSchema = yup.object({
    name: yup.string().required("وارد کردن نام ضروری است"),
    username: yup.string().required("وارد کردن نام کاربری ضروری است"),
    email: yup
        .string()
        .email("لطفاً یک ایمیل معتبر وارد کنید")
        .required("وارد کردن ایمیل ضروری است"),
    bio: yup.string().required("وارد کردن بیو ضروری است"),
    private: yup.boolean(),
});

export default function EditPage() {
    const [newAvatar, setNewAvatar] = useState();

    const pathname = usePathname();
    const pageId = pathname.split("/")[2];

    const dispatch = useDispatch<AppDispatch>();
    const { page, error, loading } = useSelector(
        (state: RootState) => state.page,
    );

    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    useEffect(() => {
        dispatch(fetchPage(pageId));
    }, [dispatch, pageId]);

    const allowedFields = ["name", "username", "email", "bio", "private"];
    const handleEditPage = async (values: Partial<Page>) => {
        try {
            await dispatch(editPage({ pageId, updates: values })).unwrap();
            toast("اطلاعات شما با موفقیت ویرایش شد", {
                icon: "✅",
                style: {
                    borderRadius: "100px",
                    background: "#333",
                    color: "#fff",
                },
            });
        } catch (error) {
            console.error(error);
            toast(error, {
                icon: "❌",
                style: {
                    borderRadius: "100px",
                    background: "#333",
                    color: "#fff",
                },
            });
        }
    };

    const changeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        try {
            if (file) {
                const formData = new FormData();

                formData.append("avatar", file);

                dispatch(editAvatar({ avatar: formData, pageId }));

                location.reload();
            } else {
                console.log(`please select avatar`);
            }
        } catch (error) {
            console.error(error);
            toast("خطا در انتخاب آواتار", {
                icon: "��",
                style: {
                    borderRadius: "100px",
                    background: "#333",
                    color: "#fff",
                },
            });
        }
    };

    return (
        <section>
            <div>
                <div className="flex items-center gap-4">
                    <AvatarPage
                        src={page?.avatar}
                        alt="profile"
                        size="lg"
                        extraStyles="w-[10rem] h-[10rem]"
                        isBorder
                    />
                    <div className="flex flex-col gap-4">
                        <div>
                            <input
                                ref={inputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={changeAvatar}
                            />
                            <Button
                                startContent={<PhotoIcon />}
                                radius="full"
                                size="lg"
                                color="warning"
                                onClick={handleClick}
                            >
                                نمایه جدید
                            </Button>
                        </div>
                        <Button
                            startContent={<DeleteIcon />}
                            radius="full"
                            size="lg"
                            color="danger"
                        >
                            حذف نمایه
                        </Button>
                    </div>
                </div>
                <Formik
                    initialValues={{
                        username: page?.username || "",
                        name: page?.name || "",
                        email: page?.email || "",
                        bio: page?.bio || "",
                        private: page?.private || false,
                    }}
                    validationSchema={accountInfoValidationSchema}
                    onSubmit={handleEditPage}
                    enableReinitialize
                >
                    {({ values, handleChange, handleBlur, setFieldValue }) => (
                        <Form>
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-4">
                                    <LabelInputContainer>
                                        <Label htmlFor="name">نام</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="حداقل سه حرف"
                                        />
                                        <ErrorMessage
                                            name="name"
                                            component="div"
                                            className="text-red-500 text-xs"
                                        />
                                    </LabelInputContainer>
                                    <LabelInputContainer>
                                        <Label htmlFor="username">
                                            نام کاربری
                                        </Label>
                                        <Input
                                            id="username"
                                            name="username"
                                            value={values.username}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="@vera"
                                        />
                                        <ErrorMessage
                                            name="username"
                                            component="div"
                                            className="text-red-500 text-xs"
                                        />
                                    </LabelInputContainer>
                                </div>
                                <div className="flex gap-4">
                                    <LabelInputContainer>
                                        <Label htmlFor="email">ایمیل</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="vera@gmail.com"
                                            type="email"
                                        />
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            className="text-red-500 text-xs"
                                        />
                                    </LabelInputContainer>
                                    <LabelInputContainer>
                                        <Label htmlFor="bio">درباره من</Label>
                                        <Input
                                            id="bio"
                                            name="bio"
                                            value={values.bio}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="ورا هستم"
                                        />
                                        <ErrorMessage
                                            name="bio"
                                            component="div"
                                            className="text-red-500 text-xs"
                                        />
                                    </LabelInputContainer>
                                </div>
                            </div>
                            <div className="mt-8">
                                <h4 className="font-sfBlack text-xl mb-4">
                                    تنظیمات اضافی
                                </h4>
                                <LabelInputContainer>
                                    <Switch
                                        id="private"
                                        name="private"
                                        isSelected={values.private}
                                        onValueChange={(isChecked) => {
                                            setFieldValue("private", isChecked);
                                        }}
                                        color="success"
                                        className="bg-zinc-800 border border-zinc-700 p-4 rounded-full flex flex-row-reverse gap-4 items-center"
                                    >
                                        حساب خصوصی
                                    </Switch>
                                </LabelInputContainer>
                            </div>
                            <p className="my-4 text-zinc-500 flex gap-2 items-center">
                                <IconHelpHexagon />
                                جهت نهایی شدن تغییرات ، دکمه زیر را فشار دهید
                            </p>
                            <div className="flex justify-end items-end mt-8">
                                <Button
                                    type="submit"
                                    radius="full"
                                    color="success"
                                    size="lg"
                                    variant="shadow"
                                    endContent={<CheckIcon />}
                                >
                                    ذخیره تغییرات
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </section>
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
