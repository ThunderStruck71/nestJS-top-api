import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReviewModel } from './review.model';
import { Model } from 'mongoose';

@Injectable()
export class ReviewService {
	constructor(@InjectModel(ReviewModel.name) private readonly reviewModel: Model<ReviewModel>) {}
}
