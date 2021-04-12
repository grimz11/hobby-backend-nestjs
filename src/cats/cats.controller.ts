import {
  BadRequestException,
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
import { storage } from './utils/utils';
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

  @Post('/sort')
  sortCatFields(@Query(null, CatValidationPipe) param: any): Promise<Array<Cat>> {
    return this.catsService.sortCatFields(param);
  }

  @Post()
  @UseInterceptors(FileInterceptor('photo', storage))
  @UsePipes(ValidationPipe)
  createCat(
    @Body() payload: CreateCatDTO,
    @UploadedFile() file,
  ): Promise<Cat> {
    if(!file) {
      throw new BadRequestException('Photo is required!')
    }

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
    @Body() payload: CreateCatDTO,
    @UploadedFile() file
  ): Promise<Cat> {
    if(!file) {
      throw new BadRequestException('Photo is required!')
    }

    payload.photo = file.filename;
    return this.catsService.updateCat<CreateCatDTO>(id, payload);
  }

}
