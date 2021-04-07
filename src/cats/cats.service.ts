import { Injectable } from '@nestjs/common';
import { Cat, CatsStatus } from './cats.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateCatDTO } from './dto/create-cat-dto';

@Injectable()
export class CatsService {
  private cats:Cat[] = [];

  getAllCats<T>(): Array<Cat> {
    return this.cats;
  }

  getCatById(id :string): Cat {
    return this.cats.find(cat => cat.id === id);
  }

  createCat<T extends CreateCatDTO>(payload: T): Cat{
    const cat: Cat = {
      id: uuidv4(),
      name: payload.name,
      description: payload.description,
      age: payload.age,
      breed: payload.breed,
      photo: payload.photo,
      status: CatsStatus.PUBLISHED
    }
    this.cats.push(cat);
    return cat;
  }

  deleteCat(id :string) : void {
    this.cats = this.cats.filter(cat => cat.id !== id)
  }
}
