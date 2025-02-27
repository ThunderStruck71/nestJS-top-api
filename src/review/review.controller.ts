import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReviewModel } from './review.model';
import { SuccessResponse } from 'src/helpers/success.response';

@Controller('review')
export class ReviewController {
	@Get('get/:productId')
	getByProduct(@Param('productId') productId: string): Promise<ReviewModel[]> {}

	@Post('save')
	async create(@Body() dto: SaveReviewDto): Promise<ReviewModel> {}

	@Delete('delete')
	async delete(@Body('id') dto: DeleteReviewDto): Promise<SuccessResponse> {}
}
