import multer from "multer";
import {extname, join} from "path";
import { Request, Response, NextFunction } from "express";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = join(__dirname, "../uploads/")
    cb(null, path); // Set your desired destination folder
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}${Math.round(
      Math.random() * 1e9
    )}${extname(file.originalname)}`;
    cb(null, fileName);
  }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  const imageTypes = /jpeg|png|jpg|gif/i;

  const extensionName = imageTypes.test(extname(file.originalname));
  const mimetype = imageTypes.test(file.mimetype);

  if (!(extensionName && mimetype))
    return cb(
      new Error("Only .png, .jpeg, .jpg and .gif files are allowed!"),
      false
    );

  cb(null, true);
};

const limits = {
  fileSize: 1024 * 1024 * 20, // 20 MB
  fields: 15,
  files: 5,
  parts: 20
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits
});

const uploadSingle = upload.single("image");

export default (req: Request, res: Response, next: NextFunction) => {
  uploadSingle(req, res, (error: any) => {
    if (error instanceof multer.MulterError) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    } else if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    return next();
  });
};
