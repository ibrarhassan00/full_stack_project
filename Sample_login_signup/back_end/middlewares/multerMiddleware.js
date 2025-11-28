import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "./uploads";
    fs.mkdir(uploadPath, { recursive: true }, (err) => {
      if (err) {
        return cb(err, null); // if folder creation fails
      }
      cb(null, uploadPath); // success
    });
  },
  filename: (req, file, cb) => {
    const filename = `${new Date().getTime()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });
export default upload;
