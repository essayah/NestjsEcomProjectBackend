import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Category } from './category.entity'; 

@Entity('Produits')
export class Product {

    @PrimaryGeneratedColumn()
    id : number; 

    @Column('text')
    name : string; 

    @Column('text')
    description: string; 

    @Column('float')
    price : number; 

    @CreateDateColumn()
    createdAt : Date;

    @ManyToOne(type=>Category, category => category.products, {cascade:true, onDelete:"CASCADE", eager:true})
    category : Category;

}