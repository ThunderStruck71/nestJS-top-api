import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDocument, ProductModel } from './product.model';
import { Model, Types } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
	constructor(
		@InjectModel(ProductModel.name) private readonly productModel: Model<ProductDocument>,
	) {}

	async create(dto: CreateProductDto) {
		return this.productModel.create(dto);
	}

	async findById(id: string) {
		return this.productModel.findById({ id: new Types.ObjectId(id) }).exec();
	}

	async deleteById(id: string) {
		return this.productModel.findByIdAndDelete({ id: new Types.ObjectId(id) }).exec();
	}

	async update(id: string, dto: CreateProductDto) {
		return this.productModel
			.findByIdAndUpdate({ id: new Types.ObjectId(id) }, dto, { new: true })
			.exec();
	}
}
