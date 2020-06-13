import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDTO } from 'src/shared/entitiesDTO/product.dto';
import { ProductSerializer } from 'src/shared/serializers/product.serializer';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(ProductRepository)
        private productRepository: ProductRepository) { }

    async showAllProducts(): Promise<ProductDTO[]> {
        const products = await this.productRepository.showAllProducts();
        if (!products) {
            return null;
        }
        return ProductSerializer.fromEntities(products);
    }

    async findProductById(id: number): Promise<ProductDTO> {
        const product = await this.productRepository.findProductById(id);
        if (!product) {
            throw new NotFoundException('Aucune Produit Trouvé');
        }

        return ProductSerializer.fromEntity(product);
    }

    async createNewProduct(data: ProductDTO): Promise<ProductDTO> {

        const product = this.productRepository.create(data);
        await this.productRepository.createNewProduct(product);

        return ProductSerializer.fromEntity(product);
    }

    async updateProduct(id: number, data: Partial<ProductDTO>): Promise<ProductDTO> {

        const product = this.productRepository.create(data);
        await this.productRepository.updateProduct(id, product);

        return this.findProductById(id);
    }

    async deleteProduct(id: number): Promise<void> {
        const obj = this.productRepository.findOne(id);

        if (!obj) {
            throw new NotFoundException("Pas de produit trouvé avec ce clé");
        }

        return await this.productRepository.deleteProduct(id);
    }

    async getProductByKW(kw: string): Promise<ProductDTO[]> {
        let products = await this.productRepository.getProductByKW(kw);

        if (!products) {
            throw new NotFoundException("Aucun produit ne correspond à votre recherche");
        }

        return ProductSerializer.fromEntities(products);
    }
}
