import { ProductDTO } from "./product.dto";

export class CategoryDTO {
    id:number;
    description: string;
    products?: ProductDTO[];
}