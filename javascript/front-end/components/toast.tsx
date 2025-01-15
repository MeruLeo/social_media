"use client";

import React from "react";
import toast from "react-hot-toast";
import { checkIcon, xIcon } from "./icons/icons";

interface ToastProps {
    message: string;
    isSuccess: boolean;
}

export const Toast = ({ message, isSuccess }: ToastProps) => {
    return (
        <div>
            {toast(message, {
                icon: isSuccess ? "✅" : "❌",
                style: {
                    borderRadius: "100px",
                    background: "#333",
                    color: "#fff",
                },
            })}
        </div>
    );
};
