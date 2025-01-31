/* eslint-disable padding-line-between-statements */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import * as yup from "yup";

import { PostProps } from "@/types";
import { BigPlusIcon } from "@/components/icons/icons";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";

import { Formik, Field, Form, ErrorMessage } from "formik";
import { cn } from "@/lib/utils";
import { TextArea } from "@/components/ui/textArea";
import { Button } from "@nextui-org/button";
import { Tab, Tabs } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { createPost } from "@/redux/slices/post/postSlice";
import toast from "react-hot-toast";
import { AuthCheck } from "@/components/ui/authCheck";

const createPostValidationSchema = yup.object({
    caption: yup.string().required("کپشن الزامی است"),
});

export default function PostList() {
    const dispatch = useDispatch<AppDispatch>();

    const { isLoggedIn, isVerified, error } = useSelector(
        (state: RootState) => state.page,
    );

    const [preview, setPreview] = useState<string | null>(null);
    const [fileType, setFileType] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [captionInput, setCaptionInput] = useState<string>("");
    const [hashtagsInput, setHashtagsInput] = useState<string>("");
    const [hashtagsList, setHashtagsList] = useState<string[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setPreview(fileUrl);
            setFileType(file.type.startsWith("image") ? "image" : "video");
            setSelectedFile(file);
        }
    };

    const handleHashtagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value || "";
        setHashtagsInput(value);

        const hashtags = value
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => /^#[a-zA-Z0-9_]+$/.test(tag));

        setHashtagsList(hashtags);
    };

    const handleCaptionInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCaptionInput(e.target.value);
    };

    const handleCreatePost = (values: {
        caption: string;
        hashtags: string[];
        media: File | null;
    }) => {
        const formData = new FormData();
        formData.append("caption", values.caption);
        formData.append("hashtags", values.hashtags.join(","));
        if (values.media) {
            formData.append("media", values.media);
        }

        try {
            dispatch(createPost(formData));
            toast("پست با موفقیت ایجاد شد", {
                icon: "✅",
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
        } catch (err) {
            toast("ساخت پست با خطا مواجه شد", {
                icon: "❌",
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
            console.log(err);
        }
    };

    return (
        <section className="max-w-[50rem] ">
            <h2 className="text-4xl font-sfBlack my-4">ایجاد پست</h2>
            <Tabs size="lg" radius="full" className="mb-4">
                <Tab title={`رسانه`}>
                    <header className="w-full">
                        <div className="flex-col relative flex items-center justify-center w-[40rem] h-[14rem] p-4 rounded-3xl border border-zinc-600 bg-zinc-800 text-gray-600 text-lg cursor-pointer">
                            {preview ? (
                                fileType === "image" ? (
                                    <Image
                                        src={preview}
                                        alt="preview"
                                        width={1000}
                                        height={1000}
                                        className="w-full h-auto max-h-[12rem] rounded-2xl object-cover"
                                    />
                                ) : (
                                    <track
                                        src={preview}
                                        className="w-full max-h-64 rounded-2xl"
                                    />
                                )
                            ) : (
                                <>
                                    <span>
                                        <BigPlusIcon />
                                    </span>
                                    <h5>بارگذاری کنید</h5>
                                    <span>png, jpeg, jpg, webp, mp4, mkv</span>
                                </>
                            )}
                            <input
                                type="file"
                                accept="image/*,video/*"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                    </header>
                    <main>
                        <Formik
                            initialValues={{
                                caption: "",
                                hashtags: [],
                                media: null,
                            }}
                            validationSchema={createPostValidationSchema}
                            onSubmit={handleCreatePost}
                        >
                            {({ setFieldValue }) => (
                                <Form className="flex flex-col gap-4">
                                    <LabelInputContainer className="mt-8">
                                        <Label
                                            htmlFor="caption"
                                            className="text-start text-xl font-bold"
                                        >
                                            کپشن
                                        </Label>
                                        <Field
                                            id="caption"
                                            name="caption"
                                            placeholder="یک کپشن بنویسید..."
                                            onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>,
                                            ) => {
                                                handleCaptionInput(e);
                                                setFieldValue(
                                                    "caption",
                                                    e.target.value,
                                                );
                                            }}
                                            value={captionInput}
                                            type="text"
                                            as={TextArea}
                                        />
                                        <ErrorMessage
                                            name="caption"
                                            component="span"
                                            className="text-red-500 text-xs"
                                        />
                                    </LabelInputContainer>
                                    <LabelInputContainer>
                                        <Label
                                            htmlFor="hashtags"
                                            className="text-start text-xl font-bold"
                                        >
                                            هشتگ‌ها
                                        </Label>
                                        <Input
                                            id="hashtags"
                                            name="hashtags"
                                            type="text"
                                            // className="text-left"
                                            placeholder="هشتگ‌ها را وارد کنید، جدا شده با ','"
                                            value={hashtagsInput}
                                            onChange={handleHashtagChange}
                                        />
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {hashtagsList.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 bg-primary-bangladesh-green text-white text-sm rounded-full"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </LabelInputContainer>
                                </Form>
                            )}
                        </Formik>
                    </main>
                    {/* Needed debug */}
                    {/* <AuthCheck /> */}
                    <footer className="my-8 flex gap-2 justify-end">
                        <Button
                            className="h-[3rem] w-[7rem]"
                            color="danger"
                            // variant=""
                            radius="full"
                        >
                            بازنشانی
                        </Button>
                        <Button
                            className="h-[3rem] w-[7rem] bg-secondary-frog"
                            radius="full"
                            // isDisabled={}
                            onClick={() =>
                                handleCreatePost({
                                    caption: captionInput,
                                    hashtags: hashtagsList || [],
                                    media: selectedFile || null,
                                })
                            }
                        >
                            ایجاد پست
                        </Button>
                    </footer>
                </Tab>
                <Tab title={`نوشته (به زودی)`} isDisabled />
            </Tabs>
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
