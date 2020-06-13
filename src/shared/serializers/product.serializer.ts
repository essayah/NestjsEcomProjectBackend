import { plainToClass } from 'class-transformer'
import { Product } from "../entity/product.entity";
import { ProductDTO } from "../entitiesDTO/product.dto";
import { CategorySerializer } from "./category.serializer";

export class ProductSerializer {

    static fromDTO(dto: ProductDTO): Product {
        if (!dto) {
            return null;
        }
        const product = new Product();
        product.id = dto.id;
        product.name = dto.name;
        product.price = dto.price;
        product.description = dto.description;
        product.createdAt = dto.crearedAt;
        product.category = CategorySerializer.fromDTO(dto.category);
        return product;
    }

    static fromEntity(product: Product): ProductDTO {
        if (!product) {
            return null;
        }

        return plainToClass(ProductDTO, {
            id: product.id,
            description: product.description,
            name: product.name,
            price: product.price,
            crearedAt: product.createdAt,
            category: CategorySerializer.fromEntity(product.category),
        });

    }

    static fromEntities(products: Product[]): ProductDTO[] {

        if (!products) {
            return null;
        }

        let productsDTO: ProductDTO[] = [];
        for (let product of products) {
            productsDTO.push(this.fromEntity(product));
        }
        return productsDTO;

    }

}