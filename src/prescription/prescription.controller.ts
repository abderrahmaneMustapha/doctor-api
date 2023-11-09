import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PrescriptionService } from './prescription.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Prescription } from './entities/prescription.entity';

@ApiTags('prescriptions')
@ApiBearerAuth()
@Controller('prescriptions')
@UseGuards(RolesGuard)
export class PrescriptionController {
  constructor(private readonly prescriptionService: PrescriptionService) {}

  @ApiOperation({ summary: 'Create a prescription' })
  @ApiCreatedResponse({
    type: Prescription,
    description: 'The prescription has been successfully created.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request if the creation data is invalid.',
  })
  @ApiUnauthorizedResponse({
    description:
      'Unauthorized if the user is not logged in or token is invalid.',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden if logged in user is not a doctor.',
  })
  @Post()
  @Roles('doctor', 'Doctor')
  create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionService.create(createPrescriptionDto);
  }

  @ApiOperation({ summary: 'Get all prescriptions' })
  @ApiOkResponse({
    type: [Prescription],
    description: 'Prescriptions retrieved successfully.',
  })
  @ApiUnauthorizedResponse({
    description:
      'Unauthorized if the user is not logged in or token is invalid.',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden if logged in user is not a doctor or a patient.',
  })
  @Get()
  @Roles('doctor', 'patient', 'Doctor', 'Patient')
  findAll(@Req() req: any) {
    if (req.user.type === 'patient' || req.user.type === 'Patient') {
      return this.prescriptionService.findPrescriptionsForPatient(req.user.sub);
    }
    return this.prescriptionService.findAll();
  }

  @ApiOperation({ summary: 'Get a prescription by ID' })
  @ApiOkResponse({
    type: Prescription,
    description: 'Prescription retrieved successfully.',
  })
  @ApiNotFoundResponse({ description: 'Prescription not found.' })
  @ApiUnauthorizedResponse({
    description:
      'Unauthorized if the user is not logged in or token is invalid.',
  })
  @ApiForbiddenResponse({
    description:
      'Forbidden if logged in user is not a doctor or the patient to whom the prescription belongs.',
  })
  @Get(':id')
  @Roles('doctor', 'patient', 'Doctor', 'Patient')
  findOne(@Req() req: any, @Param('id') id: string) {
    if (req.user.type === 'patient' || req.user.type === 'Patient') {
      return this.prescriptionService.findPrescriptionForPatient(
        req.user.sub,
        id,
      );
    }
    return this.prescriptionService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a prescription' })
  @ApiOkResponse({
    type: Prescription,
    description: 'Prescription updated successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request if the update data is invalid.',
  })
  @ApiNotFoundResponse({ description: 'Prescription not found.' })
  @ApiUnauthorizedResponse({
    description:
      'Unauthorized if the user is not logged in or token is invalid.',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden if logged in user is not a doctor.',
  })
  @Patch(':id')
  @Roles('doctor', 'Doctor')
  update(
    @Param('id') id: string,
    @Body() updatePrescriptionDto: UpdatePrescriptionDto,
  ) {
    return this.prescriptionService.update(id, updatePrescriptionDto);
  }

  @ApiOperation({ summary: 'Delete a prescription' })
  @ApiOkResponse({ description: 'Prescription deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Prescription not found.' })
  @ApiUnauthorizedResponse({
    description:
      'Unauthorized if the user is not logged in or token is invalid.',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden if logged in user is not a doctor.',
  })
  @Delete(':id')
  @Roles('doctor', 'Doctor')
  remove(@Param('id') id: string) {
    return this.prescriptionService.remove(id);
  }
}
