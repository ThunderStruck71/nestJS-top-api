import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './constants/review.constants';
import { ReviewModel } from './review.model';

@Controller('review')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@Post('create')
	async create(@Body() dto: CreateReviewDto): Promise<ReviewModel> {
		return await this.reviewService.create(dto);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		const deletedReview = await this.reviewService.delete(id);
		if (!deletedReview) {
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}

	@Get('byProduct/:productId')
	async getByProduct(@Param('productId') productId: string) {
		return await this.reviewService.findByProductId(productId);
	}

	@Delete('byProduct/:productId')
	async deleteByProduct(@Param('productId') productId: string) {
		return await this.reviewService.deleteByProductId(productId);
	}
}
