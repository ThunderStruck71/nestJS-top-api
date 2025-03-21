import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { TopPageModel } from './top-page.model';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { TopPageService } from './top-page.service';
import { TOP_PAGE_NOT_FOUND } from './constants/top-page.constants';

@Controller('top-page')
export class TopPageController {
	constructor(private readonly topPageService: TopPageService) {}

	@Post('create')
	async create(@Body() dto: CreateTopPageDto) {
		return this.topPageService.create(dto);
	}

	@Get(':id')
	async get(@Param('id') id: string) {
		const topPage = await this.topPageService.findById(id);
		if (!topPage) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND);
		}
		return topPage;
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		const deletedPage = await this.topPageService.deleteById(id);
		if (!deletedPage) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND);
		}
	}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: TopPageModel) {
		const topPage = await this.topPageService.update(id, dto);
		if (!topPage) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND);
		}
		return topPage;
	}

	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindTopPageDto) {
		return this.topPageService.findByCategory(dto);
	}
}
