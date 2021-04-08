import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatRepository } from './cat.repository';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CatRepository])
  ],
  controllers: [CatsController],
  providers: [CatsService]
})
export class CatsModule {}
