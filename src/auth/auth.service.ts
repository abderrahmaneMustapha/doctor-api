import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { SigninDto } from './dto/sign-in-dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(credentials: SigninDto): Promise<{ access_token: string }> {
    const { password, email } = credentials;
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const match = password === user.password;

    if (!match) {
      throw new UnauthorizedException();
    }

    const payload = {
      email: user.email,
      name: user.name,
      type: user.type,
      sub: user.id,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
    };
  }
}
