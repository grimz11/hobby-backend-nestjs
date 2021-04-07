import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Cat } from './cats.model';
import { CatsService } from './cats.service';
import { CreateCatDTO } from './dto/create-cat-dto';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService){
  }

  @Get()
  getAllCats(): Array<Cat>{
    return this.catsService.getAllCats<Array<Cat>>();
  }
  
  @Get('/:id')
  getCatById(@Param('id') id: string): Cat {
    return this.catsService.getCatById(id);
  }
  
  @Post()
  createTask(@Body() createCatDto : CreateCatDTO): Cat {
    return this.catsService.createCat<CreateCatDTO>(createCatDto);
  }

  @Delete('/:id')
  deleteCat(@Param('id') id: string) : void {
    this.catsService.deleteCat(id)
  }
}
