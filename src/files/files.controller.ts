import {
	Controller,
	HttpCode,
	Post,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FileElementResponse } from './dto/file-element.response';
import { FilesService } from './files.service';
import { MFile } from './dto/mfile.class';

@Controller('files')
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@HttpCode(200)
	@Post('upload')
	@UseInterceptors(FileInterceptor('files'))
	@UseGuards(JwtAuthGuard)
	async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<FileElementResponse[]> {
		const savedArray = [new MFile(file)];
		if (file.mimetype.includes('image')) {
			const webPBuffer = await this.filesService.convertToWebP(file.buffer);
			savedArray.push(
				new MFile({
					originalname: `${file.originalname.split('.')[0]}.webp`,
					buffer: webPBuffer,
				}),
			);
		}

		return this.filesService.saveFiles(savedArray);
	}
}
