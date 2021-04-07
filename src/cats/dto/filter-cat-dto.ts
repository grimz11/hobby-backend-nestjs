import { CatsStatus } from "../cats.model";

export class FilterCatDTO {
    status: CatsStatus;
    name: string;
    age: number;
    breed: string;
}