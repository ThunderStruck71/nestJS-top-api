import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum TopLevelCategory {
	Courses = 1,
	Services,
	Books,
	Goods,
}

export type TopPageDocument = HydratedDocument<TopPageModel>;

class HhData {
	@Prop()
	count: number;
	@Prop()
	juniorSalary: number;
	@Prop()
	middleSalary: number;
	@Prop()
	seniorSalary: number;
	@Prop()
	updatedAt: Date;
}

class TopPageAdvantage {
	@Prop()
	title: string;
	@Prop()
	description: string;
}

@Schema({ _id: true, timestamps: true })
export class TopPageModel {
	@Prop({ enum: TopLevelCategory, type: Number })
	firstCategory: TopLevelCategory;
	@Prop()
	secondCategory: string;
	@Prop({ unique: true })
	alias: string;
	@Prop()
	title: string;
	@Prop()
	category: string;
	@Prop({ type: HhData })
	hh?: HhData;
	@Prop([TopPageAdvantage])
	advantages: TopPageAdvantage[];
	@Prop()
	seoText: string;
	@Prop()
	tagsTitle: string;
	@Prop([String])
	tags: string[];
	@Prop({ default: Date.now })
	createdAt: Date;
	@Prop({ default: Date.now })
	updatedAt: Date;
}

export const TopPageSchema = SchemaFactory.createForClass(TopPageModel);

TopPageSchema.index({ '$**': 'text' });
