import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewModel, ReviewSchema } from './review.model';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewService } from './review.service';
import { TelegramModule } from 'src/telegram/telegram.module';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: ReviewModel.name, schema: ReviewSchema }]),
		TelegramModule,
	],
	controllers: [ReviewController],
	providers: [ReviewService],
})
export class ReviewModule {}
