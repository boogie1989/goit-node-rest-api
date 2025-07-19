import multer from 'multer';

export const AVATARS_PATH = 'public/avatars/';

export const uploadAvatarMiddleware = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, AVATARS_PATH);
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },
        limits: {
            fileSize: 1048576,
        },
    })
}).single('avatar');