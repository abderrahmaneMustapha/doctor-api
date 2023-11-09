import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('patients')
@ApiBearerAuth()
@Controller('patients')
@UseGuards(RolesGuard)
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @ApiOperation({ summary: 'Get current patient profile' })
  @ApiOkResponse({ description: 'Patient profile retrieved successfully' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized if the user is not logged in',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden if logged in user is not a patient',
  })
  @Get('/me')
  @Roles('patient', 'Patient')
  findMe(@Req() req: any) {
    return this.patientService.findOne(req.user.sub);
  }

  @ApiOperation({ summary: 'Get all patients' })
  @ApiOkResponse({
    status: 200,
    description: 'Patient records retrieved successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized if the user is not logged in',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden if logged in user is not an admin or doctor',
  })
  @Get('')
  @Roles('admin', 'doctor', 'Admin', 'Doctor')
  findAll() {
    return this.patientService.findAll();
  }

  @ApiOperation({ summary: 'Get patient by ID' })
  @ApiResponse({
    status: 200,
    description: 'Patient record retrieved successfully',
  })
  @ApiNotFoundResponse({ description: 'Patient record not found' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized if the user is not logged in',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden if logged in user is not an admin or doctor',
  })
  @Get(':id')
  @Roles('admin', 'doctor', 'Admin', 'Doctor')
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(id);
  }

  @ApiOperation({ summary: 'Update patient information' })
  @ApiResponse({
    status: 200,
    description: 'Patient record updated successfully',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request if the update data is invalid',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized if the user is not logged in',
  })
  @ApiForbiddenResponse({
    description:
      'Forbidden if logged in user is not allowed to update this patient record',
  })
  @ApiNotFoundResponse({
    description: 'Not Found if the patient record does not exist',
  })
  @Patch(':id')
  @Roles('admin', 'doctor', 'patient', 'Admin', 'Doctor', 'Patient')
  update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    if (req.user.type === 'patient' || req.user.type === 'Patient') {
      return this.patientService.update(req.user.sub, updatePatientDto);
    }
    return this.patientService.update(id, updatePatientDto);
  }
}
