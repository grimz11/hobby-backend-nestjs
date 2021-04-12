import { BaseEntity, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ECatsStatus } from './enums/catStatus.enum';

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
  status: ECatsStatus;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  created_at: Date;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  updated_at: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updated_at = new Date;
  };
}
