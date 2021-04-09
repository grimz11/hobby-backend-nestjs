import { BadRequestException, PipeTransform } from '@nestjs/common';
import { CatsStatus } from '../catStatus.enum';

export class CatValidationPipe implements PipeTransform {
  readonly allowedStatuses = [CatsStatus.PUBLISHED, CatsStatus.UNPUBLISHED];

  transform(value: any) {
    const checkStatus = value.status.toUpperCase();

    if (!this.isStatusValid(checkStatus)) {
      throw new BadRequestException(`${value.status} is an invalid status`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
