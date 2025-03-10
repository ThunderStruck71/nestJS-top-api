import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthDocument, AuthModel } from './auth.model';
import { Model } from 'mongoose';
import { AuthDto } from './dto/auth.dto';
import { genSalt, hash } from 'bcryptjs';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './constants/auth.constants';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse } from './dto/auth.response';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(AuthModel.name) private readonly authModel: Model<AuthDocument>,
		private readonly jwtService: JwtService,
	) {}

	async createUser(dto: AuthDto) {
		const salt = await genSalt(10);
		const user = new this.authModel({
			email: dto.login,
			passwordHash: await hash(dto.password, salt),
		});

		return user.save();
	}

	async findUser(email: string) {
		return this.authModel.findOne({ email }).exec();
	}

	async validateUser(email: string, password: string): Promise<Pick<AuthModel, 'email'>> {
		const user = await this.findUser(email);
		if (!user) {
			throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
		}

		const isCorrectPassword = await compare(password, user.passwordHash);
		if (!isCorrectPassword) {
			throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
		}

		return { email: user.email };
	}

	async login(email: string): Promise<AuthResponse> {
		const payload = { email };
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
