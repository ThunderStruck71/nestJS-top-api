import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TopPageModel } from './top-page.model';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { SuccessResponse } from 'src/helpers/success.response';
import { FindTopPageResponse } from './dto/find-top-page.response.dto';
import { SaveTopPageDto } from './dto/save-top-page.dto';
import { DeleteTopPageDto } from './dto/delete-top-page.dto';

@Controller('top-page')
export class TopPageController {
	@Get(':id/alias')
	async get(@Param('alias') alias: string): Promise<TopPageModel> {}

	@Post('find')
	async getByCategory(@Body() dto: FindTopPageDto): Promise<FindTopPageResponse[]> {}

	@Post('save')
	async save(@Body() dto: SaveTopPageDto): Promise<TopPageModel> {}

	@Delete('delete')
	async delete(@Body() dto: DeleteTopPageDto): Promise<SuccessResponse> {}
}
