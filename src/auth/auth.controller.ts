import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/sign-in-dto';
import { Public } from 'src/decorators/public.decorator';
import { User } from 'src/user/entities/user.entity';
import { SignupDto } from './dto/sign-up-dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Doctor } from 'src/doctor/entities/doctor.entity';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Sign in a user' })
  @ApiResponse({
    status: 200,
    description: 'User signed in successfully',
    type: User,
    schema: {
      example: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiBody({ type: SigninDto })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized if email or password is wrong',
  })
  @Post('signin')
  @Public()
  signIn(@Body() createDoctorDto: SigninDto) {
    return this.authService.signIn(createDoctorDto);
  }

  @ApiOperation({ summary: 'Sign up a new user can be a doctor or a patient' })
  @ApiResponse({
    status: 201,
    description: 'User signed up successfully',
    type: Doctor,
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        sepcialization: 'something',
        type: 'Doctor',
      },
    },
  })
  @ApiBody({ type: SignupDto })
  @Post('signup')
  @Public()
  async signUp(@Body() createUserDto: SignupDto): Promise<User> {
    return this.authService.signUp(createUserDto);
  }
}
