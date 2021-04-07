import { CatsStatus } from "../cats.model";

export class CreateCatDTO {
  name: string;
  description: string;
  age: number;
  breed: string;
  photo: string;
  status?: CatsStatus
}