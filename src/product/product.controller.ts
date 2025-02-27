import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductModel } from './product.model';
import { FindProductDto } from './dto/find-product.dto';
import { SuccessResponse } from 'src/helpers/success.response';
import { SaveProductDto } from './dto/save-product.dto';
import { DeleteProductDto } from './dto/delete-product.dto';

@Controller('product')
export class ProductController {
	@Get('get/:id')
	async get(@Param('id') id: string): Promise<ProductModel> {}

	@Post('find')
	async getByCategory(@Body() dto: FindProductDto): Promise<ProductModel[]> {}
	
	@Post('save')
	async save(@Body() dto: SaveProductDto): Promise<ProductModel> {}

	@Delete('delete')
	async delete(@Body() dto: DeleteProductDto): Promise<SuccessResponse> {}

}
