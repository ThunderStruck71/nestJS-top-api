import { ConfigService } from '@nestjs/config';

export const getMongoConfig = (configService: ConfigService) => ({
	uri: getMongoString(configService),
});

const getMongoString = (configService: ConfigService) => {
	const login: string | undefined = configService.get('MONGO_LOGIN');
	const password: string | undefined = configService.get('MONGO_PASSWORD');
	const host: string | undefined = configService.get('MONGO_HOST');
	const port: string | undefined = configService.get('MONGO_PORT');
	const defaultHub: string | undefined = configService.get('MONGO_AUTHDB');

	return `mongodb://${login}:${password}@${host}:${port}/${defaultHub}`;
};
