import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Doctor } from './entities/doctor.entity';

@ApiTags('doctors')
@ApiBearerAuth()
@Controller('doctors')
@UseGuards(RolesGuard)
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @ApiOperation({ summary: 'Create a new doctor' })
  @ApiResponse({
    status: 201,
    description: 'The doctor has been successfully created.',
    type: Doctor,
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Dr. John Doe',
        email: 'john.doe@example.com',
        specialization: 'Cardiology',
        type: 'Doctor',
      },
    },
  })
  @ApiBody({ type: CreateDoctorDto })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized if token is missing or invalid',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden if user does not have the right role',
  })
  @Post()
  @Roles('admin', 'Doctor')
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }
}
