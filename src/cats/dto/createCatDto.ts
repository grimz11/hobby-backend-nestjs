import { IsNotEmpty } from 'class-validator';
import { CatsStatus } from '../catStatus.enum';

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
