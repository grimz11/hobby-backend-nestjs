import { IsNotEmpty } from "class-validator";
import { CatsStatus } from "../catStatus.enum";

export class FilterCatDTO {
    status: CatsStatus;

    @IsNotEmpty()
    name: string;
    
    age: number;

    @IsNotEmpty()
    breed: string;

    @IsNotEmpty()
    description: string;
}