import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Server } from 'net';
import { AppModule } from '../src/app.module';
import { AuthDto } from '../src/auth/dto/auth.dto';
import * as request from 'supertest';
import { disconnect } from 'mongoose';
import { AuthResponse } from 'src/auth/dto/auth.response';

const loginData: AuthDto = {
	login: 'fcda@md.ru',
	password: 'zxcvbn',
};

describe('Auth Controller (e2e)', () => {
	let app: INestApplication<Server>;

	beforeEach(async () => {
		const moduleFixture = Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = (await moduleFixture).createNestApplication();
		await app.init();
	});

	it('/auth/login - Success', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(loginData)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect((body as AuthResponse).access_token).toBeDefined();
			});
	});

	it('/auth/login - Incorrect password', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...loginData, password: 'zxcvbnsds' } as AuthDto)
			.expect(401, {
				message: 'Некорректный пароль пользователя',
				error: 'Unauthorized',
				statusCode: 401,
			});
	});

	it('/auth/login - Incorrect login', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...loginData, login: 'asds@e.se' } as AuthDto)
			.expect(401, {
				message: 'Пользователь с таким email не найден',
				error: 'Unauthorized',
				statusCode: 401,
			});
	});

	afterAll(async () => {
		await disconnect();
	});
});
