import { PassportStrategy } from '@nestjs/passport';
import { AuthModel } from '../auth.model';
import { ExtractJwt, Strategy, StrategyOptionsWithoutRequest } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			secretOrKey: configService.get('JWT_SECRET'),
		} as StrategyOptionsWithoutRequest);
	}

	validate({ email }: Pick<AuthModel, 'email'>) {
		return email;
	}
}
