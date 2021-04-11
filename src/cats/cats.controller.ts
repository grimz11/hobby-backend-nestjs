import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Cat } from './cat.entity';
import { CatsService } from './cats.service';
import { CreateCatDTO } from './dto/createCatDto';
import { FilterCatDTO } from './dto/filterCatDto';
import { CatValidationPipe } from './pipes/catValidation.pipe';
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
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  getCats(@Query() filterCatDTO: FilterCatDTO): Promise<Array<Cat>> {
    return this.catsService.getCats<FilterCatDTO>(filterCatDTO);
  }

  @Get('/:id')
  getCatById(@Param('id', ParseIntPipe) id: number): Promise<Cat> {
    return this.catsService.getCatById(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('photo', storage))
  @UsePipes(ValidationPipe)
  createCat(
    @Body() payload: CreateCatDTO,
    @UploadedFile() file,
  ): Promise<Cat> {
    // return of({ imagePath: file.filename });
    payload.photo = file.filename;

    return this.catsService.createCat<CreateCatDTO>(payload);
  }

  @Delete('/:id')
  deleteCat(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.catsService.deleteCat(id);
  }

  @Patch('/:id')
  @UseInterceptors(FileInterceptor('photo', storage))
  updateCat(
    @Param('id', ParseIntPipe) id: number,
    @Body(null, CatValidationPipe) payload: CreateCatDTO,
    @UploadedFile() file
  ): Promise<Cat> {
    payload.photo = file.filename;
    return this.catsService.updateCat<CreateCatDTO>(id, payload);
  }
}
