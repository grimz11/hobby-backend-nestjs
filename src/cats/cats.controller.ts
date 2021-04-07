import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Cat } from './cats.model';
import { CatsService } from './cats.service';
import { CreateCatDTO } from './dto/create-cat-dto';
import { FilterCatDTO } from './dto/filter-cat-dto';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  getCats(@Query() filterCatDTO: FilterCatDTO): Array<Cat> {
    if (Object.keys(filterCatDTO).length) {
      return this.catsService.getCatsWithFilters<FilterCatDTO>(filterCatDTO);
    }
    return this.catsService.getAllCats();
  }

  @Get('/:id')
  getCatById(@Param('id') id: string): Cat {
    return this.catsService.getCatById(id);
  }

  @Post()
  createTask(@Body() createCatDto: CreateCatDTO): Cat {
    return this.catsService.createCat<CreateCatDTO>(createCatDto);
  }

  @Delete('/:id')
  deleteCat(@Param('id') id: string): void {
    this.catsService.deleteCat(id);
  }

  @Patch('/:id')
  updateCat(@Param('id') id: string, @Body() payload: CreateCatDTO): Cat {
    return this.catsService.updateCat(id, payload);
  }
}
