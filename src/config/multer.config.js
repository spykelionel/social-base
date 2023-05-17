import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `./uploads/`);
    },
    filename: (req, file, cb) => {
        // provide and invalid file type/extension to reduce file size to 0B on the server.
        cb(
            null,
            `${(Date.now().toString()).replace("-", "")}_${file.originalname.replace(
                " ",
                "_"
            )}`
        );
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image")) {
            cb("File type not accepted. Must be an image");
        }
        cb(null, true);
    },
});
exports.default = upload;
