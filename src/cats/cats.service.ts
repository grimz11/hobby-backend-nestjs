import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatsStatus } from './catStatus.enum';
import { Cat } from './cat.entity';
import { CatRepository } from './cat.repository';
import { CreateCatDTO } from './dto/createCatDto';
import { FilterCatDTO } from './dto/filterCatDto';
@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(CatRepository) private catRepository: CatRepository,
  ) {}

  async getCats<T extends FilterCatDTO>(payload: T): Promise<Array<Cat>> {
    return this.catRepository.getCats<T>(payload);
  }

  async getCatById(id: number): Promise<Cat> {
    const found = await this.catRepository.findOne(id);
    if (!found) {
      throw new NotFoundException('Cat you were looking for not found');
    }
    return found;
  }
  
  async createCat<T extends CreateCatDTO>(payload: T): Promise<Cat> {
    return this.catRepository.createCat<T>(payload);
  }

  async deleteCat(id: number): Promise<void> {
    const res = await this.catRepository.delete(id);

    if (res.affected === 0) {
      throw new NotFoundException(`Cat not found!`);
    }
  }

  async updateCat<T extends CreateCatDTO>(
    id: number,
    payload: T,
  ): Promise<Cat> {
    const cat = await this.getCatById(id);

    cat.age = payload.age;
    cat.description = payload.description
    cat.breed = payload.breed;
    cat.name = payload.name;
    cat.photo = payload.photo;
    cat.status = payload.status;

    await cat.save();

    return cat;
  }
}
