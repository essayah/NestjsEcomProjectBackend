import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule} from '@nestjs/typeorm';

import { ProductModule } from './product/product.module'; 
import { CategoryModule} from './category/category.module';

import {Category} from './shared/entity/category.entity';
import { Product } from './shared/entity/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    "password": '',
    database: 'nestjsdb',
    entities: [Category, Product],
    synchronize: false, 
    logging: true
    }), ProductModule, CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
