import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/sign-in-dto';
import { Public } from 'src/decorators/public.decorator';
import { User } from 'src/user/entities/user.entity';
import { SignupDto } from './dto/sign-up-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @Public()
  signIn(@Body() createDoctorDto: SigninDto) {
    return this.authService.signIn(createDoctorDto);
  }

  @Post('signup')
  @Public()
  async signUp(@Body() createUserDto: SignupDto): Promise<User> {
    console.log(createUserDto);
    return this.authService.signUp(createUserDto);
  }
}
