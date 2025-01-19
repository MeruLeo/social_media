const multer = require("multer");
const fs = require("fs");
const path = require("path");

exports.createMulterUploader = ({
    destination,
    allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"],
    maxFileSize = 5 * 1024 * 1024, // 5MB
    fileNameLength = 32,
}) => {
    // Ensure the destination directory exists
    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
    }

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, destination);
        },
        filename: (req, file, cb) => {
            const uniqueSuffix =
                Date.now() + "-" + Math.round(Math.random() * 1e9);
            const ext = path.extname(file.originalname);
            cb(null, `${uniqueSuffix}${ext}`);
        },
    });

    const fileFilter = (req, file, cb) => {
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(
                new Error(
                    `فرمت فایل ${file.mimetype} مجاز نیست. فرمت‌های مجاز: ${allowedMimeTypes.join(", ")}`,
                ),
                false,
            );
        }
    };

    const uploader = multer({
        storage: storage,
        fileFilter: fileFilter,
        limits: {
            fileSize: maxFileSize,
        },
    });

    return uploader;
};
