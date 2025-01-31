import { PopupPageProps } from "@/types";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
} from "@heroui/react";
import PopupPage from "../ui/popupPage";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "../icons";

interface ModalContent {
    title: string;
    pages: PopupPageProps[];
    isOpen: boolean;
    onClose: () => void;
}

export default function FollowPagesModal({
    title,
    pages,
    isOpen,
    onClose,
}: ModalContent) {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
            backdrop="transparent"
            radius="lg"
            className="rounded-3xl"
        >
            <ModalContent>
                {(onCloseInner) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 text-xl">
                            {title}
                        </ModalHeader>
                        <ModalBody>
                            <Input
                                placeholder="جستجو ..."
                                startContent={<SearchIcon />}
                                radius="full"
                            />
                            {pages.length >= 1 ? (
                                pages.map((page, index) => (
                                    <PopupPage key={index} {...page} />
                                ))
                            ) : (
                                <p className="text-center text-zinc-400 text-2xl my-8">
                                    هیچ صفحه‌ای اینجا نیست
                                </p>
                            )}
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
