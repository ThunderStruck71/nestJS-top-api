import { IsNumber, IsString, Min, Max } from 'class-validator';

export class CreateReviewDto {
	@IsString()
	name: string;

	@IsString()
	title: string;

	@IsString()
	description: string;

	@Max(5, { message: 'Рейтинг не должен быть больше 5' })
	@Min(1, { message: 'Рейтинг не должен быть меньше 1' })
	@IsNumber()
	rating: number;

	@IsString()
	productId: string;
}
