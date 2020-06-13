import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Product } from './product.entity';

@Entity('Categories')
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    description: String;

    @OneToMany(type => Product, produit => produit.category)
    products: Product[];
}