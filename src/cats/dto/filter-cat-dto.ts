import { IsNotEmpty } from "class-validator";
import { CatsStatus } from "../cat-status.enum";

export class FilterCatDTO {
    status: CatsStatus;

    @IsNotEmpty()
    name: string;
    
    age: number;

    @IsNotEmpty()
    breed: string;
}