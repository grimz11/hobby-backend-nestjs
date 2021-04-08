import { IsNotEmpty } from 'class-validator';
import { CatsStatus } from '../cat-status.enum';

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
