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

@Controller('patients')
@UseGuards(RolesGuard)
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get('/me')
  @Roles('patient', 'Patient')
  findMe(@Req() req: any) {
    return this.patientService.findOne(req.user.sub);
  }

  @Get('')
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
