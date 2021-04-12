import { IsNotEmpty } from 'class-validator';
import { ECatsStatus } from '../enums/catStatus.enum';

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
  
  status?: ECatsStatus;
}
