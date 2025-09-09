import { diskStorage } from 'multer';
import { extname } from 'path';

function filename(_, file: Express.Multer.File, cb: (e: any, v: string) => void) {
  const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  cb(null, unique + extname(file.originalname));
}

export const boardUploadOptions = {
  storage: diskStorage({
    destination: 'uploads/boards',
    filename,
  }),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
};

export const commentUploadOptions = {
  storage: diskStorage({
    destination: 'uploads/comments',
    filename,
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
};
