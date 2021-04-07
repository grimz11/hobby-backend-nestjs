import { IsNotEmpty } from "class-validator";
import { CatsStatus } from "../cats.model";

export class FilterCatDTO {
    status: CatsStatus;

    @IsNotEmpty()
    name: string;
    
    age: number;

    @IsNotEmpty()
    breed: string;
}