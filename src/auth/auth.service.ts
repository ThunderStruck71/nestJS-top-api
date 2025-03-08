import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthDocument, AuthModel } from './auth.model';
import { Model } from 'mongoose';
import { AuthDto } from './dto/auth.dto';
import { genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class AuthService {
	constructor(@InjectModel(AuthModel.name) private readonly authModel: Model<AuthDocument>) {}

	async createUser(dto: AuthDto) {
		const salt = genSaltSync(10);
		const user = new this.authModel({
			email: dto.login,
			passwordHash: hashSync(dto.password, salt),
		});

		return user.save();
	}

	async findUser(email: string) {
		return this.authModel.findOne({ email }).exec();
	}
}
