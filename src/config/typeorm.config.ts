import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Hello101!',
  database: 'hobbydb',
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: true
}