"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = require("path");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const path = (0, path_1.join)(__dirname, "../uploads/");
        cb(null, path); // Set your desired destination folder
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}${Math.round(Math.random() * 1e9)}${(0, path_1.extname)(file.originalname)}`;
        cb(null, fileName);
    }
});
const fileFilter = (req, file, cb) => {
    const imageTypes = /jpeg|png|jpg|gif/i;
    const extensionName = imageTypes.test((0, path_1.extname)(file.originalname));
    const mimetype = imageTypes.test(file.mimetype);
    if (!(extensionName && mimetype))
        return cb(new Error("Only .png, .jpeg, .jpg and .gif files are allowed!"), false);
    cb(null, true);
};
const limits = {
    fileSize: 1024 * 1024 * 20,
    fields: 15,
    files: 5,
    parts: 20
};
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter,
    limits: limits
});
const uploadSingle = upload.single("image");
exports.default = (req, res, next) => {
    uploadSingle(req, res, (error) => {
        if (error instanceof multer_1.default.MulterError) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
        else if (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
        return next();
    });
};
