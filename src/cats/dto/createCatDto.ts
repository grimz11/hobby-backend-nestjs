import { IsNotEmpty } from 'class-validator';
import { CatsStatus } from '../catStatus.enum';

export class CreateCatDTO {
  @IsNotEmpty()
  name: string;

  description: string;

  @IsNotEmpty()
  age: number;
  
  @IsNotEmpty()
  breed: string;

  // @IsNotEmpty()
  photo: string;
  
  status?: CatsStatus;
}
