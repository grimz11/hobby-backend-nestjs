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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Cat } from './cat.entity';
import { CatsService } from './cats.service';
import { CreateCatDTO } from './dto/create-cat-dto';
import { FilterCatDTO } from './dto/filter-cat-dto';
import { CatValidationPipe } from './pipes/cat-validation.pipe';

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
  @UsePipes(ValidationPipe)
  createTask(@Body() createCatDto: CreateCatDTO): Promise<Cat> {
    return this.catsService.createCat<CreateCatDTO>(createCatDto);
  }

  @Delete('/:id')
  deleteCat(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.catsService.deleteCat(id);
  }

  @Patch('/:id')
  updateCat(
    @Param('id', ParseIntPipe) id: number,
    @Body(null, CatValidationPipe) payload: CreateCatDTO,
  ): Promise<Cat> {
    return this.catsService.updateCat<CreateCatDTO>(id, payload);
  }
}
