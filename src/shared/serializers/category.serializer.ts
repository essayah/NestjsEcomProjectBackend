import {plainToClass} from 'class-transformer';
import { CategoryDTO } from "../entitiesDTO/category.dto";
import { Category } from "../entity/category.entity";

export class CategorySerializer {
    static fromDTO(dto: CategoryDTO): Category {
        if (!dto) {
            return null;
        }

        const category = new Category();
        category.description = dto.description;
        return category;
    }

    static fromEntity( category : Category) : CategoryDTO{

        if(!category){
            return null; 
        }

        return plainToClass(CategoryDTO, {
            id: category.id,
            description : category.description,
        })
    }
    static fromEntities( categories : Category[]) : CategoryDTO[]{

        if(!categories){
            return null; 
        }

        let categoriesDTo : CategoryDTO[] = []; 
        for(let category of categories) {
            categoriesDTo.push(this.fromEntity(category));
        }
        return categoriesDTo;
    }
}