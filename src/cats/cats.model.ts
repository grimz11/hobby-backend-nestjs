export interface Cat {
  id?: string;
  name: string;
  description: string;
  age: number;
  breed: string;
  photo: string;
  status: CatsStatus;
}

export enum CatsStatus {
  PUBLISHED = 'PUBLISHED',
  UNPUBLISHED = 'PUBLISHED'
}