import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ECatSortName, ECatSortValue } from '../enums/catSort.enum';
import { ECatsStatus } from '../enums/catStatus.enum';
import { stringToArray } from '../utils/utils';

export class CatValidationPipe implements PipeTransform {
  readonly allowedStatuses = [ECatsStatus.PUBLISHED, ECatsStatus.UNPUBLISHED];
  readonly allowedSortValue = [ECatSortValue.ASC, ECatSortValue.DESC];
  readonly allowedSortName = [ECatSortName.name, ECatSortName.breed, ECatSortName.age, ECatSortName.created_at];

  transform(value: any) {
    const result = stringToArray(value);

    const checkSortValue = result?.[1].toUpperCase();
    const checkSortName = result?.[0];

    if(!this.isValid(checkSortValue, 'value')) {
      throw new BadRequestException(`Invalid sort indetifier must be a (ASC, DESC).`);
    }
    if(!this.isValid(checkSortName, 'name')) {
      throw new BadRequestException(`Invalid sort name indetifier must be a (name, age, breed, created_at).`);
    }

    return value;
  }

  private isValid(name: any, type: string): boolean {
    if(type === 'name') return  this.allowedSortName.indexOf(name) !== -1;

    if(type === 'value') return this.allowedSortValue.indexOf(name)  !== -1;
  }
}
