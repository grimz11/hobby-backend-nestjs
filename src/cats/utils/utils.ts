import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';

export const storage = {
  storage: diskStorage({
    destination: './public/uploads/catimages',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();

      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

export const stringToArray = (arr?: string): Array<string> => {
  if(!Object.keys(arr).length) throw new BadRequestException('Please provide sort name and value identifier.');
  
  const keyParam:Array<string> = Object.keys(arr);
  const serialized:Array<string> = keyParam[0].split('::');
  
  return serialized;
}