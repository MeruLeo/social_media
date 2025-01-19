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

const createPostValidationSchema = yup.object({
    caption: yup.string().required("کپشن الزامی است"),
});

export default function PostList({
    _id,
    caption,
    hashtags,
    media,
    user,
}: PostProps) {
    const [preview, setPreview] = useState<string | null>(null);
    const [fileType, setFileType] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setPreview(fileUrl);
            setFileType(file.type.startsWith("image") ? "image" : "video");
        }
    };

    const createPost = () => {
        console.log(`post created successfully`);
    };

    return (
        <section className="w-full">
            <header className="w-full">
                <div className="flex-col relative flex items-center justify-center w-[40rem] p-4 rounded-3xl border border-zinc-600 bg-zinc-800 text-gray-600 text-lg cursor-pointer">
                    {preview ? (
                        fileType === "image" ? (
                            <Image
                                src={preview}
                                alt="preview"
                                width={1000}
                                height={1000}
                                className="w-full h-auto max-h-64 rounded-2xl object-cover"
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
                    initialValues={{ caption: "" }}
                    validationSchema={createPostValidationSchema}
                    onSubmit={createPost}
                >
                    {({}) => (
                        <Form>
                            <LabelInputContainer>
                                <Label></Label>
                                <Input />
                                <ErrorMessage />
                            </LabelInputContainer>
                        </Form>
                    )}
                </Formik>
            </main>
            <footer></footer>
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
