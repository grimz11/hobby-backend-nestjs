import { EntityRepository, Repository } from 'typeorm';
import { CatsStatus } from './cat-status.enum';
import { Cat } from './cat.entity';
import { CreateCatDTO } from './dto/create-cat-dto';
import { FilterCatDTO } from './dto/filter-cat-dto';

@EntityRepository(Cat)
export class CatRepository extends Repository<Cat> {
  async createCat<T extends CreateCatDTO>(payload: T): Promise<Cat> {
    const cat = new Cat();
    cat.name = payload.name;
    cat.description = payload.description;
    cat.age = payload.age;
    cat.breed = payload.breed;
    cat.photo = payload.photo;
    cat.status = CatsStatus.PUBLISHED;

    await cat.save();

    return cat;
  }

  async getCats<T extends FilterCatDTO>(payload: T): Promise<Array<Cat>> {
    const { status, age, name, breed } = payload;
    const query = this.createQueryBuilder('cat');

    if(status) {
      query.andWhere('cat.status = :status', {status});
    }
    if(age || name || breed){
      query.andWhere('cat.age = :age OR cat.name LIKE :name OR cat.breed LIKE :breed', {age, name : `%${name}%`, breed : `%${breed}%`})
    }

    const cats = await query.getMany();
    return cats;
  }
}
