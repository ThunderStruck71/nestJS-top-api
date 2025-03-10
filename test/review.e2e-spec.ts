import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateReviewDto } from '../src/review/dto/create-review.dto';
import { disconnect, Types } from 'mongoose';
import { REVIEW_NOT_FOUND } from '../src/review/constants/review.constants';
import { Server } from 'net';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { AuthResponse } from 'src/auth/dto/auth.response';

const productId = new Types.ObjectId().toHexString();

const authData: AuthDto = {
	login: 'fcda@md.ru',
	password: 'zxcvbn',
};

const createdReviewDto: CreateReviewDto = {
	name: 'Ревью',
	title: 'Заголовок',
	description: 'Описание',
	rating: 5.0,
	productId,
};

describe('AppController (e2e)', () => {
	let app: INestApplication<Server>;
	let createdReviewId: string;
	let token: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();

		const req = await request(app.getHttpServer()).post('/auth/login').send(authData);
		token = (req.body as AuthResponse).access_token;
	});

	it('/review/create (POST) - success', async () => {
		return request(app.getHttpServer())
			.post('/review/create')
			.send(createdReviewDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
				createdReviewId = body._id;
				expect(createdReviewId).toBeDefined();
			});
	});

	it('/review/create (POST) - failed', async () => {
		return request(app.getHttpServer())
			.post('/review/create')
			.send({ ...createdReviewDto, rating: 0 })
			.expect(400)
			.then(({ body }: request.Response) => {
				console.log(body);
			});
	});

	it('/review/byProduct/:productId (GET) - success', async () => {
		return request(app.getHttpServer())
			.get('/review/byProduct/' + productId)
			.expect(200)
			.then(({ body }: request.Response) => {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				expect(body.length).toBe(1);
			});
	});

	it('/review/byProduct/:productId (GET) - fail', async () => {
		return request(app.getHttpServer())
			.get('/review/byProduct/' + new Types.ObjectId().toHexString())
			.expect(200)
			.then(({ body }: request.Response) => {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				expect(body.length).toBe(0);
			});
	});

	it('/review/:id (DELETE) - success', async () => {
		return request(app.getHttpServer())
			.delete('/review/' + createdReviewId)
			.set('Authorization', `Bearer ${token}`)
			.expect(200);
	});

	it('/review/:id (DELETE) - fail', async () => {
		return request(app.getHttpServer())
			.delete('/review/' + new Types.ObjectId().toHexString())
			.set('Authorization', `Bearer ${token}`)
			.expect(404, {
				statusCode: 404,
				message: REVIEW_NOT_FOUND,
			});
	});

	afterAll(async () => {
		await disconnect();
	});
});
