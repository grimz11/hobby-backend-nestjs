import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CatsStatus } from './cat-status.enum';

@Entity()
export class Cat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  age: number;

  @Column()
  breed: string;

  @Column()
  photo: string;

  @Column()
  status: CatsStatus;
}
