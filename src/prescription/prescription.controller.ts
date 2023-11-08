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
  @Roles('admin', 'doctor', 'Admin', 'Doctor')
  create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionService.create(createPrescriptionDto);
  }

  @Get()
  @Roles('admin', 'doctor', 'patient', 'Admin', 'Doctor', 'Patient')
  findAll(@Req() req: any) {
    if (req.user.type === 'patient') {
      return this.prescriptionService.findPrescriptionsForPatient(req.user.id);
    }
    return this.prescriptionService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'doctor', 'patient', 'Admin', 'Doctor', 'Patient')
  findOne(@Req() req: any, @Param('id') id: string) {
    if (req.user.type === 'patient') {
      return this.prescriptionService.findPrescriptionForPatient(
        req.user.sub,
        id,
      );
    }
    return this.prescriptionService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin', 'doctor', 'Admin', 'Doctor')
  update(
    @Param('id') id: string,
    @Body() updatePrescriptionDto: UpdatePrescriptionDto,
  ) {
    return this.prescriptionService.update(id, updatePrescriptionDto);
  }

  @Delete(':id')
  @Roles('admin', 'doctor', 'Admin', 'Doctor')
  remove(@Param('id') id: string) {
    return this.prescriptionService.remove(id);
  }
}
