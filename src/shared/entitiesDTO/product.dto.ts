import { CategoryDTO } from './category.dto';
export class ProductDTO{
    id : number;
    name : string;
    description : string; 
    price : number; 
    crearedAt : Date;
    category?: CategoryDTO;
}