import { IsNotEmpty } from "class-validator";
import { ECatsStatus } from "../enums/catStatus.enum";

export class FilterCatDTO {
    status: ECatsStatus;

    @IsNotEmpty()
    name: string;
    
    age: number;

    @IsNotEmpty()
    breed: string;

    @IsNotEmpty()
    description: string;
}