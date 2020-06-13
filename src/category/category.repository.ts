import { Repository, EntityRepository } from "typeorm";
import { Category } from "src/shared/entity/category.entity";


@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {

    async findAll(): Promise<Category[]> {
        return await this.find();
    }

    async findCategoryById(id: number): Promise<Category> {
        return await this.findOne(id);
    }

    async createCategory(category: Partial<Category>): Promise<Category> {
        return await this.save(category);
    }

    async updateCategory(id: number, data: Partial<Category>): Promise<Category> {
        await this.update({ id }, data);
        return await this.findOne({ where: { id } });
    }

    async deleteCategory(id: number) {
        return await this.delete(id);
    }
}