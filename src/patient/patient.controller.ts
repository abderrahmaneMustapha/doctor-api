import { Controller, Get, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { PatientService } from './patient.service';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('patients')
@UseGuards(RolesGuard)
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get()
  @Roles('admin', 'doctor', 'Admin', 'Doctor')
  findAll() {
    return this.patientService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'doctor', 'Admin', 'Doctor')
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin', 'doctor', 'Admin', 'Doctor')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(id, updatePatientDto);
  }
}
