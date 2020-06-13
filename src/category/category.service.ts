import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from 'src/shared/entity/category.entity';
import { CategoryDTO } from 'src/shared/entitiesDTO/category.dto';
import { CreateOrUpdateCategoryDTO } from 'src/shared/entitiesDTO/create-update-category.dto';
import { CategorySerializer } from 'src/shared/serializers/category.serializer';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository) { }

  async showAllCategories(): Promise<CategoryDTO[]> {
    let categories = await this.categoryRepository.findAll();
    return CategorySerializer.fromEntities(categories);
  }

  async findCategoryById(id: number): Promise<CategoryDTO> {

    const categ = await this.categoryRepository.findCategoryById(id)
    if (!categ) {
      throw new NotFoundException('Aucune Category Trouvée');
    }
    return CategorySerializer.fromEntity(categ);
  }

  async createCategory(createOrUpdateCategoryDTO: CreateOrUpdateCategoryDTO): Promise<CategoryDTO> {

    let category = new Category();
    category.description = createOrUpdateCategoryDTO.description;

    category = await this.categoryRepository.createCategory(category);
    return CategorySerializer.fromEntity(category);

  }

  async updateCategory(id: number, data: Partial<Category>): Promise<CategoryDTO> {

    const categ = await this.categoryRepository.updateCategory(id, data);
    return CategorySerializer.fromEntity(categ);
  }

  async deleteCategory(id: number): Promise<void> {
    const obj = await this.categoryRepository.findCategoryById(id);
    if (!obj) {
      throw new NotFoundException('Aucune catégorie trouvée');
    }
    return await this.categoryRepository.deleteCategory(id).then(result => { deleted: true });
  }
}
