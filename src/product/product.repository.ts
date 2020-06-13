import { Repository, EntityRepository } from "typeorm";
import { Product } from "src/shared/entity/product.entity";

@EntityRepository(Product)
export class ProductRepository extends Repository<Product>{

    async   showAllProducts(): Promise<Product[]>{
        return await this.find();
    }

    async findProductById(id: number): Promise<Product> {
        return await this.findOne({ where: { id } });
    }

    async createNewProduct(data: Product) : Promise<Product> {
        return  await this.save(data);
    }

    async updateProduct(id: number, data: Partial<Product>) : Promise<Product> {
        await this.update({ id }, data);
        return this.findProductById(id);
    }

    async deleteProduct(id: number){
        return await this.delete(id).then(result => { deleted : true});
    }

    async getProductByKW(kw : string) : Promise<Product[]>{
     
        let products = await this.find({
            where : "Product.name LIKE '%"+ kw +"%' OR Product.description LIKE '%"+ kw +"%'"
        });
        
        return products;
    }
}