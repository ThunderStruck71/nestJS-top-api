import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { TopPageModel, TopPageSchema } from './top-page.model';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPageService } from './top-page.service';
import { HhModule } from 'src/hh/hh.module';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: TopPageModel.name, schema: TopPageSchema }]),
		HhModule,
	],
	controllers: [TopPageController],
	providers: [TopPageService],
	exports: [TopPageService],
})
export class TopPageModule {}
