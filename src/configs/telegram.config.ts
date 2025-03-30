import { ConfigService } from '@nestjs/config';
import { ITelegramOptions } from 'src/telegram/telegram.interface';

export const getTelegramConfig = (configService: ConfigService): ITelegramOptions => {
	const token = configService.get('TELEGRAM_TOKEN') as string;
	if (!token) {
		throw new Error('TELEGRAM_TOKEN не задан');
	}

	return {
		chatId: configService.get('TELEGRAM_CHAT_ID') ?? '',
		token,
	};
};
