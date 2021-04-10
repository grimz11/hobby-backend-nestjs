import { EntityRepository, Repository } from 'typeorm';
import { CatsStatus } from './catStatus.enum';
import { Cat } from './cat.entity';
import { CreateCatDTO } from './dto/createCatDto';
import { FilterCatDTO } from './dto/filterCatDto';

@EntityRepository(Cat)
export class CatRepository extends Repository<Cat> {
  async createCat<T extends CreateCatDTO>(payload: T): Promise<Cat> {
    console.log('payload.description', payload.description)
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
    const { status, age, name, breed, description } = payload;
    const query = this.createQueryBuilder('cat');

    if (status) {
      query.andWhere('cat.status = :status', { status });
    }
    if (age || name || breed || description) {
      query.andWhere(
        'cat.age = :age OR LOWER(cat.name) LIKE :name OR LOWER(cat.breed) LIKE :breed or LOWER(cat.description) LIKE :description',
        {
          age,
          name: `%${name?.toLowerCase()}%`,
          breed: `%${breed?.toLowerCase()}%`,
          description: `%${description?.toLowerCase()}%`,
        },
      );
    }

    const cats = await query.getMany();
    return cats;
  }
}
