import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponse } from './dto/auth.response';

@Controller('auth')
export class AuthController {
	@Post('register')
	async register(@Body() dto: RegisterDto): Promise<AuthResponse> {}

	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: LoginDto): Promise<AuthResponse> {}
}
