import { IsNotEmpty } from 'class-validator';
import { CatsStatus } from '../cats.model';

export class CreateCatDTO {
  @IsNotEmpty()
  name: string;

  description: string;

  age: number;
  @IsNotEmpty()

  breed: string;

  photo: string;
  
  status?: CatsStatus;
}
