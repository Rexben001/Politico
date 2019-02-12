import multer from 'multer';
import DataUri from 'datauri';
import path from 'path';

const dataStorage = multer.memoryStorage({
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      cb(new Error('jpg and png formats only'), false);
    }
  }
});

const uri = new DataUri();
const dataUri = (req) => {
  return uri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
};


export default { dataStorage, dataUri };
