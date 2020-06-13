import { Controller, Get, Put, Post, Delete, Param, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductDTO } from 'src/shared/entitiesDTO/product.dto';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) { }

    @ApiOperation({
        description: 'la liste de tous les produits'
    })
    @Get()
    showAllProducts() {
        return this.productService.showAllProducts();
    }
    
    @ApiOperation({
        description : 'Selectionne un produit par id'
    })
    @Get(':id')
    findProductById(@Param('id') id: number) {
        return this.productService.findProductById(id);
    }

    @ApiOperation({
        description : 'Ajout Produit par ID'
    })
    @ApiResponse({status:201, description: 'Produit sauvgardé'})
    @Post()
    creatProduct(@Body() data: ProductDTO) {
        return this.productService.createNewProduct(data);
    }

    @ApiOperation({
        description : 'Modification de produit par ID'
    })
    @ApiResponse({status :200, description:'Modification de produit avec succès'})
    @Put(':id')
    updateProduct(@Param('id') id: number, @Body() data: Partial<ProductDTO>) {
        return this.productService.updateProduct(id, data);
    }

    @ApiOperation({
        description : 'Supprission produit par ID'
    })
    @ApiResponse({status: 200, description:'Supprission produit est effectuée avec succès'})
    @Delete(':id')
    deleteProduct(@Param('id') id: number) {
        return this.productService.deleteProduct(id);
    }
   
    @ApiOperation({
        description : 'la liste de produits par Mots clé'
    })
    @ApiResponse({status:200, description:'Produits trouvés'})
    @Get('/search/:mc')
    getProductsByMC(@Param('mc') mc: string){
        return this.productService.getProductByKW(mc);
    }
}
