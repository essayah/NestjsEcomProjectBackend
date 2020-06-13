import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDTO } from 'src/shared/entitiesDTO/category.dto';
import { CreateOrUpdateCategoryDTO } from 'src/shared/entitiesDTO/create-update-category.dto';
import { Category } from 'src/shared/entity/category.entity';
import { ApiOperation } from '@nestjs/swagger';

@Controller('category')
export class CategoryController {

    constructor(public categoryService: CategoryService) { }

    @ApiOperation({
        description: 'la liste de toutes les categories'
    })
    @Get()
    showAllCategories() {
        return this.categoryService.showAllCategories();
    }

    @ApiOperation({
        description: 'Trouver une catégorie par son ID'
    })
    @Get(':id')
    getCategoryById(@Param('id') id: number): Promise<CategoryDTO> {

        return this.categoryService.findCategoryById(id);
    }

    @ApiOperation({
        description: 'Ajouter une nouvelle catégorie'
    })
    @Post()
    createCategory(@Body() data: CreateOrUpdateCategoryDTO): Promise<CategoryDTO> {
        return this.categoryService.createCategory(data);
    }

    @ApiOperation({
        description: 'Modifier une catégorie existante'
    })
    @Put(':id')
    updateCategory(@Param('id') id: number, @Body() data: Partial<Category>): Promise<CategoryDTO> {
        return this.categoryService.updateCategory(id, data);
    }

    @ApiOperation({
        description: 'Supprimer une catégorie, ça permet de supprimer en cascade les produits de la catégorie aussi'
    })
    @Delete(':id')
    deleteCategory(@Param('id') id: number): Promise<void> {
        return this.categoryService.deleteCategory(id);
    }}
