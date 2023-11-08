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

@Controller('prescriptions')
@UseGuards(RolesGuard)
export class PrescriptionController {
  constructor(private readonly prescriptionService: PrescriptionService) {}

  @Post()
  @Roles('doctor', 'Doctor')
  create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionService.create(createPrescriptionDto);
  }

  @Get()
  @Roles('doctor', 'patient', 'Doctor', 'Patient')
  findAll(@Req() req: any) {
    if (req.user.type === 'patient' || req.user.type === 'Patient') {
      return this.prescriptionService.findPrescriptionsForPatient(req.user.sub);
    }
    return this.prescriptionService.findAll();
  }

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

  @Patch(':id')
  @Roles('doctor', 'Doctor')
  update(
    @Param('id') id: string,
    @Body() updatePrescriptionDto: UpdatePrescriptionDto,
  ) {
    return this.prescriptionService.update(id, updatePrescriptionDto);
  }

  @Delete(':id')
  @Roles('doctor', 'Doctor')
  remove(@Param('id') id: string) {
    return this.prescriptionService.remove(id);
  }
}
