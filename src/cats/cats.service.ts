import { Injectable, NotFoundException } from '@nestjs/common';
import { Cat, CatsStatus } from './cats.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateCatDTO } from './dto/create-cat-dto';
import { FilterCatDTO } from './dto/filter-cat-dto';

@Injectable()
export class CatsService {
  private cats: Cat[] = [];

  getAllCats(): Array<Cat> {
    return this.cats;
  }

  getCatsWithFilters<T extends FilterCatDTO>(filterCatDTO: T): Array<Cat> {
    const { status, age, name, breed } = filterCatDTO;
    let cats = this.getAllCats();

    if (status) {
      cats = cats.filter(
        (cat) => cat.status.toLocaleLowerCase() === status.toLocaleLowerCase(),
      );
    }
    if (age || name || breed) {
      cats = cats.filter(
        (cat) =>
          cat.age === age ||
          cat.name?.toLocaleLowerCase().includes(name?.toLocaleLowerCase()) ||
          cat.breed?.toLocaleLowerCase().includes(breed?.toLocaleLowerCase()),
      );
    }

    return cats;
  }

  getCatById(id: string): Cat {
    const res = this.cats.find((cat) => cat.id === id);
    if(!res) {
      throw new NotFoundException('Cat you were looking for not found');
    }
    return res;
  }

  createCat<T extends CreateCatDTO>(payload: T): Cat {
    const cat: Cat = {
      id: uuidv4(),
      name: payload.name,
      description: payload.description,
      age: payload.age,
      breed: payload.breed,
      photo: payload.photo,
      status: CatsStatus.PUBLISHED,
    };
    this.cats.push(cat);
    return cat;
  }

  deleteCat(id: string): void {
    const res = this.getCatById(id);
    this.cats = this.cats.filter((cat) => cat.id !== res.id);
  }

  updateCat(id: string, payload: CreateCatDTO): Cat {
    const cat = this.getCatById(id);

    cat.age = payload.age;
    cat.breed = payload.breed;
    cat.name = payload.name;
    cat.photo = payload.photo;
    cat.status = payload.status;

    return cat;
  }
}
